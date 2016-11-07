import React from 'react'
import _ from 'lodash'
import { browserHistory } from 'react-router'
import Preloader from '../components/Preloader'
import { getFridge, searchResults } from '../clientapi'
import { REDIRECT_INGR_THRESHOLD } from '../config/constants'
import anims from '../utils/anims'

class MainContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ready: false,
      fridge: [],
      recipes: [],
      display: null,
      isLoading: false,
      recipePage: 1,
      errorType: {
        fridge: '',
        recipes: ''
      }
    }
    this.fetchFridge = this.fetchFridge.bind(this)
    this.updateFridge = this.updateFridge.bind(this)
    this.isInFridge = this.isInFridge.bind(this)
    this.fetchRecipes = this.fetchRecipes.bind(this)
    this.moreRecipes = this.moreRecipes.bind(this)
    this.retryRecipes = this.retryRecipes.bind(this)
    this.handleError = this.handleError.bind(this)
  }

  getChildContext() {
    return {
      fridge: this.state.fridge,
      display: this.state.display,
      recipes: this.state.recipes
    }
  }

  componentWillMount() {
    this.moreRecipes = _.throttle(this.moreRecipes, 1000, { leading: true })
  }

  componentDidMount() {
    this.fetchDisplay(this.props.location.pathname)
    this.fetchFridge().then(() => {
      if (this.state.fridge.length > 0) {
        this.fetchRecipes().then(() => {
          this.setState({ ready: true })
        })
      } else {
        this.setState({ ready: true })
      }
    })
  }

  componentWillUpdate(nextProps, nextState) {
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
    if (prevState.fridge.length !== this.state.fridge.length) {
      this.fetchRecipes()
    }
  }

  fetchDisplay(pathname) {
    if (pathname === '/') {
      this.setState({ display: 'index' })
    } else if (pathname === '/dash') {
      this.setState({ display: 'dash' })
    }
  }

  fetchFridge() {
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

  updateFridge(action, ingredient) {
    const newFridge = this.state.fridge.slice()
    if (action === 'ADD') {
      newFridge.push(ingredient)
    } else if (action === 'DEL') {
      _.remove(newFridge, item => item.id === ingredient.id)
    }
    this.setState({ fridge: newFridge })
  }

  isInFridge(ingredient) {
    const found = _.find(this.state.fridge, item => item.id === ingredient.id)
    return found !== undefined
  }

  moreRecipes() {
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
    const clearedError = { fridge: this.state.errorType.fridge, recipes: '' }
    this.setState({ errorType: clearedError })
    this.fetchRecipes()
  }

  handleError(err, component) {  // eslint-disable-line class-methods-use-this
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
              errorType: this.state.errorType
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
  display: React.PropTypes.oneOf(['index', 'dash'])
}

export default MainContainer
