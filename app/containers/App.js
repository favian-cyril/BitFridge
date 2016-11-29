import React from 'react'
import { omit } from 'lodash'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import Preloader from '../components/Preloader'
import { intialSetup, syncUserData, refreshRecipes, updateMissingCookingToday, handleError } from '../actions'
import { VIEW_THRESHOLD } from '../config/constants'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.syncUser = this.syncUser.bind(this)
  }

  componentDidMount() {
    this.props.initialSetup()
  }

  componentWillUpdate(nextProps) {
    const { fridge, transitionDisplay } = this.props
    const { nextFridge } = nextProps
    if (fridge && fridge.contents.length !== nextFridge.contents.length) {
      
    }
    
    
    
    
  //   const { fridge, cookingToday, refreshRecipes,  } = nextProps
  //   if (fridge !== undefined && cookingToday !== undefined) {
  //     const onThreshold = this.props.fridge.contents.length === VIEW_THRESHOLD
  //     const shouldTransitionToIndex = fridge.length < VIEW_THRESHOLD && onThreshold
  //     const shouldTransitionToDash = fridge.length > VIEW_THRESHOLD && onThreshold
  //     const pathname = shouldTransitionToIndex ? '/' : shouldTransitionToDash ? '/dash' : null
  //
  //     // Fridge change
  //     if (this.props.fridge.contents.length !== nextProps.fridge.contents.length) {
  //       // Transition between screens
  //       if (pathname !== null) {
  //         browserHistory.push(pathname)
  //       }
  //       // Refresh recipes on fridge change, then update missing
  //       refreshRecipes()
  //         .then(
  //           () => updateMissingCookingToday(fridge),
  //           error => handleError(error, 'cookingToday')
  //         )
  //         .then(
  //           () => this.syncUser(),
  //           error => handleError(error, 'userData')
  //         )
  //         .catch(error => handleError(error, 'recipes'))
  //     }
  //
  //     // CookingToday change
  //     if (this.props.cookingToday.length !== nextProps.cookingToday.length) {
  //       this.syncUser()
  //     }
  //
  //     // Location path change
  //     if (this.props.location.pathname !== nextProps.location.pathname) {
  //       setDisplay()
  //     }
  //   }
  // }

  syncUser() {
    const { userData } = this.props
    syncUserData(userData)
  }

  render() {
    const { ready, display } = this.props
    return (
      <div className="main-container">
        {
          ready
            ? React.cloneElement(this.props.children, omit(this.props, 'children'))
            : <div className="absolute-center"><Preloader/></div>
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  ready: state.ready,
  display: state.display,
  
})

const mapDispatchToProps = dispatch => bindActionCreators({ ...actionCreators }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(App)
