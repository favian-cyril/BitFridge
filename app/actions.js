import { find } from 'lodash'
import constants from './constants'

/** SEARCH **/
export const updateSearchText = searchText => ({
  type: constants.UPDATE_SEARCH_TEXT,
  searchText
})

export const requestSearch = timestamp => ({
  type: constants.REQUEST_SEARCH,
  timestamp
})

export const receiveSearch = (suggestions, timestamp) => ({
  type: constants.RECEIVE_SEARCH,
  suggestions,
  timestamp
})

export const toggleFocus = () => ({
  type: constants.TOGGLE_FOCUS
})

/** FRIDGE **/
export const toggleAddDelete = ingredient => ({
  type: constants.TOGGLE_ADD_DELETE,
  ingredient
})

/** RECIPES **/
export const requestRecipes = timestamp => ({
  type: constants.REQUEST_RECIPES,
  timestamp
})

export const receiveRecipes = (recipes, timestamp) => ({
  type: constants.RECEIVE_RECIPES,
  recipes,
  timestamp
})

export const moreRecipes = () => ({
  type: constants.MORE_RECIPES
})

export const resetRecipes = () => ({
  type: constants.RESET_RECIPES
})

/** Cooking today **/
export const addToCookingToday = recipe => ({
  type: constants.ADD_TO_COOKING_TODAY,
  recipe
})

export const toggleCookingToday = index => ({
  type: constants.TOGGLE_COOKING_TODAY,
  index
})

export const clearCookingToday = () => ({
  type: constants.CLEAR_COOKING_TODAY
})

export const updateMissingCookingToday = (fridge) => ({
  type: constants.UPDATE_MISSING_COOKING_TODAY,
  fridge
})

/** User data **/
export const requestUserData = timestamp => ({
  type: constants.REQUEST_USER_DATA,
  timestamp
})

export const receiveUserData = (userData, timestamp) => ({
  type: constants.RECEIVE_USER_DATA,
  userData,
  timestamp
})

export const sendSync = () => ({
  type: constants.SEND_SYNC
})

export const ackSync = () => ({
  type: constants.ACK_SYNC
})

/** DISPLAY, READY **/
export const transitionDisplay = pathname => ({
  type: constants.TRANSITION_DISPLAY,
  pathname
})

export const setReady = () => ({
  type: constants.SET_READY
})

/** ERROR HANDLER **/
export const handleError = (error, component) => ({
  type: constants.HANDLE_ERROR,
  error,
  component
})

export const clearError = (error, component) => ({
  type: constants.HANDLE_ERROR,
  error,
  component
})

/** ASYNCHRONOUS THUNKS **/
import { searchIngredients, searchResults, fetchUser, syncUser } from './clientapi'

export const fetchSuggestions = () => {
  return (dispatch, getState) => {
    const state = getState()
    const fridge = state.fridge.contents
    const searchText = state.search.searchText.trim()
    if (searchText.length > 0) {
      const timestamp = (new Date()).getTime()
      dispatch(requestSearch(timestamp))
      return searchIngredients(searchText)
        .then(
          suggestions => {
            const suggestionsWithAdded = suggestions.map(
              suggestion => ({
                ...suggestion,
                isAdded: find(fridge, { id: suggestion.id }) !== undefined
              })
            )
            return dispatch(receiveSearch(suggestionsWithAdded, timestamp))
          },
          error => dispatch(handleError(error, 'search'))
        )
    } else {
      return Promise.resolve()
    }
  }
}

export const fetchRecipes = () => {
  return (dispatch, getState) => {
    const state = getState()
    const ingredients = state.fridge.contents
    const page = state.recipes.page
    if (ingredients.length > 0) {
      const timestamp = (new Date()).getTime()
      dispatch(requestRecipes(timestamp))
      return searchResults(ingredients, page)
        .then(
          recipes => dispatch(receiveRecipes(recipes, timestamp)),
          error => dispatch(handleError(error, 'recipes'))
        )
    } else {
      return Promise.resolve()
    }
  }
}

export const fetchMoreRecipes = () => {
  return dispatch => {
    dispatch(moreRecipes())
    dispatch(fetchRecipes())
  }
}

export const refreshRecipes = () => {
  return (dispatch, getState) => {
    dispatch(resetRecipes())
    dispatch(fetchRecipes())
  }
}

export const fetchUserData = () => {
  return dispatch => {
    const timestamp = (new Date()).getTime()
    dispatch(requestUserData(timestamp))
    return fetchUser()
      .then(
        userData => dispatch(receiveUserData(userData, timestamp)),
        error => dispatch(handleError(error, 'userData'))
      )
  }
}

export const mapStateToUserData = () => {
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

export const syncUserData = () => {
  return (dispatch, getState) => {
    dispatch(sendSync())
    dispatch(mapStateToUserData())
    const user = getState().userData.user
    syncUser(user)
      .then(
        () => dispatch(ackSync()),
        error => dispatch(handleError(error, 'userData'))
      )
  }
}

export const initialSetup = pathname => {
  return dispatch => {
    Promise.all([
      dispatch(transitionDisplay(pathname)),
      dispatch(fetchUserData()),
      dispatch(fetchRecipes())
    ]).then(dispatch(setReady()))
  }
}
