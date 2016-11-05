import React from 'react'

const Recipe = (props) => {
  const missing = props.recipe.missing
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
        <img className="img-rounded" src={props.recipe.image} alt={props.recipe.name} width="90" height="90"/>
      </div>
      <div className="media-body">
        <h5 className="media-heading">{props.recipe.name}</h5>
        <small className="missing-str">Missing: {missingStr}</small>
      </div>
      <div className="media-right media-middle">
        <a
          className="btn btn-default btn-add"
          href={props.recipe.url}
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
    name: React.PropTypes.string.isRequired,
    image: React.PropTypes.object,  // eslint-disable-line react/forbid-prop-types
    url: React.PropTypes.string,
    missing: React.PropTypes.array
  }).isRequired
}

export default Recipe
