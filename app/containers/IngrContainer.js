import React from 'react'
import $ from 'jquery'
import _ from 'lodash'
import Ingredient from '../components/Ingredient'
import { addIngredient, delIngredient } from '../clientapi'
import { REDIRECT_INGR_THRESHOLD } from '../config/constants'

class IngredientContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      message: null,
      isLoading: false,
      success: true
    }
    this.handleToggle = this.handleToggle.bind(this)
    this.showTooltip = this.showTooltip.bind(this)
    this.elemId = `#${this.props.idName}`
  }

  componentWillMount() {
    this.handleToggle = _.throttle(this.handleToggle, 1000, { leading: true })
  }

  handleToggle() {
    let unmounting
    if (!this.props.isInFridge(this.props.ingredient)) {
      unmounting = this.context.display === 'index' &&
        this.context.fridge.length === REDIRECT_INGR_THRESHOLD - 1
      const showPreloader = setTimeout(() => {
        if (!unmounting) this.setState({ isLoading: true })
      }, 50)
      addIngredient(this.props.ingredient)
        .then(() => {
          if (!unmounting) {
            this.setState({ message: 'Added to fridge!', isLoading: false, success: true })
            this.showTooltip()
          }
          clearTimeout(showPreloader)
          this.props.updateFridge('ADD', this.props.ingredient)
        })
        .catch(() => {
          this.setState({ message: 'Failed to add ingredient.', success: false })
          if (!unmounting) {
            this.setState({ isLoading: false })
            this.showTooltip()
          }
          clearTimeout(showPreloader)
        })
    } else {
      unmounting = this.context.display === 'dash' &&
        this.context.fridge.length === REDIRECT_INGR_THRESHOLD
      const showPreloader = setTimeout(() => {
        if (!unmounting) this.setState({ isLoading: true })
      }, 50)
      delIngredient(this.props.ingredient)
        .then(() => {
          if (!unmounting && this.props.parent !== 'fridge') {
            this.setState({ message: 'Deleted from fridge!', isLoading: false, success: true })
            this.showTooltip()
          }
          clearTimeout(showPreloader)
          this.props.updateFridge('DEL', this.props.ingredient)
        })
        .catch(() => {
          this.setState({ message: 'Failed to delete ingredient.', success: false })
          if (!unmounting && this.props.parent !== 'fridge') {
            this.setState({ isLoading: false })
            this.showTooltip()
          }
          clearTimeout(showPreloader)
        })
    }
  }

  showTooltip() {
    window.showTooltip($(this.elemId))
    $('.tooltip-inner').last().html(this.state.message)
  }

  render() {
    return (
      <Ingredient
        ingredient={this.props.ingredient}
        idName={this.props.idName}
        handleToggle={this.handleToggle}
        display={this.context.display}
        isLoading={this.state.isLoading}
        isAdded={this.props.isInFridge(this.props.ingredient)}
        success={this.state.success}
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
  recipes: React.PropTypes.arrayOf(React.PropTypes.object),
  display: React.PropTypes.oneOf(['index', 'dash'])
}

export default IngredientContainer
