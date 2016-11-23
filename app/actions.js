// User interaction governed
export const ADD_TO_FRIDGE = 'ADD_TO_FRIDGE'
export const DEL_FROM_FRIDGE = 'DEL_FROM_FRIDGE'

export const ADD_TO_COOKING_TODAY = 'ADD_TO_COOKING_TODAY'
export const TOGGLE_COOKING_TODAY = 'TOGGLE_COOKING_TODAY'
export const CLEAR_COOKING_TODAY = 'CLEAR_COOKING_TODAY'

export const MORE_RECIPES = 'MORE_RECIPES'
export const RETRY_RECIPES = 'RETRY_RECIPES'
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

export function addToFridge(ingredient) {
  return {
    type: ADD_TO_FRIDGE,
    ingredient
  }
}

export function delFromFridge(ingredient) {
  return {
    type: DEL_FROM_FRIDGE,
    ingredient
  }
}

export function addToCookingToday(recipe) {
  return {
    type: ADD_TO_COOKING_TODAY,
    recipe
  }
}

export function toggleCookingToday(index) {
  return {
    type: TOGGLE_COOKING_TODAY,
    index
  }
}

export function clearCookingToday() {
  return {
    type: CLEAR_COOKING_TODAY
  }
}

export function moreRecipes() {
  return {
    type: MORE_RECIPES
  }
}

export function retryRecipes() {
  return {
    type: RETRY_RECIPES
  }
}

export function receiveUserData() {
  return {
    type: REQUEST_USER_DATA
  }
}

export function receiveUserData(userData) {
  return {
    type: RECEIVE_USER_DATA,
    userData
  }
}

export function syncUserData() {
  return {
    type: SYNC_USER_DATA
  }
}

export function setDisplay() {
  return {
    type: SET_DISPLAY
  }
}

export function setReady() {
  return {
    type: SET_READY
  }
}

export function receiveRecipes() {
  return {
    type: REQUEST_RECIPES
  }
}

export function receiveRecipes(recipes) {
  return {
    type: RECEIVE_RECIPES,
    recipes
  }
}

export function handleError(error, component) {
  return {
    type: HANDLE_ERROR,
    error,
    component
  }
}