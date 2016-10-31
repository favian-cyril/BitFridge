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
        <img className="img-rounded" src={props.recipe.imageUrlsBySize['90']} alt="90x90" width="90" height="90"/>
      </div>
      <div className="media-body">
        <h5 className="media-heading">{props.recipe.recipeName}</h5>
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
    recipeName: React.PropTypes.string.isRequired,
    imageUrlsBySize: React.PropTypes.object,  // eslint-disable-line react/forbid-prop-types
    sourceUrl: React.PropTypes.string,
    missing: React.PropTypes.array
  }).isRequired
}

export default Recipe
