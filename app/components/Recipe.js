import React from 'react'

export default class Recipe extends React.Component {
  constructor(props) {
    super(props)
    this.findMissing = this.findMissing.bind(this)
  }

  findMissing() {
    var fridge = this.context.fridge
    var ingredients = this.props.recipe.ingredients
    var missing = []
    for (i=0; i<ingredients.length; i++) {
      for (j=0; j<fridge.length; j++) {
        var found = false
        if (ingredients[i].name == fridge[j].name) {
          found = true
          break
        }
      }
      if (!found) {
        missing.push(ingredients[i])
      }
    }
    this.context({ missing: missing })
  }

  render() {
    var missingStr = ''
    this.findMissing.forEach((item) => {
      missingStr = missingStr + item + ', '
    })
    return (
      <li className='media ingredient'>
        <div className='media-left media-middle'>
          <img className='img-rounded' src="http://placehold.it/90x60" alt='90x60' width='90' height='60'/>
        </div>
        <div className="media-body">
          <h5 className="media-heading">{this.props.recipe.title}</h5>
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