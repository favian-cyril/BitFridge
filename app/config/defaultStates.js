export default {
  ready: false,
  display: null,
  shouldTransition: false,
  message: null,
  search: {
    contents: [],
    searchText: '',
    isFocused: false,
    isLoading: false,
    timestamp: null
  },
  fridge: {
    contents: [],
    isLoading: false
  },
  recipes: {
    contents: [],
    page: 1,
    timestamp: null,
    isLoading: false
  },
  cookingToday: {
    contents: [],
    accordion: {
      isExpanded: false,
      index: 0
    },
    isLoading: false
  },
  userData: {
    isLoading: false,
    didInvalidate: false,
    timestamp: null,
    user: null
  },
  errorType: {
    search: null,
    fridge: null,
    recipes: null,
    cookingToday: null,
    userData: null
  }
}
