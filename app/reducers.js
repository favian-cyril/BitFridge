import _ from 'lodash'
import { combineReducers } from 'redux'
import defaults from './config/defaultStates'

import {
  ADD_TO_FRIDGE, DEL_FROM_FRIDGE,
  MORE_RECIPES, RETRY_RECIPES, REQUEST_RECIPES, RECEIVE_RECIPES,
  ADD_TO_COOKING_TODAY, TOGGLE_COOKING_TODAY, CLEAR_COOKING_TODAY, UPDATE_MISSING_COOKING_TODAY,
  REQUEST_USER_DATA, RECEIVE_USER_DATA, SYNC_USER_DATA,
  SET_DISPLAY, SET_READY,
  HANDLE_ERROR
} from './actions'

function fridge(state = defaults.fridge, action) {
  switch (action.type) {
    case ADD_TO_FRIDGE:
      const newContents = [...state.contents, action.ingredient]
      return {
        ...state,
        contents: newContents
      }
    case DEL_FROM_FRIDGE:
      const index = _.findIndex(state.contents,
        i => i.id === action.ingredient.id)
      const newContents = [
        ...state.contents.slice(0, index),
        ...state.contents.slice(index + 1)
      ]
      return {
        ...state,
        contents: newContents
      }
    default: return state
  }
}

function recipes(state = defaults.recipes, action) {
  switch (action.type) {
    case MORE_RECIPES:
      return {
        ...state,
        page: state.page + 1,
        timestamp: action.timestamp,
        isLoading: true
      }
    case RETRY_RECIPES:
      return {
        ...state,
        contents: [],
        timestamp: action.timestamp,
        isLoading: true
      }
    case REQUEST_RECIPES:
      return {
        ...state,
        timestamp: action.timestamp,
        isLoading: true
      }
    case RECEIVE_RECIPES:
      if (action.timestamp === state.timestamp) {
        const newRecipes = [...state.contents, action.recipes]
        return {
          ...state,
          contents: newRecipes,
          isLoading: false
        }
      } else {
        return state
      }
    default: return state
  }
}

function cookingToday(state = defaults.cookingToday, action) {
  switch (action.type) {
    case ADD_TO_COOKING_TODAY:
      const newContents = [...state.contents, action.recipe]
      return {
        ...state,
        contents: newContents
      }
    case TOGGLE_COOKING_TODAY:
      const index = _.findIndex(state.contents,
        i => i.id === action.recipe.id)
      const isExpanded = !state.accordion.isExpanded
      const newAccordion = { ...state, isExpanded, index }
      return {
        ...state,
        accordion: newAccordion
      }
    case CLEAR_COOKING_TODAY:
      return {
        ...state,
        contents: []
      }
    case UPDATE_MISSING_COOKING_TODAY:
      const temp = state.cookingToday.map(recipe => recipe.missedIngredients)
      const results = temp.map(function (missed) {
        return _.differenceBy(missed, state.fridge, 'id')
      })
      var newCookingToday = state.cookingToday.map(function (ingredients, i) {
        ingredients.missedIngredients = results[i]
        return ingredients
      })
      return {
        ...state,
        contents: newCookingToday
      }
    default: return state
  }
}

function userData(state = defaults.userData, action) {
  switch (action.type) {
    case REQUEST_USER_DATA:
      return {
        ...state,
        isLoading: true
      }
    case RECEIVE_USER_DATA:
      return {
        ...state,
        isLoading: false,
        user: action.userData
      }
    default: return state
  }
}

function display(state = { display: null, ready: false }, action) {
  switch (action.type) {
    case SET_DISPLAY:
      let display
      if (action.pathname === '/') {
        display = 'index'
      } else if (action.pathname === '/dash') {
        display = 'dash'
      }
      return {
        ...state,
        display
      }
    case SET_READY:
      return {
        ...state,
        ready: true
      }
    default: return state
  }
}

const rootReducer = combineReducers({
  fridge,
  recipes,
  cookingToday,
  userData,
  display
})

export default rootReducer
