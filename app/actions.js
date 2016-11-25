/**
 * User interaction governed
 */
// Fridge
export const ADD_TO_FRIDGE = 'ADD_TO_FRIDGE'
export const DEL_FROM_FRIDGE = 'DEL_FROM_FRIDGE'

export const addToFridge = ingredient => ({
  type: ADD_TO_FRIDGE,
  ingredient
})

export const delFromFridge = ingredient => ({
  type: DEL_FROM_FRIDGE,
  ingredient
})

// Recipes
export const MORE_RECIPES = 'MORE_RECIPES'
export const RETRY_RECIPES = 'RETRY_RECIPES'

export const moreRecipes = () => ({
  type: MORE_RECIPES
})

export const retryRecipes = () => ({
  type: RETRY_RECIPES
})

// CookingToday
export const ADD_TO_COOKING_TODAY = 'ADD_TO_COOKING_TODAY'
export const TOGGLE_COOKING_TODAY = 'TOGGLE_COOKING_TODAY'
export const CLEAR_COOKING_TODAY = 'CLEAR_COOKING_TODAY'
export const UPDATE_MISSING_COOKING_TODAY = 'UPDATE_MISSING_COOKING_TODAY'

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

export const updateMissingCookingToday = (fridge) => ({
  type: UPDATE_MISSING_COOKING_TODAY,
  fridge
})
/**
 * Network governed, independent
 */
// User data
export const REQUEST_USER_DATA = 'REQUEST_USER_DATA'
export const RECEIVE_USER_DATA = 'RECEIVE_USER_DATA'
export const SEND_SYNC = 'SEND_SYNC'
export const ACK_SYNC = 'ACK_SYNC'

export const requestUserData = () => ({
  type: REQUEST_USER_DATA
})

export const receiveUserData = userData => ({
  type: RECEIVE_USER_DATA,
  userData
})

export const sendSync = () => ({
  type: SEND_SYNC
})

export const ackSync = () => ({
  type: ACK_SYNC
})

// Display, ready
export const SET_DISPLAY = 'SET_DISPLAY'
export const SET_READY = 'SET_READY'

export const setDisplay = pathname => ({
  type: SET_DISPLAY,
  pathname
})

export const setReady = () => ({
  type: SET_READY
})

// Recipe request and receive
export const REQUEST_RECIPES = 'REQUEST_RECIPES'
export const RECEIVE_RECIPES = 'RECEIVE_RECIPES'

export const requestRecipes = (timestamp) => ({
  type: REQUEST_RECIPES,
  timestamp
})

export const receiveRecipes = (recipes, timestamp) => ({
  type: RECEIVE_RECIPES,
  recipes,
  timestamp
})

/**
 * Error handler
 */
export const HANDLE_ERROR = 'HANDLE_ERROR'
export const CLEAR_ERROR = 'CLEAR_ERROR'

export const handleError = (error, component) => ({
  type: HANDLE_ERROR,
  error,
  component
})

export const clearError = (error, component) => ({
  type: HANDLE_ERROR,
  error,
  component
})

/**
 * Asynchronous thunks
 */

import { searchResults, fetchUser, syncUser } from './clientapi'

export const preFetchRecipes = () => {
  return (dispatch, getState) => {
    const state = getState()
    const ingredients = state.fridge.contents
    const page = state.recipes.page
    if (ingredients.length > 0) {
      const timestamp = (new Date()).getTime()
      dispatch(requestRecipes())
        .then(() => {
          searchResults(ingredients, page)
            .then(
              recipes => dispatch(receiveRecipes(recipes, timestamp)),
              error => dispatch(handleError(error, 'recipes'))
            )
        })
    }
  }
}

export const fetchMoreRecipes = () => {
  return dispatch => {
    dispatch(moreRecipes())
      .then(() => {
        dispatch(preFetchRecipes())
      })
  }
}

export const refreshRecipes = () => {
  return (dispatch, getState) => {
    const lastPage = getState().recipes.page
    dispatch(retryRecipes())
      .then(() => {
        while (getState().recipes.page <= lastPage) {
          dispatch(fetchMoreRecipes())
        }
      })
  }
}

export const fetchUserData = () => {
  return dispatch => {
    dispatch(requestUserData())
      .then(() => {
        fetchUser()
          .then(
            userData => dispatch(receiveUserData(userData)),
            error => dispatch(handleError(error, 'userData'))
          )
      })
  }
}

export const mapStateToUserData = () {
  return (dispatch, getState) => {
    const { fridge, cookingToday, userData } = getState()
    const newFridge = fridge.map(f => f.contents)
    const newCookingToday = cookingToday.map(c => c.contents)
    const newUser = {
      ...userData.user,
      fridge: newFridge,
      cookingToday: newCookingToday
    }
    dispatch(receiveUserData(newUser))
      .catch((error) => dispatch(handleError(error, 'userData')))
  }
}

export const syncUserData = userData => {
  return (dispatch, getState) => {
    let user = userData.user
    dispatch(sendSync())
      .then(dispatch(mapStateToUserData()))
      .then(() => {
        user = getState().userData.user
        syncUser(user)
          .then(
            () => dispatch(ackSync()),
            error => dispatch(handleError(error, 'userData'))
          )
      })
  }
}
