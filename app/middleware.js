import { searchResults, fetchUser, syncUser } from './clientapi'
import {
  requestRecipes, receiveRecipes,
  moreRecipes, retryRecipes,
  requestUserData, receiveUserData,
  sendSync, ackSync,
  handleError,
} from './actions'

const fetchRecipes = () => {
  const timestamp = (new Date()).getTime()
  return (dispatch, getState) => {
    const state = getState()
    const ingredients = state.fridge.contents
    const page = state.recipes.page
    dispatch(requestRecipes(timestamp))
      .then(() => {
        searchResults(ingredients, page)
          .then(
            recipes => dispatch(receiveRecipes(recipes, timestamp)),
            error => dispatch(handleError(error, 'recipes'))
          )
      })
  }
}

const fetchMoreRecipes = () => {
  return dispatch => {
    dispatch(moreRecipes())
      .then(() => {
        dispatch(fetchRecipes())
      })
  }
}

const retryFetchRecipes = () => {
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

const fetchUserData = () => {
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

const syncUserData = userData => {
  return dispatch => {
    dispatch(sendSync())
      .then(() => {
        syncUser(userData)
          .then(
            () => dispatch(ackSync()),
            error => dispatch(handleError(error, 'userData'))
          )
      })
  }
}

export default [
  fetchRecipes,
  fetchMoreRecipes,
  retryFetchRecipes,
  fetchUserData,
  syncUserData
]
