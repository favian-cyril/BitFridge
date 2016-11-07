import React from 'react'

const Recipe = (props) => {
  const missing = props.recipe.missedIngredients.map(item => item.name)
  let missingStr
  if (missing) {
    missingStr = missing.slice(0, 4).join(', ')
    if (missing.length > 4) {
      const number = missing.slice(4).length.toString()
      missingStr = `${missingStr} +${number} more`
    }
  }
  return (
    <li className="media ingredient">
      <div className="media-left media-middle">
        <img
          className="img-rounded"
          src={props.recipe.image}
          alt={props.recipe.title}
          width="90"
          height="90"
        />
      </div>
      <div className="media-body">
        <h5 className="media-heading">{props.recipe.title}</h5>
        <small className="missing-str">Missing: {missingStr}</small>
      </div>
      <div className="media-right media-middle">
        <a
          className="btn btn-default btn-add"
          href={props.recipe.sourceUrl}
          target="_blank" rel="noopener noreferrer"
        >
          <i className="fa fa-2x fa-external-link"/>
        </a>
      </div>
    </li>
  )
}

Recipe.propTypes = {
  recipe: React.PropTypes.shape({
    title: React.PropTypes.string.isRequired,
    image: React.PropTypes.string.isRequired,  // eslint-disable-line react/forbid-prop-types
    sourceUrl: React.PropTypes.string.isRequired,
    missedIngredients: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        name: React.PropTypes.string.isRequired
      }).isRequired
    ).isRequired
  }).isRequired
}

export default Recipe
