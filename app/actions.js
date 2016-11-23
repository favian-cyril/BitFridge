import { searchResults, fetchUser, syncUser } from './clientapi'

// User interaction governed
export const ADD_TO_FRIDGE = 'ADD_TO_FRIDGE'
export const DEL_FROM_FRIDGE = 'DEL_FROM_FRIDGE'

export const MORE_RECIPES = 'MORE_RECIPES'
export const RETRY_RECIPES = 'RETRY_RECIPES'

export const ADD_TO_COOKING_TODAY = 'ADD_TO_COOKING_TODAY'
export const TOGGLE_COOKING_TODAY = 'TOGGLE_COOKING_TODAY'
export const CLEAR_COOKING_TODAY = 'CLEAR_COOKING_TODAY'
//

// Network governed, independent
export const REQUEST_USER_DATA = 'REQUEST_USER_DATA'
export const RECEIVE_USER_DATA = 'RECEIVE_USER_DATA'
export const SYNC_USER_DATA = 'SYNC_USER_DATA'

export const SET_DISPLAY = 'SET_DISPLAY'
export const SET_READY = 'SET_READY'

export const REQUEST_RECIPES = 'REQUEST_RECIPES'
export const RECEIVE_RECIPES = 'RECEIVE_RECIPES'
//

// Error handler
export const HANDLE_ERROR = 'HANDLE_ERROR'
//

export const addToFridge = ingredient => ({
  type: ADD_TO_FRIDGE,
  ingredient
})

export const delFromFridge = ingredient => ({
  type: DEL_FROM_FRIDGE,
  ingredient
})

export const moreRecipes = timestamp => ({
  type: MORE_RECIPES,
  timestamp
})

export const retryRecipes = timestamp => ({
  type: RETRY_RECIPES,
  timestamp
})

export const addToCookingToday = recipe => ({
  type: ADD_TO_COOKING_TODAY,
  recipe
})

export const toggleCookingToday = index => ({
  type: TOGGLE_COOKING_TODAY,
  index
})

export const clearCookingToday = () => ({
  type: CLEAR_COOKING_TODAY
})

export const receiveUserData = () => ({
  type: REQUEST_USER_DATA
})

export const receiveUserData = userData => ({
  type: RECEIVE_USER_DATA,
  userData
})

export const syncUserData = () => ({
  type: SYNC_USER_DATA
})

export const setDisplay = pathname => ({
  type: SET_DISPLAY,
  pathname
})

export const setReady = () => ({
  type: SET_READY
})

export const requestRecipes = timestamp => ({
  type: REQUEST_RECIPES,
  timestamp
})

export const receiveRecipes = recipes => ({
  type: RECEIVE_RECIPES,
  recipes
})

export const fetchRecipes = store => next => action => {
  const state = store.getState()
  const ingredientList = state.fridge.contents.map(i => i.name)
  const timestamp = (new Date()).getTime()
  requestRecipes(timestamp)
  searchResults(ingredientList, state.recipes.page)
    .then((recipes) => {
      receiveRecipes(timestamp)
      return next(action)
    })
    .catch((err) => {
      handleError(err, 'recipes')
      return next(action)
    })
}

export const fetchUserData = store => next => action => {
  const state = store.getState()
  fetchUser()
    .then((userData) => {
      receiveUserData(userData)
      return next(action)
    })
    .catch((err) => {
      handleError(err, 'userData')
      return next(action)
    })
}

export const handleError(error, component) {
  return {
    type: HANDLE_ERROR,
    error,
    component
  }
}