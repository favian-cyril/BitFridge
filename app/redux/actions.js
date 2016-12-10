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

/** FRIDGE - SHOPPING LIST **/
export const toggleAddDelete = (ingredient, idName) => ({
  type: constants.TOGGLE_ADD_DELETE,
  ingredient,
  idName
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

/** COOKING TODAY **/
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

export const updateMissingCookingToday = () => ({
  type: constants.UPDATE_MISSING_COOKING_TODAY
})

/** SHOPPING LIST **/
export const addShoppingList = () => ({
  type: constants.ADD_SHOPPING_LIST
})

export const checkShoppingListItem = (ingredient, idName) => ({
  type: constants.CHECK_SHOPPING_LIST_ITEM,
  ingredient,
  idName
})

/** USER DATA **/
export const requestUserData = timestamp => ({
  type: constants.REQUEST_USER_DATA,
  timestamp
})

export const receiveUserData = (user, timestamp) => ({
  type: constants.RECEIVE_USER_DATA,
  user,
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
import { searchIngredients, searchResults, fetchUser, syncUser } from '../clientapi'

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
                isAdded: find(fridge, ingredient => ingredient.id === suggestion.id) !== undefined
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
    const ingredients = state.fridge.contents.map(i => i.name)
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
        userData => dispatch(receiveUserData(userData.user, timestamp)),
        error => dispatch(handleError(error, 'userData'))
      )
  }
}

/**TODO: end this suffering. User always empty even though mapStateToUserData success **/
export const syncUserData = () => {
  return (dispatch, getState) => {
    dispatch(sendSync())
    const user = mapStateToUserData(dispatch, getState)
    return syncUser(user)
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

/** SYNCHRONOUS UTILITY FUNCTIONS **/
/* TODO: NOTE: Suffering hopefully has ended by the time this method works */

export const mapStateToUserData = (dispatch, getState) => {
  const { fridge, cookingToday, userData } = getState()
  const newFridge = fridge.contents.map(f => f)
  const newCookingToday = cookingToday.contents.map(c => c)
  const newUser = {
    ...userData.user,
    fridge: newFridge,
    cookingToday: newCookingToday
  }
  return newUser
}
