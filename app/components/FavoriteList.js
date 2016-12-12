import React from 'react'
import { throttle } from 'lodash'
import Recipe from './Recipe'
import Preloader from './Preloader'
import Error from './Error'
import uiUtils from '../utils/ui'

class FavoriteList extends React.Component {
  constructor(props) {
    super(props)
    this.handleToggleFavorite = this.handleToggleFavorite.bind(this)
    this.handleAddToCookingToday = this.handleAddToCookingToday.bind(this)
  }

  handleToggleFavorite(recipe) {
    this.props.toggleFavorite(recipe)
  }

  handleAddToCookingToday(recipe) {
    this.props.addCookToday(recipe)
    uiUtils.anims.scrollDown('.cooking-today-content.list-wrapper')
  }

  render() {
    const results = this.props.recipes.contents.map((item, i) => {
      return (
        <Recipe
          key={i}
          recipe={item}
          toggleFavorite={this.handleToggleFavorite}
          addCookToday={this.handleAddToCookingToday}
        />
      )
    })
    return (
      <div>
        <div className="recipe-list-wrapper">
          <ul className="media-list">
            {results}
          </ul>
        </div>
      </div>
    )
  }
}

FavoriteList.propTypes = {
  toggleFavorite: React.PropTypes.func.isRequired,
  addCookToday: React.PropTypes.func.isRequired,
  recipes: React.PropTypes.shape({
    contents: React.PropTypes.array.isRequired
  }).isRequired,
  parent: React.PropTypes.string.isRequired
}

export default FavoriteList