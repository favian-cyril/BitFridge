import React from 'react'
import $ from 'jquery'
import Ingredient from '../components/Ingredient'
import { addIngredient, delIngredient } from '../clientapi'
import { REDIRECT_INGR_THRESHOLD } from '../config/constants'

class IngredientContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      message: null,
      isLoading: false,
      wait: false
    }
    this.handleToggle = this.handleToggle.bind(this)
    this.showTooltip = this.showTooltip.bind(this)
  }

  componentDidUpdate() {
    if (this.state.wait) {
      setTimeout(() => {
        if (this.state.wait) this.setState({ isLoading: true, wait: false })
      }, 50)
    }
  }

  handleToggle() {
    let unmounting
    let failed = false
    if (!this.props.isInFridge(this.props.ingredient)) {
      unmounting = this.context.display === 'index' &&
        this.context.fridge.length === REDIRECT_INGR_THRESHOLD - 1
      if (!unmounting) this.setState({ wait: true })
      addIngredient(this.props.ingredient, (err) => {
        if (!err) {
          const successMessage = `Added ${this.props.ingredient.name} to fridge!`
          if (!unmounting) this.setState({ message: successMessage })
          this.props.updateFridge('ADD', this.props.ingredient)
        } else {
          this.setState({ message: 'Failed to add ingredient.' })
          failed = true
        }
        if (!unmounting) this.setState({ isLoading: false, wait: false })
      })
    } else {
      unmounting = this.props.parent === 'fridge' ||
        (this.context.fridge.length === REDIRECT_INGR_THRESHOLD &&
        this.context.display === 'dash')
      if (!unmounting) this.setState({ wait: true })
      delIngredient(this.props.ingredient, (err) => {
        if (!err) {
          const successMessage = `Deleted ${this.props.ingredient.name} from fridge!`
          if (!unmounting) this.setState({ message: successMessage })
          this.props.updateFridge('DEL', this.props.ingredient)
        } else {
          this.setState({ message: 'Failed to delete ingredient.' })
          failed = true
        }
        if (!unmounting) {
          this.setState({ isLoading: false, wait: false })
        }
      })
    }
    if (!unmounting || failed) {
      this.showTooltip()
    }
  }

  showTooltip() {
    const elemId = `#${this.props.idName}`
    window.showTooltip($(elemId))
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
