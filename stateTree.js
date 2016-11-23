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
  cookingToday: {
    contents: [
      {
        ingredients: ['foo'],
        id: 9872345
      },
      {
        ingredients: ['bar'],
        id: 2986025
      }
    ],
    accordion: {
      isExpanded: true,
      id: 9872345
    },
    isLoading: false, 
    errorType: ''
  },
  userData: null
}