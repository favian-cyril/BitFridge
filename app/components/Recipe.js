import React from 'react'

export default class Recipe extends React.Component {
  constructor(props) {
    super(props)
    this.findMissing = this.findMissing.bind(this)
  }

  componentDidMount() {
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
    this.props.handleUpdateRecipes(recipes)
  }

  render() {
    var missingStr = ''
    if (this.props.recipe.missing) {
      this.props.recipe.missing.slice(0, 4).forEach((item) => {
        missingStr = missingStr + item + ', '
      })
      if (this.props.recipe.missing.length > 3) {
        var number = this.props.recipe.missing.slice(4).length.toString()
        missingStr = missingStr + ` +${number} more`
      }
    }
    return (
      <li className='media ingredient'>
        <div className='media-left media-middle'>
          <img className='img-rounded' src={this.props.recipe.imageUrlsBySize['90']} alt='90x90' width='90' height='90'/>
        </div>
        <div className="media-body">
          <h5 className="media-heading">{this.props.recipe.recipeName}</h5>
          <small className="missing-str">Missing: { missingStr }</small>
        </div>
        <div className='media-right media-middle'>
          <a className='btn btn-default btn-add' href={this.props.recipe.sourceUrl} target="_blank">
            <i className="fa fa-2x fa-external-link btn-add-icon"></i>
          </a>
        </div>
      </li>
    )
  }
}

Recipe.contextTypes = {
  fridge: React.PropTypes.array,
  recipes: React.PropTypes.array 
}