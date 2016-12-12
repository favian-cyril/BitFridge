import React from 'react'
import { throttle } from 'lodash'
import Recipe from './Recipe'
import Preloader from './Preloader'
import Error from './Error'
import uiUtils from '../utils/ui'

class RecipeList extends React.Component {
  constructor(props) {
    super(props)
    this.handleMoreRecipes = this.handleMoreRecipes.bind(this)
    this.handleRetryRecipes = this.handleRetryRecipes.bind(this)
    this.handleToggleFavorite = this.handleToggleFavorite.bind(this)
    this.handleAddToCookingToday = this.handleAddToCookingToday.bind(this)
    this.handleMoreRecipes = throttle(this.handleMoreRecipes, 500, { leading: true })
  }

  handleMoreRecipes() {
    this.props.moreRecipes()
    uiUtils.anims.scrollDown('.recipe-list-wrapper')
  }

  handleRetryRecipes() {
    this.props.retryRecipes()
  }

  handleToggleFavorite() {
    this.props.toggleFavorite()
  }

  handleAddToCookingToday(recipe) {
    this.props.addCookToday(recipe)
    uiUtils.anims.scrollDown('.cooking-today-content.list-wrapper')
  }

  render() {
    let results = this.props.recipes.contents.map((item, i) =>
      <Recipe
        key={i}
        recipe={item}
        toggleFavorite={this.handleToggleFavorite}
        addCookToday={this.handleAddToCookingToday}
      />
    )
    if (this.props.isLoading && this.props.recipes.contents.length === 0) {
      results = <Preloader/>
    } else if (this.props.isLoading && this.props.recipes.contents.length > 0) {
      results = (
        <div>
          {results}
          <Preloader/>
        </div>
      )
    } else if (this.props.errorType === 'OFFLINE') {
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
              onClick={this.props.retryRecipes}
            >
              Try Again
            </button>
          </center>
        </li>
      )
    } else if (this.props.errorType === 'SERVERERR') {
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
              onClick={this.handleRetryRecipes}
            >
              Try Again
            </button>
          </center>
        </li>
      )
    } else if (this.props.recipes.contents.length === 0) {
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
      <div>
        <div className="recipe-list-wrapper">
          <ul className="media-list">
            {results}
          </ul>
        </div>
        {
          (this.props.parent === 'result') ?
            <div className="media view-more">
              <div className="media-body media-middle">
                <button
                  type="button"
                  className="btn btn-link view-more"
                  onClick={this.handleMoreRecipes}
                >
                  View more...
                </button>
              </div>
            </div>
            :
            ''
        }
      </div>
    )
  }
}

RecipeList.propTypes = {
  isLoading: React.PropTypes.bool.isRequired,
  toggleFavorite: React.PropTypes.func.isRequired,
  addCookToday: React.PropTypes.func.isRequired,
  moreRecipes: React.PropTypes.func.isRequired,
  retryRecipes: React.PropTypes.func.isRequired,
  errorType: React.PropTypes.string,
  recipes: React.PropTypes.object.isRequired,
  parent: React.PropTypes.oneOf(['result', 'favorite'])
}

export default RecipeList