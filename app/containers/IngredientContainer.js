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
      isLoading: false
    }
    this.handleToggle = this.handleToggle.bind(this)
    this.showTooltip = this.showTooltip.bind(this)
  }

  handleToggle() {
    let unmounting
    let failed = false
    if (!this.props.isInFridge(this.props.ingredient)) {
      unmounting = this.context.display === 'index' &&
        this.context.fridge.length === REDIRECT_INGR_THRESHOLD - 1
      const showPreloader = setTimeout(() => { if (!unmounting) this.setState({ isLoading: true }) }, 50)
      addIngredient(this.props.ingredient)
        .then(() => {
          if (!unmounting) {
            this.setState({
              message: `Added ${this.props.ingredient.name} to fridge!`,
              isLoading: false
            })
          }
          clearTimeout(showPreloader)
          this.props.updateFridge('ADD', this.props.ingredient)
        })
        .catch(() => {
          this.setState({ message: 'Failed to add ingredient.' })
          if (!unmounting) this.setState({ isLoading: false })
          clearTimeout(showPreloader)
          failed = true
        })
    } else {
      unmounting = this.props.parent === 'fridge' ||
        (this.context.fridge.length === REDIRECT_INGR_THRESHOLD &&
        this.context.display === 'dash')
      const showPreloader = setTimeout(() => { if (!unmounting) this.setState({ isLoading: true }) }, 50)
      delIngredient(this.props.ingredient)
        .then(() => {
          if (!unmounting) {
            this.setState({
              message: `Deleted ${this.props.ingredient.name} from fridge!`,
              isLoading: false
            })
          }
          clearTimeout(showPreloader)
          this.props.updateFridge('DEL', this.props.ingredient)
        })
        .catch(() => {
          this.setState({ message: 'Failed to delete ingredient.' })
          if (!unmounting) this.setState({ isLoading: false })
          clearTimeout(showPreloader)
          failed = true
        })
    }
    if (!unmounting || failed) this.showTooltip()
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
