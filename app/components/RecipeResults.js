import React from 'react'
import Recipe from './Recipe'
import Preloader from './Preloader'

const RecipeResults = (props, context) => {
  const preloader = props.isLoading ? <Preloader/> : null
  const results = context.recipes
    ? context.recipes.map((item, i) =>
      <Recipe
        key={i}
        recipe={item}
      />
    )
    : null
  return (
    <div className="card">
      <div className="card-block recipe-card">
        <h4 className="card-title">Recipe Results</h4>
      </div>
      <div className="recipe-list-wrapper">
        <ul className="media-list">
          {results}
          {preloader}
        </ul>
      </div>
      <div className="media view-more">
        <div className="media-body media-middle">
          <button
            type="button"
            className="btn btn-link view-more"
            onClick={props.viewMore}
          >
            View more...
          </button>
        </div>
      </div>
    </div>
  )
}

RecipeResults.propTypes = {
  viewMore: React.PropTypes.func.isRequired,
  isLoading: React.PropTypes.bool.isRequired
}

RecipeResults.contextTypes = {
  recipes: React.PropTypes.arrayOf(React.PropTypes.object)
}

export default RecipeResults
