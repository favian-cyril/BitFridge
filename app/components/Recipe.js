import React from 'react'

export default class Recipe extends React.Component {
  constructor(props) {
    super(props)
    this.findMissing = this.findMissing.bind(this)
  }

  componentDidUpdate() {
    this.findMissing()
  }

  findMissing() {
    var fridge = this.context.fridge.map((item) => { return item.name })
    var ingredients = this.props.recipe.ingredients
    var missing = []
    ingredients.forEach((ingrItem) => {
      var found = fridge.some((fridgeItem) => {
        return fridgeItem == ingrItem
      })
      if (!found) missing.push(ingrItem)
    })
    var recipes = this.context.recipes
    var idx = recipes.indexOf(recipes.find((r) => { return r.id == this.props.recipe.id } ))
    recipes[idx].missing = missing
    console.log(recipes)
    this.props.handleUpdateRecipes(recipes)
  }

  render() {
    var missingStr = ''
    if (this.props.recipe.missing) {
      this.props.recipe.missing.forEach((item) => {
        missingStr = missingStr + item + ', '
      })
    }
    return (
      <li className='media ingredient'>
        <div className='media-left media-middle'>
          <img className='img-rounded' src={this.props.recipe.imageUrlsBySize['90']} alt='90x90' width='90' height='90'/>
        </div>
        <div className="media-body">
          <h5 className="media-heading">{this.props.recipe.recipeName}</h5>
          <p><small className="text-muted">Missing: { missingStr }</small></p>
        </div>
        <div className='media-right media-middle'>
          <button className='btn btn-default btn-add'>
            <i className="fa fa-2x fa-external-link btn-add-icon"></i>
          </button>
        </div>
      </li>
    )
  }
}

Recipe.contextTypes = {
    fridge: React.PropTypes.array
}