import _ from 'lodash'
import { combineReducers } from 'redux'
import defaults from './config/defaultStates'

import {
  ADD_TO_FRIDGE, DEL_FROM_FRIDGE,
  MORE_RECIPES, RETRY_RECIPES,
  ADD_TO_COOKING_TODAY, TOGGLE_COOKING_TODAY, CLEAR_COOKING_TODAY, UPDATE_MISSING_COOKING_TODAY,
  REQUEST_USER_DATA, RECEIVE_USER_DATA, SEND_SYNC, ACK_SYNC,
  SET_DISPLAY, SET_READY,
  REQUEST_RECIPES, RECEIVE_RECIPES,
  HANDLE_ERROR, CLEAR_ERROR
} from './actions'

function fridge(state = defaults.fridge, action) {
  let newContents
  switch (action.type) {
    case ADD_TO_FRIDGE:
      newContents = [...state.contents, action.ingredient]
      return {
        ...state,
        contents: newContents
      }
    case DEL_FROM_FRIDGE:
      const index = _.findIndex(state.contents,
        i => i.id === action.ingredient.id)
      newContents = [
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
        page: state.page + 1
      }
    case RETRY_RECIPES:
      return {
        ...state,
        contents: [],
        page: 1
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
      const isExpanded = !state.accordion.isExpanded || state.accordion.id !== action.index
      const index = action.index
      const newAccordion = { isExpanded, index }
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
      const temp = state.contents.map(recipe => recipe.missedIngredients)
      const results = temp.map(function (missed) {
        return _.differenceBy(missed, action.fridge, 'id')
      })
      const newCookingToday = state.contents.map(function (ingredients, i) {
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
        isLoading: true,
        timestamp: action.timestamp
      }
    case RECEIVE_USER_DATA:
      if (action.timestamp === state.timestamp) {
        return {
          ...state,
          isLoading: false,
          user: action.userData.user
        }
      } else {
        return state
      }
    case SEND_SYNC:
      return {
        ...state,
        didInvalidate: true
      }
    case ACK_SYNC:
      return {
        ...state,
        didInvalidate: false
      }
    default: return state
  }
}

function display(state = null, action) {
  switch (action.type) {
    case SET_DISPLAY:
      let display
      if (action.pathname === '/') {
        display = 'index'
      } else if (action.pathname === '/dash') {
        display = 'dash'
      }
      return display
    default: return state
  }
}

function ready(state = false, action) {
  switch (action.type) {
    case SET_READY:
      return true
    default: return state
  }
}

function errorType(state = defaults.errorType, action) {
  switch (action.type) {
    case HANDLE_ERROR:
      return {
        ...state,
        [action.component]: action.error
      }
    case CLEAR_ERROR:
      return {
        ...state,
        [action.component]: null
      }
    default: return state
  }
}

const rootReducer = combineReducers({
  fridge,
  recipes,
  cookingToday,
  userData,
  display,
  ready,
  errorType
})

export default rootReducer
