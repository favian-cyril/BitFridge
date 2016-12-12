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
     * Initial display setting and fetching of user data and
     * recipes. Displays preloader until all data has been fetched.
     * Receives current pathname as argument for initial setup.
     * In addition, also removes hash values from logins or anything
     * else from the URL.
     */
    const { initialSetup, transitionDisplay } = this.props
    initialSetup(this.props.pathname)
    history.pushState("", document.title, window.location.pathname + window.location.search);
    transitionDisplay(this.props.pathname)
  }

  componentDidMount() {
    /**
     * Sets up a listener that executes on before window
     * unload and prevents exit if userData is not yet synced.
     */
    window.onbeforeunload = e => {
      if (this.props.userData.didInvalidate) {
        return false
      }
    }
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
      Promise.all([refreshRecipes(), updateMissingCookingToday(), updateShoppingList()]).then(syncUserData)
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
