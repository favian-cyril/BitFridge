import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import Preloader from '../components/Preloader'
import * as actions from '../actions'
import { REDIRECT_INGR_THRESHOLD } from '../config/constants'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    // bindings
  }
  
  componentDidMount() {
    const { dispatch, fridge, location } = this.props
    dispatch(actions.fetchUserData())
      .then(() => {
        dispatch(actions.setDisplay(location.pathname))
        Promise.resolves(fridge.contents.length > 0)
          .then((shouldFetchRecipes) => {
            if (shouldFetchRecipes) {
              dispatch(actions.fetchRecipes())
            }
          })
          .then(() => {
            dispatch(actions.setReady())
          })
      })
  }

  componentWillUpdate(nextProps) {
    if (this.props.fridge.contents.length !== nextProps.fridge.contents.length) {
      const { dispatch, fridge } = nextProps
      // Determine which path the router should transition into and which display should be set
      const onThreshold = this.props.fridge.contents.length === REDIRECT_INGR_THRESHOLD
      const shouldTransitionToIndex = fridge.length < REDIRECT_INGR_THRESHOLD && onThreshold
      const shouldTransitionToDash = fridge.length > REDIRECT_INGR_THRESHOLD && onThreshold
      const pathname = shouldTransitionToIndex ? '/' : shouldTransitionToDash ? '/dash' : null
      // Make router transition then set appropriate display
      Promise.resolves(pathname)
        .then((pathname) => {
          browserHistory.push(pathname)
        })
        .then(() => {
          dispatch(actions.setDisplay(pathname))
        })
    }
  }

  render() {
    return (
      <div className="main-container">
        {
          this.state.ready
            ? React.cloneElement(this.props.children, {
            // props
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
