import React from 'react'
import { addIngredient } from '../clientapi'

export default class IngredientSuggestion extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      success: false,
      errtype: null
    }
    this.addToFridge = this.addToFridge.bind(this)
  }
  addToFridge(e) {
    e.preventDefault()
    var ingredient = this.props.item
    addIngredient(ingredient, function (err, res, body) {
      if (!err && res.statusCode == 200) {
        console.log(`Added ${ingredient.name} to fridge!`)  // Placeholder for success modal/tooltip
      } else {
        console.error(new Error('Failed to save to fridge.'))
      }
    })
  }
  render() {
    var imgBaseURL = 'https://spoonacular.com/cdn/ingredients_100x100/'
    var imageURL = imgBaseURL + this.props.item.image
    var name = this.props.item.name
    return (
      <li className='media ingredient'>
        <div className='media-left media-middle'>
          <img className='img-rounded' src={ imageURL } alt='50x48' width='50' height='50'/>
        </div>
        <div className='media-body'>
          <lead className='media-heading'>{ name }</lead>
        </div>
        <div className='media-right media-middle'>
          <button className='btn btn-default btn-add' onMouseDown={this.addToFridge}>
            <i className="fa fa-2x fa-plus"> </i>
          </button>
        </div>
      </li>
    )
  }
}