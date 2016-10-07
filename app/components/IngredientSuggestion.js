import React from 'react'
import addIngredient from '../clientapi'

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
    addIngredient(this.props.item, function (err, res, body) {
      if (!err && res.statusCode == 200) {
        this.setState({ success: true })
      } else {
        this.setState({ errtype: err.name })
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
          <h4 className='media-heading'>{ name }</h4>
        </div>
        <div className='media-right media-middle'>
          <button className='btn btn-default btn-lg btn-add' onClick={this.addToFridge}>
            <span className="glyphicon glyphicon-plus"> </span>
          </button>
        </div>
      </li>
    )
  }
}