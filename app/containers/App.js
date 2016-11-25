import React from 'react'
import { connect } from 'react-redux'
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
    dispatch(actions.fetchUserData())
      .then(() => {
        dispatch(actions.setDisplay(location.pathname))
        Promise.resolves(fridge.contents.length > 0)
          .then((shouldFetchRecipes) => {
            if (shouldFetchRecipes) {
              dispatch(actions.preFetchRecipes())
            }
          })
          .then(() => {
            dispatch(actions.setReady())
          })
      })
  }

  componentWillUpdate(nextProps) {
    const { dispatch, fridge, cookingToday } = nextProps
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
      // ingredients in cookingToday
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
    
    // Location path change
    if (this.props.location.pathname !== nextProps.location.pathname) {
      dispatch(actions.setDisplay(pathname))
    }
   
    // CookingToday change
    if (this.props.cookingToday.length !== nextProps.cookingToday.length) {
      this.syncUser()
    } 
  }

  syncUser() {
    const { dispatch, userData } = this.props
    dispatch(actions.syncUserData(userData))
  }
  
  

  render() {
    return (
      <div className="main-container">
        {
          this.state.ready
            ? React.cloneElement(this.props.children, {
            /*
            * PROPS:
            * updateFridge, isInFridge,
            * moreRecipes, retryRecipes
            * toggleAccordion,
            * addCookingToday, clearCookingToday
            */
            })
            : <div className="absolute-center"><Preloader/></div>
        }
      </div>
    )
  }
}

App.propTypes = {

}

App.childContextTypes = {

}

