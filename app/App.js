import React from 'react'
import { omit } from 'lodash'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Preloader from './components/Preloader'
import * as actionCreators from './redux/actions'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.hasChanged = this.hasChanged.bind(this)
  }
  
  componentWillMount() {
    /**
     * Removes hash values from logins or anything else from the URL.
     */
    history.pushState("", document.title, window.location.pathname + window.location.search);
  }

  componentDidMount() {
    /**
     * Initial display setting and fetching of user data and recipes.
     * Displays preloader until all data has been fetched.
     * Receives pathname
     */
    const { initialSetup } = this.props
    initialSetup(this.props.pathname)
  }

  componentWillReceiveProps(nextProps) {
    /** On fridge change, transition display if needed,
     * then refresh recipes and update missing cooking
     * today recipes' ingredients.
     */
    const {
      transitionDisplay, refreshRecipes,
      updateMissingCookingToday, syncUserData
    } = this.props
    
    if (this.hasChanged(this.props.fridge, nextProps.fridge)) {
      const currentFridgeLength = this.props.fridge.contents.length
      const nextFridgeLength = nextProps.fridge.contents.length
      if (this.props.display === 'dash' && nextFridgeLength < currentFridgeLength ||
        this.props.display === 'index' && nextFridgeLength > currentFridgeLength) {
        transitionDisplay(this.props.pathname)
      }
      Promise.all([refreshRecipes(), updateMissingCookingToday()]).then(syncUserData)
    }
    if (this.hasChanged(this.props.cookingToday, nextProps.cookingToday)) {
      syncUserData()
    }
  }

  hasChanged(obj, nextObj) {
    return (obj !== undefined && obj.contents.length !== nextObj.contents.length)
  }

  render() {
    const { ready } = this.props
    const children = ready
      ? React.cloneElement(this.props.children, omit(this.props, 'children'))
      : <div className="absolute-center"><Preloader/></div>
    return (
      <div className="main-container">
        { children }
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  ...state,
  pathname: ownProps.location.pathname
})

const mapDispatchToProps = dispatch => (
  bindActionCreators(actionCreators, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(App)
