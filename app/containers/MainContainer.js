import React from 'react'
import _ from 'lodash'
import { browserHistory } from 'react-router'
import Preloader from '../components/Preloader'
import { getFridge, searchResults, fetchUser, addCookingToday, getCookingToday, clearCookingToday } from '../clientapi'
import { REDIRECT_INGR_THRESHOLD } from '../config/constants'
import anims from '../utils/anims'

class MainContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ready: false,
      fridge: [],
      recipes: [],
      cookingToday: [],
      display: null,
      isLoading: false,
      isExpanded: {expand:false, id:0},
      recipePage: 1,
      errorType: {
        fridge: '',
        recipes: ''
      },
      user: null
    }
    this.fetchFridge = this.fetchFridge.bind(this)
    this.updateFridge = this.updateFridge.bind(this)
    this.isInFridge = this.isInFridge.bind(this)
    this.fetchRecipes = this.fetchRecipes.bind(this)
    this.moreRecipes = this.moreRecipes.bind(this)
    this.retryRecipes = this.retryRecipes.bind(this)
    this.handleError = this.handleError.bind(this)
    this.toggleAccordion = this.toggleAccordion.bind(this)
    this.fetchCookingToday = this.fetchCookingToday.bind(this)
    this.addCookingToday = this.addCookingToday.bind(this)
    this.clearCookingToday = this.clearCookingToday.bind(this)
    this.updateMissingCookingToday = this.updateMissingCookingToday.bind(this)
  }

  getChildContext() {
    return {
      fridge: this.state.fridge,
      display: this.state.display,
      recipes: this.state.recipes,
      cookingToday: this.state.cookingToday
    }
  }

  componentWillMount() {
    /**
     * Debounces the moreRecipes() handler.
     */
    this.moreRecipes = _.throttle(this.moreRecipes, 1000, { leading: true })
  }

  componentDidMount() {
    /**
     * Initially sets state.ready to false for displaying preloader. Fetches
     * user data and updates state.user, then fetches display and fridge,
     * then fetches recipe results. Finally sets state.ready to true and
     * displays the children view (Index/Dashboard).
     */
    fetchUser().then((data) => {
      this.setState({ user: data.user })
      Promise.all([
        this.fetchDisplay(),
        this.fetchFridge(),
        this.fetchCookingToday()
      ]).then(() => {
        if (this.state.fridge.length > 0) {
          this.fetchRecipes().then(() => {
            this.setState({ ready: true })
          })
        } else {
          this.setState({ ready: true })
        }
      }).catch((err) => {
        console.error(err)   // TODO: Display error on failure in fetching initial data
      })
    })
  }

  componentWillUpdate(nextProps, nextState) {
    /**
     * On state change, updates display and changes view depending on
     * the redirect ingredient threshold (how many ingredients in fridge
     * until the view changes from Index to Dash, and vice versa).
     */
    if (nextProps.location.pathname !== this.props.location.pathname) {
      this.fetchDisplay(nextProps.location.pathname)
    }
    if (nextState.fridge.length !== this.state.fridge.length) {
      if (nextState.fridge.length < REDIRECT_INGR_THRESHOLD &&
        this.state.fridge.length === REDIRECT_INGR_THRESHOLD) {
        browserHistory.push('/')
      } else if (nextState.fridge.length === REDIRECT_INGR_THRESHOLD &&
        this.state.fridge.length < REDIRECT_INGR_THRESHOLD) {
        browserHistory.push('/dash')
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    /**
     * Updates recipe results every time fridge contents change.
     */
    if (prevState.fridge.length !== this.state.fridge.length) {
      this.fetchRecipes().then(() => {
        this.updateMissingCookingToday()
      })
    }
  }

  fetchDisplay() {
    /**
     * Sets state.display according to the view of the app.
     * App view is either 'index' or 'dash'.
     */
    const pathname = this.props.location.pathname
    if (pathname === '/') {
      this.setState({ display: 'index' })
    } else if (pathname === '/dash') {
      this.setState({ display: 'dash' })
    }
  }

  fetchFridge() {
    /**
     * Returns a Promise that fetches fridge contents on success and
     * updates it, and calls error handler on failure.
     */
    return new Promise((resolve) => {
      getFridge()
        .then((results) => {
          this.setState({ fridge: results })
          resolve()
        })
        .catch((error) => {
          this.handleError(error, 'fridge')
        })
    })
  }

  fetchRecipes() {
    /**
     * Returns a Promise that initially clears recipe results and
     * toggles loading status, then fetches recipe results on success
     * and calls error handler on failure.
     */
    return new Promise((resolve) => {
      const fridgeList = this.state.fridge.map(item => item.name)
      this.setState({ isLoading: true, recipes: [] })
      searchResults(fridgeList, this.state.recipePage)
        .then((results) => {
          this.setState({ recipes: results, isLoading: false })
          resolve()
        })
        .catch((error) => {
          this.setState({ isLoading: false })
          this.handleError(error, 'recipes')
        })
    })
  }

  fetchCookingToday() {
    return new Promise((resolve) => {
      getCookingToday()
        .then((results) => {
          if (results.length > 0) {
            this.setState({ cookingToday: results })
          }
          resolve()
        })
        .catch((error) => {
          console.log(error)
          //this.handleError(error, 'cooktoday') TODO
        })
    })
  }

  addCookingToday(recipe) {
    if (!(_.find(this.state.cookingToday, item => item.id === recipe.id))) {
      addCookingToday(recipe)
        .then(() => {
          this.setState({ cookingToday: this.state.cookingToday.concat(recipe) })
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  updateFridge(action, ingredient) {
    /**
     * Updates fridge contents depending on the action (ADD, DEL).
     */
    const newFridge = this.state.fridge.slice()
    if (action === 'ADD') {
      newFridge.push(ingredient)
    } else if (action === 'DEL') {
      _.remove(newFridge, item => item.id === ingredient.id)
    }
    this.setState({ fridge: newFridge })
  }

  isInFridge(ingredient) {
    /**
     * Checks if an ingredients is in state.contents.fridge.
     */
    const found = _.find(this.state.fridge, item => item.id === ingredient.id)
    return found !== undefined
  }

  moreRecipes() {
    /**
     * Toggles loading status and increments recipePage, then
     * fetches the next page of Recipe Results. Calls error handler
     * on failure.
     */
    const fridgeList = this.state.fridge.map(item => item.name)
    const nextPage = this.state.recipePage + 1
    this.setState({ isLoading: true, recipePage: nextPage })
    anims.moreRecipes()
    searchResults(fridgeList, nextPage)
      .then((results) => {
        this.setState({
          recipes: this.state.recipes.concat(results),
          isLoading: false
        })
      })
      .catch((error) => {
        this.setState({ isLoading: false })
        this.handleError(error, 'recipes')
      })
  }

  retryRecipes() {
    /**
     * Clears state.fridge.errorType, then retries fetching recipes.
     */
    const clearedError = { fridge: this.state.errorType.fridge, recipes: '' }
    this.setState({ errorType: clearedError })
    this.fetchRecipes()
  }

  handleError(err, component) {  // eslint-disable-line class-methods-use-this
    /**
     * Catches error from various components (mostly API call/network related errors).
     * Updates errorType state for a given component.
     */
    /* TODO: Display error on fail to fetch fridge, recipe, etc. */
    const errorType = this.state.errorType
    if (err.message && err.message === 'Network Error') {
      errorType[component] = 'OFFLINE'
      this.setState({ errorType })
    } else if (err.response && err.response.data.code === 'ENOTFOUND') {
      errorType[component] = 'SERVERERR'
      this.setState({ errorType })
    }
    this.setState({ ready: true })
  }

  toggleAccordion(id) {
    if (!this.state.isExpanded.expand || this.state.isExpanded.id !== id) {
      this.setState({ isExpanded : {expand: true, id:id} })
    } else {
      this.setState({ isExpanded : {expand: false, id:id} })
    }
  }

  clearCookingToday() {
    if (this.state.cookingToday.length > 0) {
      clearCookingToday().then(() => {
        this.setState({ cookingToday : []})
      }).catch((err) => {
        console.log(err)
      })
    }
  }

  updateMissingCookingToday() {
    var temp = this.state.cookingToday.map(recipe => recipe.missedIngredients)
    var that = this
    var results = temp.map(function(missed) {
      return _.differenceBy(missed, that.state.fridge, 'id')
    })
    var newCookingToday = this.state.cookingToday.map(function(ingredients, i) {
      ingredients.missedIngredients = results[i]
      return ingredients
    })
    clearCookingToday().then(() => {
      this.setState({ cookingToday : []})
      newCookingToday.forEach(function(recipe) {
        that.addCookingToday(recipe)
      })
      this.fetchCookingToday()
    })

  }

  render() {
    return (
      <div className="main-container">
        {
          this.state.ready
            ? React.cloneElement(this.props.children, {
              updateFridge: this.updateFridge,
              isInFridge: this.isInFridge,
              moreRecipes: this.moreRecipes,
              retryRecipes: this.retryRecipes,
              isLoading: this.state.isLoading,
              errorType: this.state.errorType,
              user: this.state.user,
              toggleAccordion: this.toggleAccordion,
              isExpanded: this.state.isExpanded,
              addCookingToday: this.addCookingToday,
              clearCookingToday: this.clearCookingToday
            })
            : <div className="absolute-center"><Preloader/></div>
        }
      </div>
    )
  }
}

MainContainer.propTypes = {
  children: React.PropTypes.object, // eslint-disable-line react/forbid-prop-types
  location: React.PropTypes.shape({
    pathname: React.PropTypes.string
  })
}

MainContainer.childContextTypes = {
  fridge: React.PropTypes.arrayOf(React.PropTypes.object),
  recipes: React.PropTypes.arrayOf(React.PropTypes.object),
  cookingToday: React.PropTypes.arrayOf(React.PropTypes.object),
  display: React.PropTypes.oneOf(['index', 'dash'])
}

export default MainContainer
