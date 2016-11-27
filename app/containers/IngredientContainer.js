import React from 'react'
import _ from 'lodash'
import Ingredient from '../components/Ingredient'
import * as actions from '../actions'
import { REDIRECT_INGR_THRESHOLD } from '../config/constants'
import uiUtils from '../utils/ui'

class IngredientContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      message: null,
      isLoading: false
    }
    this.handleToggle = this.handleToggle.bind(this)
    this.isInFridge = this.isInFridge.bind(this)
    this.elemId = `#${this.props.idName}`
  }

  componentWillMount() {
    this.handleToggle = _.throttle(
      this.handleToggle, 1000, { leading: true }
    )
  }

  handleToggle() {
    const { isInFridge, ingredient, idName, parent, dispatch } = this.props
    const { fridge, display } = this.context
    const fridgeLen = fridge.content.length
    const action = !isInFridge(ingredient)
      ? actions.addToFridge(ingredient)
      : actions.delFromFridge(ingredient)
    const unmounting = (action.type === actions.ADD_TO_FRIDGE &&
    fridgeLen < REDIRECT_INGR_THRESHOLD &&
    display === 'index')
      ? true : (action.type === actions.DEL_FROM_FRIDGE &&
    fridgeLen >= REDIRECT_INGR_THRESHOLD &&
    display === 'dash')
      ? false : null
    dispatch(action)
      .then(() => {
        if (!unmounting && parent !== 'fridge') {
          const message = action.type === actions.ADD_TO_FRIDGE
            ? 'Added ingredient to fridge!'
            : action.type === actions.DEL_FROM_FRIDGE
            ? 'Deleted ingredient from fridge!' : null
          this.setState({ message })
          uiUtils.tooltips.showTooltip(idName, this.state.message)
        }
      })
  }

  isInFridge(ingredient) {
    const found = _.find(this.state.fridge, item => item.id === ingredient.id)
    return found !== undefined
  }

  render() {
    const { ingredient, idName } = this.props
    const { display } = this.context
    return (
      <Ingredient
        ingredient={ingredient}
        idName={idName}
        handleToggle={this.handleToggle}
        display={display}
        isAdded={this.isInFridge(ingredient)}
      />
    )
  }
}

IngredientContainer.propTypes = {
  parent: React.PropTypes.string.isRequired,
  idName: React.PropTypes.string.isRequired,
  updateFridge: React.PropTypes.func.isRequired,
  isInFridge: React.PropTypes.func.isRequired,
  ingredient: React.PropTypes.shape({
    name: React.PropTypes.string.isRequired
  }).isRequired
}

IngredientContainer.contextTypes = {
  fridge: React.PropTypes.arrayOf(React.PropTypes.object),
  display: React.PropTypes.oneOf(['index', 'dash'])
}

export default IngredientContainer
