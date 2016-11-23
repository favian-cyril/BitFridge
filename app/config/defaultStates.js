const fridge = {
  contents: [],
  isLoading: false,
  errorType: ''
}

const recipes = {
  contents: [],
  page: 1,
  isLoading: false,
  errorType: ''
}

const cookingToday = {
  contents: [],
  accordion: {
    isExpanded: false,
    index: -1
  },
  isLoading: false,
  errorType: ''
}

const userData = {
  user: null,
  isLoading: false,
  errorType: ''
}

const defaults = { fridge, recipes, cookingToday, userData }

export default defaults
