const state = {
  ready: false,
  display: null,
  fridge: {
    contents: ['Ingredients'],
    isLoading: false,
    errorType: ''
  },
  recipes: {
    contents: ['Recipes'],
    page: 1,
    isLoading: false,
    errorType: ''
  },
  cookingToday: {
    contents: ['Recipes'],
    accordion: {
      isExpanded: false,
      index: 0
    },
    isLoading: false, 
    errorType: ''
  },
  userData: null
}