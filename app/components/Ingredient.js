import React from 'react'
import { throttle } from 'lodash'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { toggleAddDelete } from  '../actions'
import uiUtils from '../utils/ui'

class Ingredient extends React.Component {
  constructor(props) {
    super(props)
    this.handleToggleAddDelete = this.handleToggleAddDelete.bind(this)
    this.handleToggleAddDelete = throttle(this.handleToggleAddDelete, 500, { leading: true })
  }
  
  handleToggleAddDelete() {
    this.props.toggleAddDelete(this.props.ingredient, this.props.idName)
    // If adding from fridge, scroll down
    if (this.props.parent === 'search') {
      const classSelector = '.fridge-content.list-wrapper'
      uiUtils.anims.scrollDown(classSelector)
    }
  }

  render() {
    const imgBaseURL = 'https://spoonacular.com/cdn/ingredients_100x100/'
    const imageURL = imgBaseURL + this.props.ingredient.image
    const name = this.props.ingredient.name
    const dataPlacement = this.props.display === 'index' ? 'right' : 'left'
    const buttonClass = this.props.ingredient.isAdded ? 'added' : ''
    const tooltipHTML = '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div>' +
      '<div class="tooltip-inner success"></div></div>'
    return (
      <li
        className="media ingredient"
        onMouseDown={e => e.preventDefault()}
      >
        <div className="media-left media-middle">
          <img className="img-rounded" src={imageURL} alt="40x40" width="40" height="40"/>
        </div>
        <div className="media-body">
          <div className="ingr-name-overlay"></div>
          <div className="ingr-name-wrapper">
            <p className="media-heading">{name}</p>
          </div>
        </div>
        <div className="media-right media-middle">
          <button
            id={this.props.idName}
            onClick={this.handleToggleAddDelete}
            className={`btn btn-default btn-add ${buttonClass}`}
            title={this.props.message}
            data-placement={dataPlacement}
            data-template={tooltipHTML}
          >
            <i className="fa fa-2x fa-plus btn-add-icon"/>
          </button>
        </div>
      </li>
    )
  }
}

Ingredient.propTypes = {
  ingredient: React.PropTypes.shape({
    id: React.PropTypes.number.isRequired,
    name: React.PropTypes.string.isRequired,
    image: React.PropTypes.string.isRequired,
    isAdded: React.PropTypes.bool.isRequired
  }).isRequired,
  idName: React.PropTypes.string.isRequired,
  parent: React.PropTypes.oneOf(['search', 'fridge']),
  message: React.PropTypes.string,
  display: React.PropTypes.oneOf(['index', 'dash']),
  toggleAddDelete: React.PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    message: state.message,
    display: state.display
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    toggleAddDelete
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Ingredient)
