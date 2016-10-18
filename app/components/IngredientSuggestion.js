import React from 'react'
import { addIngredient, delIngredient } from '../clientapi'
import _ from 'lodash'
import $ from 'jquery'

export default class IngredientSuggestion extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      status: null,
      errtype: null,
      message: null,
      added: null
    }
    this.handleClick = this.handleClick.bind(this)
    this.addToFridge = this.addToFridge.bind(this)
    this.delFromFridge = this.delFromFridge.bind(this)
    this.isInFridge = this.isInFridge.bind(this)
  }

  componentDidMount() {
    this.setState({ added: this.isInFridge() })
  }

  handleClick(e) {
    if (this.state.added) {
      this.delFromFridge()
    } else {
      this.addToFridge()
    }
  }

  addToFridge() {
    var ingredient = this.props.item
    var that = this
    var elemId = '#' + that.props.listkey
    addIngredient(ingredient, function (err, res, body) {
      if (!err && res.statusCode == 200) {
        that.props.handleUpdate('add', ingredient.id.toString())
        that.setState({
          status: 'success',
          message: `Added ${ingredient.name} to fridge!`,
          added: true
        })
      } else {
        that.setState({
          status: 'failure',
          message: 'Failed to save to fridge.'
        })
      }
      console.log(that.state.message)
      window.showTooltip($(elemId))
      $('.tooltip-inner').html(that.state.message)
    })
    return true
  }

  delFromFridge() {
    var ingredient = this.props.item
    var that = this
    var elemId = '#' + that.props.listkey
    delIngredient(ingredient, function (err, res, body) {
      if (!err && res.statusCode == 200) {
        that.props.handleUpdate('del', ingredient.id.toString())
        that.setState({
          status: 'success',
          message: `Deleted ${ingredient.name} from fridge!`,
          added: false
        })
      } else {
        that.setState({
          status: 'failure',
          message: 'Failed to delete from fridge.'
        })
      }
      console.log(that.state.message)
      window.showTooltip($(elemId))
      $('.tooltip-inner').html(that.state.message)
    })
    return true
  }

  isInFridge() {
    var itemIdStr = this.props.item.id.toString()
    return this.props.fridge.includes(itemIdStr)
  }

  render() {
    var imgBaseURL = 'https://spoonacular.com/cdn/ingredients_100x100/'
    var imageURL = imgBaseURL + this.props.item.image
    var name = this.props.item.name
    var buttonClass = ''
    if (this.state.added)
      buttonClass += ' success'
    return (
      <li className='media ingredient' onMouseDown={(e) => { e.preventDefault() }}>
        <div className='media-left media-middle'>
          <img className='img-rounded' src={ imageURL } alt='50x48' width='40' height='40'/>
        </div>
        <div className='media-body'>
          <p className='media-heading'>{ name }</p>
        </div>
        <div className='media-right media-bottom'>
          <button id={this.props.listkey} onMouseUp={_.debounce(this.handleClick, 1000, { leading: true })}
                  className={'btn btn-default btn-add ' + buttonClass}
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