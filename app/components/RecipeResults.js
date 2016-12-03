import React from 'react'
import Recipe from './Recipe'
import Preloader from './Preloader'
import Error from './Error'

const RecipeResults = props => {
  let results = props.recipes.contents.map((item, i) =>
    <Recipe key={i} recipe={item} addCookToday={props.addCookToday}/>
  )
  if (props.isLoading && props.recipes.contents.length === 0) {
    results = <Preloader/>
  } else if (props.isLoading && props.recipes.contents.length > 0) {
    results = (
      <div>
        {results}
        <Preloader/>
      </div>
    )
  } else if (props.errorType === 'OFFLINE') {
    results = (
      <li className="media">
        <Error
          msg="Network Connection Error"
          desc="Check your internet connection and try again."
        />
        <center>
          <button
            type="button"
            className="btn btn-warning"
            onClick={props.retryRecipes}
          >
            Try Again
          </button>
        </center>
      </li>
    )
  } else if (props.errorType === 'SERVERERR') {
    results = (
      <li className="media">
        <Error
          msg="Server Error"
          desc="The server is having problems, please leave him alone and try again later."
        />
        <center>
          <button
            type="button"
            className="btn btn-warning"
            onClick={props.retryRecipes}
          >
            Try Again
          </button>
        </center>
      </li>
    )
  } else if (props.recipes.contents.length === 0) {
    const errorDesc = 'Sorry, there are no recipes found containing all the ingredients you want. ' +
      'Try removing one ingredient or two from your fridge.'
    results = (
      <li className="media">
        <Error
          msg="No Results Found"
          desc={errorDesc}
        />
      </li>
    )
  }
  return (
    <div className="card">
      <div className="card-block recipe-card">
        <h4 className="card-title">Recipe Results</h4>
      </div>
      <div className="recipe-list-wrapper">
        <ul className="media-list">
          {results}
        </ul>
      </div>
      <div className="media view-more">
        <div className="media-body media-middle">
          <button
            type="button"
            className="btn btn-link view-more"
            onClick={props.moreRecipes}
          >
            View more...
          </button>
        </div>
      </div>
    </div>
  )
}

RecipeResults.propTypes = {
  moreRecipes: React.PropTypes.func.isRequired,
  retryRecipes: React.PropTypes.func.isRequired,
  addCookToday: React.PropTypes.func.isRequired,
  isLoading: React.PropTypes.bool.isRequired,
  errorType: React.PropTypes.string,
  recipes: React.PropTypes.object
}

export default RecipeResults
