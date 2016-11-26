import React from 'react'
import { browserHistory } from 'react-router'
import Preloader from '../components/Preloader'
import * as actions from '../actions'
import { REDIRECT_INGR_THRESHOLD } from '../config/constants'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.syncUser = this.syncUser.bind(this)
  }

  componentDidMount() {
    const { dispatch, fridge, location } = this.props
    Promise.resolve().then(() => {
      dispatch(actions.fetchUserData())
      dispatch(actions.setDisplay(location.pathname))
    })
      .then(() => {
       if (fridge && fridge.contents.length > 0) {
          dispatch(actions.preFetchRecipes())
        }
      })
      .then(() => {
        dispatch(actions.setReady())
      })
  }

  componentWillUpdate(nextProps) {
    const { dispatch, fridge, cookingToday } = nextProps
    if (fridge !== undefined && cookingToday !== undefined) {
      const onThreshold = this.props.fridge.contents.length === REDIRECT_INGR_THRESHOLD
      const shouldTransitionToIndex = fridge.length < REDIRECT_INGR_THRESHOLD && onThreshold
      const shouldTransitionToDash = fridge.length > REDIRECT_INGR_THRESHOLD && onThreshold
      const pathname = shouldTransitionToIndex ? '/' : shouldTransitionToDash ? '/dash' : null

      // Fridge change
      if (this.props.fridge.contents.length !== nextProps.fridge.contents.length) {
        // Transition between screens
        if (pathname !== null) {
          browserHistory.push(pathname)
        }
        // Refresh recipes on fridge change, then update missing
        dispatch(actions.refreshRecipes())
          .then(
            () => dispatch(actions.updateMissingCookingToday(fridge)),
            error => dispatch(actions.handleError(error, 'cookingToday'))
          )
          .then(
            () => this.syncUser(),
            error => dispatch(actions.handleError(error, 'userData'))
          )
          .catch(error => dispatch(actions.handleError(error, 'recipes')))
      }

      // CookingToday change
      if (this.props.cookingToday.length !== nextProps.cookingToday.length) {
        this.syncUser()
      }

      // Location path change
      if (this.props.location.pathname !== nextProps.location.pathname) {
        dispatch(actions.setDisplay(pathname))
      }
    }
  }

  syncUser() {
    const { dispatch, userData } = this.props
    dispatch(actions.syncUserData(userData))
  }

  render() {
    const { dispatch, ready, display } = this.props
    return (
      <div className="main-container">
        {
          ready
            ? React.cloneElement(this.props.children, {
                display,
                moreRecipes: () => dispatch(actions.moreRecipes()),
                retryRecipes: () => dispatch(actions.retryRecipes()),
                addCookingToday: (recipe) => dispatch(actions.addToCookingToday(recipe)),
                clearCookingToday: () => dispatch(actions.clearCookingToday()),
                toggleCookingToday: (id) => dispatch(actions.toggleCookingToday(id))
              })
            : <div className="absolute-center"><Preloader/></div>
        }
      </div>
    )
  }
}

App.contextTypes = {
  store: React.PropTypes.object
}