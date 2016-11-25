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
    const { dispatch, fridge } = this.props
    let unmounting
    if (_.findIndex(this.props.fridge,
        function(i) { return i.id == this.props.ingredient.id; }) !== -1) {
      unmounting = this.props.display === 'index' &&
        this.props.fridge.length === REDIRECT_INGR_THRESHOLD - 1
      const showPreloader = setTimeout(() => {
        if (!unmounting) dispatch(actions.setReady())
      }, 50)
      dispatch(actions.addToFridge(this.props.ingredient))
        .then(() => {
          if (!unmounting) {
            dispatch(actions.setReady())
              .then(
                () => dispatch(actions.showTooltip(this.props.idName, 'Added to fridge!'))
              )
          }
          clearTimeout(showPreloader)
        })
        .catch(() => {
          if (!unmounting) {
            dispatch(actions.setReady())
              .then(
                () => dispatch(actions.showTooltip(this.props.idName, 'Failed to add ingredient.'))
              )
          }
          clearTimeout(showPreloader)
        })
    } else {
      unmounting = this.props.display === 'dash' &&
        this.props.fridge.length === REDIRECT_INGR_THRESHOLD
      const showPreloader = setTimeout(() => {
        if (!unmounting) dispatch(actions.setReady())
      }, 50)
      dispatch(actions.delFromFridge(this.props.ingredient))
        .then(() => {
          if (!unmounting && this.props.parent !== 'fridge') {
            dispatch(actions.setReady())
              .then(
                () => dispatch(actions.showTooltip(this.props.idName, 'Deleted from fridge!'))
              )
          }
          clearTimeout(showPreloader)
        })
        .catch(() => {
          if (!unmounting && this.props.parent !== 'fridge') {
            dispatch(actions.setReady())
              .then(
                () => dispatch(actions.showTooltip(this.props.idName, 'Failed to delete ingredient.'))
              )
          }
          clearTimeout(showPreloader)
        })
    }
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
