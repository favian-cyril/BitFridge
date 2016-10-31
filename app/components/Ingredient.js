import React from 'react'

const Ingredient = (props) => {
  const imgBaseURL = 'https://spoonacular.com/cdn/ingredients_100x100/'
  const imageURL = imgBaseURL + props.ingredient.image
  const name = props.ingredient.name
  const dataPlacement = (props.display === 'index') ? 'right' : 'left'
  const icon = !props.isLoading
    ? <i className="fa fa-2x fa-plus btn-add-icon"/>
    : <i className="fa fa-2x fa-spinner fa-pulse btn-loading"/>
  let buttonClass = ''
  if (props.isAdded && !props.isLoading) {
    buttonClass = `${buttonClass} success`
  }
  return (
    <li className="media ingredient" onMouseDown={e => e.preventDefault()}>
      <div className="media-left media-middle">
        <img className="img-rounded" src={imageURL} alt="40x40" width="40" height="40"/>
      </div>
      <div className="media-body">
        <p className="media-heading">{ name }</p>
      </div>
      <div className="media-right media-middle">
        <button
          id={props.idName}
          onMouseUp={props.handleToggle}
          className={`btn btn-default btn-add ${buttonClass}`}
          title={props.message}
          data-toggle="tooltip"
          data-container="body"
          data-placement={dataPlacement}
          data-trigger="manual"
        >
          {icon}
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
  idName: React.PropTypes.string,
  message: React.PropTypes.string,
  handleToggle: React.PropTypes.func.isRequired,
  display: React.PropTypes.oneOf(['index', 'dash'])
}

export default Ingredient
