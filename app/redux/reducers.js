import _ from 'lodash'
import { browserHistory } from 'react-router'
import defaults from './defaultStates'
import { VIEW_THRESHOLD } from '../config/constants'
import uiUtils from '../utils/ui'
import constants from './constants'

function reducer(state = defaults, action) {
  let newSearch, newFridge, newRecipes, newCookingToday, newContents,
    newUserData, newErrorType, newState
  switch (action.type) {

    /** SEARCH **/
    case constants.UPDATE_SEARCH_TEXT:
      newSearch = {
        ...state.search,
        searchText: action.searchText
      }
      return { ...state, search: newSearch }

    case constants.REQUEST_SEARCH:
      newSearch = {
        ...state.search,
        isLoading: true,
        timestamp: action.timestamp
      }
      return { ...state, search: newSearch }

    case constants.RECEIVE_SEARCH:
      if (action.timestamp === state.search.timestamp) {
        newSearch = {
          ...state.search,
          isLoading: false,
          contents: action.suggestions
        }
        newState = { ...state, search: newSearch }
      } else {
        newState = state
      }
      return newState

    case constants.TOGGLE_FOCUS:
      newSearch = { ...state.search, isFocused: !state.search.isFocused }
      return { ...state, search: newSearch }

    /** FRIDGE - SHOPPING LIST **/
    case constants.TOGGLE_ADD_DELETE:
      let message
      switch (action.ingredient.isAdded) {
        case false:
          newContents = [...state.fridge.contents, { ...action.ingredient, isAdded: true }]
          newFridge = { ...state.fridge, contents: newContents }
          message = 'Added to fridge!'
          uiUtils.tooltips.showTooltip(
            action.idName,
            message
          )
          return { ...state, fridge: newFridge }
        case true:
          const index = _.findIndex(state.fridge.contents,
            i => i.id === action.ingredient.id)
          newContents = [
            ...state.fridge.contents.slice(0, index),
            ...state.fridge.contents.slice(index + 1)
          ]
          newFridge = { ...state.fridge, contents: newContents }
          message = 'Deleted from fridge!'
          uiUtils.tooltips.showTooltip(
            action.idName,
            message
          )
          return { ...state, fridge: newFridge, message }
        default: return state  // not gonna happen unless errored
      }

    /** RECIPES **/
    case constants.REQUEST_RECIPES:
      newRecipes = {
        ...state.recipes,
        timestamp: action.timestamp,
        isLoading: true
      }
      return { ...state, recipes: newRecipes }
    case constants.RECEIVE_RECIPES:
      if (action.timestamp === state.recipes.timestamp) {
        const results = [...state.recipes.contents, ...action.recipes]
        newRecipes = {
          ...state.recipes,
          contents: results,
          isLoading: false
        }
        newState = { ...state, recipes: newRecipes }
      } else {
        newState = state
      }
      return newState

    case constants.MORE_RECIPES:
      newRecipes = { ...state.recipes, page: state.recipes.page + 1 }
      return { ...state, recipes: newRecipes }

    case constants.RESET_RECIPES:
      newRecipes = { ...state.recipes, contents: [], page: 1 }
      return { ...state, recipes: newRecipes }

    /** COOKING TODAY **/
    case constants.ADD_TO_COOKING_TODAY:
      newRecipes = action.recipe
      newRecipes.ingredients = _.concat(action.recipe.missedIngredients, action.recipe.usedIngredients)
      newRecipes.usedIngredients.forEach((used) => {
        var index = newRecipes.ingredients.findIndex((i) => (i.id === used.id))
        console.log(index)
        if (index >= 0) {
            newRecipes.ingredients[index].isInFridge = true
        }
        }
      )
      newContents = [...state.cookingToday.contents, newRecipes]
      newCookingToday = { ...state.cookingToday, contents: newContents }
      return { ...state, cookingToday: newCookingToday }

    case constants.TOGGLE_COOKING_TODAY:
      const isExpanded = !state.cookingToday.accordion.isExpanded || state.cookingToday.accordion.index !== action.index
      const newAccordion = { isExpanded, index: action.index }
      newCookingToday = { ...state.cookingToday, accordion: newAccordion }
      return { ...state, cookingToday: newCookingToday }

    case constants.CLEAR_COOKING_TODAY:
      newCookingToday = { ...state.cookingToday, contents: [] }
      return { ...state, cookingToday: newCookingToday }

    case constants.UPDATE_MISSING_COOKING_TODAY:
      const ingredients = state.cookingToday.contents.map(
        recipe => recipe.ingredients
      )
      const missedIngredients = ingredients.map(ingredient =>
        _.differenceBy(ingredient, state.fridge.contents, 'id')
      )
      newContents = state.cookingToday.contents.map(function (item, i) {
        item.ingredients.forEach((ingredient) => {
          var index = missedIngredients[i].findIndex((i) => (i.id === ingredient.id))
          if (index >= 0) {
            ingredient.isInFridge = false
          } else {
            ingredient.isInFridge = true
          }
        })
        return item
      })
      newCookingToday = { ...state.cookingToday, contents: newContents }
      return { ...state, cookingToday: newCookingToday }

    /** USER DATA **/
    case constants.REQUEST_USER_DATA:
      newUserData = {
        ...state.userData,
        isLoading: true,
        timestamp: action.timestamp
      }
      return { ...state, userData: newUserData }

    case constants.RECEIVE_USER_DATA:
      const userObject = action.user
      console.log({ userObject })
      newUserData = { ...state.userData, isLoading: false, user: userObject }
      newState = {
        ...state,
        userData: newUserData,
        fridge: { ...state.fridge, contents: userObject.fridge },
        cookingToday: { ...state.cookingToday, contents: userObject.cookingToday }
      }
      return newState

    case constants.SEND_SYNC:
      newUserData = { ...state.userData, didInvalidate: true }
      return { ...state, userData: newUserData }

    case constants.ACK_SYNC:
      newUserData = { ...state.userData, didInvalidate: false }
      return { ...state, userData: newUserData }

    /** DISPLAY **/
    case constants.TRANSITION_DISPLAY:
      var pathname = state.pathname ? state.pathname : action.pathname
      let [ display, nextPath, nextDisplay ] =
        action.pathname === '/'
          ? [ 'index', '/dash', 'dash' ]
        : action.pathname === '/dash'
          ? [ 'dash', '/', 'index' ]
          : [ null, null ]
      const fridgeLength = state.fridge.contents.length
      const shouldTransition =
        (fridgeLength >= VIEW_THRESHOLD && display === 'index') ||
        (fridgeLength === VIEW_THRESHOLD - 1 && display === 'dash')
      if (shouldTransition) {
        browserHistory.push(nextPath)
      }
      const search = !shouldTransition ? state.search : { ...state.search, isFocused: false }
      return { ...state, pathname, display: shouldTransition ? nextDisplay : display, shouldTransition, search }

    /** READY **/
    case constants.SET_READY:
      return { ...state, ready: true }

    /** ERROR HANDLER **/
    case constants.HANDLE_ERROR:
      newErrorType = {
        ...state.errorType,
        [action.component]: action.error
      }
      return { ...state, errorType: newErrorType }
    case constants.CLEAR_ERROR:
      newErrorType = {
        ...state.errorType,
        [action.component]: null
      }
      return { ...state, errorType: newErrorType }

    default: return state
  }
}

export default reducer
