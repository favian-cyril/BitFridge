import _ from 'lodash'
import { combineReducers } from 'redux'

import {
  ADD_TO_FRIDGE, DEL_FROM_FRIDGE,
  ADD_TO_COOKING_TODAY, TOGGLE_COOKING_TODAY, CLEAR_COOKING_TODAY,
  MORE_RECIPES, RETRY_RECIPES,
  REQUEST_USER_DATA, RECEIVE_USER_DATA, SYNC_USER_DATA,
  SET_DISPLAY, SET_READY,
  REQUEST_RECIPES, RECEIVE_RECIPES,
  HANDLE_ERROR
} from './actions'

const defaultFridge = {
  contents: [],
  isLoading: false,
  errorType: ''
}

const defaultCookingToday = {
  contents: [],
  accordion: {
    isExpanded: false,
    index: -1
  },
  isLoading: false,
  errorType: ''
}

function fridge(state = defaultFridge, action) {
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
  }
}

function cookingToday(state = defaultCookingToday, action) {
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
  }
}

const rootReducer = combineReducers({
  fridge,
  cookingToday
})

export default rootReducer

