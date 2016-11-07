import React from 'react'

const Ingredient = (props) => {
  const imgBaseURL = 'https://spoonacular.com/cdn/ingredients_100x100/'
  const imageURL = imgBaseURL + props.ingredient.image
  const name = props.ingredient.name
  const dataPlacement = (props.display === 'index') ? 'right' : 'left'
  const iconClass = !props.isLoading ? 'fa-plus btn-add-icon' : 'fa-spinner fa-pulse btn-loading'
  const buttonClass = props.isAdded && !props.isLoading ? 'added' : ''
  const tooltipClass = props.success ? 'success' : 'failure'
  const tooltipHTML = '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div>' +
    `<div class="tooltip-inner ${tooltipClass}"></div></div>`
  return (
    <li className="media ingredient" onMouseDown={e => e.preventDefault()}>
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
          id={props.idName}
          onClick={props.handleToggle}
          className={`btn btn-default btn-add ${buttonClass}`}
          title={props.message}
          data-placement={dataPlacement}
          data-template={tooltipHTML}
        >
          <i className={`fa fa-2x ${iconClass}`}/>
        </button>
      </div>
    </li>
  )
}

Ingredient.propTypes = {
  isLoading: React.PropTypes.bool.isRequired,
  isAdded: React.PropTypes.bool.isRequired,
  ingredient: React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
    image: React.PropTypes.string.isRequired
  }).isRequired,
  success: React.PropTypes.bool.isRequired,
  idName: React.PropTypes.string.isRequired,
  message: React.PropTypes.string,
  handleToggle: React.PropTypes.func.isRequired,
  display: React.PropTypes.oneOf(['index', 'dash'])
}

export default Ingredient
