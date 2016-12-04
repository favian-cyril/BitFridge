export default {
  ready: false,
  display: 'index',
  pathname: null,
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
    user: {
      fridge: [],
      cookingToday: []
    }
  },
  errorType: {
    search: '',
    fridge: '',
    recipes: '',
    cookingToday: '',
    userData: ''
  }
}
