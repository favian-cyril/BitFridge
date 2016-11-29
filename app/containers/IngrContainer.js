import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { throttle } from 'lodash'
import Ingredient from '../components/Ingredient'

class IngredientContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      message: null,
      isLoading: false,
      success: true
    }
    this.handleToggle = this.handleToggle.bind(this)
    this.isInFridge = this.isInFridge.bind(this)
    this.handleToggle = debounce(this.handleToggle, 400)
    this.elemId = `#${this.props.idName}`
  }

  handleToggle() {
    const {} = this.props
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
        isAdded={this.isInFridge(ingredient)}
        ingredient={ingredient}
        idName={idName}
        message={this.state.message}
        success={this.state.success}
        handleToggle={this.handleToggle}
        display={display}

      />
    )
  }
}

IngredientContainer.propTypes = {
  fridge: React.PropTypes.arrayOf(React.PropTypes.object),
  display: React.PropTypes.oneOf(['index', 'dash']),
  parent: React.PropTypes.string.isRequired,
  idName: React.PropTypes.string.isRequired,
  updateFridge: React.PropTypes.func.isRequired,
  isInFridge: React.PropTypes.func.isRequired,
  ingredient: React.PropTypes.shape({
    name: React.PropTypes.string.isRequired
  }).isRequired
}

const mapStateToProps = state => {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(IngredientContainer)
