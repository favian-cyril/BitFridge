import React from 'react'
import { throttle } from 'lodash'
import RecipeList from '../components/RecipeList'

class RecipeFavorites extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="card">
        <div className="card-block recipe-card">
          <ul className="nav nav-tabs" id="fridge-shop" role="tablist">
            <li
              className="nav-item"
              onMouseDown={e => e.preventDefault()}
            >
              <a
                className="nav-link active"
                data-toggle="tab"
                href="#recipe-results"
                role="tab"
              >
                <h5>Recipe Results</h5>
              </a>
            </li>
            <li
              className="nav-item"
              onMouseDown={e => e.preventDefault()}
            >
              <a
                onClick={this.handleToggleTab}
                className="nav-link"
                data-toggle="tab"
                href="#favorites"
                role="tab"
              >
                <h5>Favorites</h5>
              </a>
            </li>
          </ul>
        </div>
        <div className="tab-content">
          <div className="tab-pane fade in active" id="recipe-results" role="tabpanel">
            <RecipeList
              isLoading={this.props.recipes.isLoading}
              addCookToday={this.props.addToCookingToday}
              moreRecipes={this.props.fetchMoreRecipes}
              retryRecipes={this.props.refreshRecipes}
              errorType={this.props.errorType.recipes}
              recipes={this.props.recipes}
              parent="result"
            />
          </div>
          <div className="tab-pane fade" id="favorites" role="tabpanel">
            <RecipeList
              isLoading={this.props.recipes.isLoading}
              addCookToday={this.props.addToCookingToday}
              moreRecipes={this.props.fetchMoreRecipes}
              retryRecipes={this.props.refreshRecipes}
              errorType={this.props.errorType.recipes}
              recipes={this.props.recipes}
              parent="favorite"
            />
          </div>
        </div>
      </div>
    )
  }
}

RecipeFavorites.propTypes = {
  isLoading: React.PropTypes.bool.isRequired,
  addCookToday: React.PropTypes.func.isRequired,
  moreRecipes: React.PropTypes.func.isRequired,
  retryRecipes: React.PropTypes.func.isRequired,
  errorType: React.PropTypes.string,
  recipes: React.PropTypes.object.isRequired
}

export default RecipeFavorites