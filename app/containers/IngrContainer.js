import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import Ingredient from '../components/Ingredient'
import * as actions from '../actions'
import { REDIRECT_INGR_THRESHOLD } from '../config/constants'

export default class IngrContainer extends React.Component {
  constructor(props) {
    super(props)
    this.syncUser = this.syncUser.bind(this)
    this.handleToggle = this.handleToggle.bind(this)
  }

  componentWillMount() {
    this.handleToggle = _.throttle(this.handleToggle, 1000, { leading: true })
  }

  handleToggle() {
    /**
     * Check whether we are adding or deleting the ingredient,
     * then check if we are about to transition if we add or
     * delete the ingredient. If we are unmounting, cease calling
     * setState.
     */
    
  }

  syncUser() {
    const { dispatch, userData } = this.props
    dispatch(actions.syncUserData(userData))
  }

  render() {
    return (
      <Ingredient
        {
          /*
           * PROPS:
           * ingredient, idName,
           * handleToggle, display,
           * isLoading, isAdded, success
           */
        }
      />
    )
  }
}

IngrContainer.propTypes = {

}

IngrContainer.childContextTypes = {

}
