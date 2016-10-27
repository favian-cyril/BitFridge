import React from 'react'
import Recipe from '../components/Recipe'
import {searchResults} from '../clientapi'


export default class RecipesContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      page: 1,
      recipes: []
    }
    this.getResults = this.getResults.bind(this)
  }
  getResults () {
    var that = this
    searchResults(this.context.fridge, this.state.page, function (err, res, body) {
      if (!err & res.statusCode == 200) {
        body['matches'].forEach( function (i) {
          that.state.recipes.push(i)
        })
      }
    })
  }
  componentWillUpdate (nextContext) {
    if (nextContext.fridge) {
      this.setState({page: 1, recipes: []})
      this.getResults()
    }
  }
  nextPage () {
    this.setState({ page: this.state.page + 1})
    this.getResults()
  }
  render() {
    return (
      <div className="card">
        <div className="card-block recipe-card">
          <h4 className="card-title">Recipe Results</h4>
        </div>
        <div className="recipe-list-wrapper">
          <ul className="media-list">
            {
              this.recipes.map((item) => {
                return <Recipe item={ item }
                               parent='recipe'
                               recipe={ this.props.recipe }/>
                
              })
            }
          </ul>
        </div>
      </div>
    )
  }
}
RecipesContainer.contextTypes = {
  fridge: React.PropTypes.array
}