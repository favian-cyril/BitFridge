const state = {
  ready: false,
  display: null,
  search: {
    searchText: '',
    isFocused: false,
    isLoading: false,
    timestamp: null,
    errorType: '',
    suggestionResults: []
  },
  fridge: {
    contents: [],
    isLoading: false,
    errorType: ''
  },
  recipes: {
    contents: [],
    page: 1,
    isLoading: false,
    errorType: ''
  },
  userData: null
}