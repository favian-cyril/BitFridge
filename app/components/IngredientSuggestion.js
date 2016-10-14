import React from 'react'
import { addIngredient } from '../clientapi'
import $ from 'jquery'

export default class IngredientSuggestion extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      status: null,
      errtype: null,
      message: null,
      added: this.props.fridge
    }
    this.addToFridge = this.addToFridge.bind(this)
  }
  addToFridge(e) {
    var ingredient = this.props.item
    var that = this
    addIngredient(ingredient, function (err, res, body) {
      if (!err && res.statusCode == 200) {
        that.setState({ status: 'success', message: `Added ${ingredient.name} to fridge!` })
      } else {
        that.setState({ status: 'failure', message: 'Failed to save to fridge.' })
      }
      console.log(that.state.message)
      window.showTooltip($('#' + that.props.listkey))
    })
  }
  render() {
    var imgBaseURL = 'https://spoonacular.com/cdn/ingredients_100x100/'
    var imageURL = imgBaseURL + this.props.item.image
    var name = this.props.item.name
    return (
      <li className='media ingredient' onMouseDown={(e) => { e.preventDefault() }}>
        <div className='media-left media-middle'>
          <img className='img-rounded' src={ imageURL } alt='50x48' width='50' height='50'/>
        </div>
        <div className='media-body'>
          <p className='media-heading'>{ name }</p>
        </div>
        <div className='media-right media-middle'>
          <button id={this.props.listkey} onMouseDown={this.addToFridge}
                  className={'btn btn-default btn-add ' + this.state.status}
                  title={this.state.message} data-toggle='tooltip'
                  data-container='body' data-placement='right'
                  data-trigger='manual'>
            <i className="fa fa-2x fa-plus btn-add-icon"></i>
          </button>
        </div>
      </li>
    )
  }
}