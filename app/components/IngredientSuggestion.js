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
    this.showTooltip = this.showTooltip.bind(this)
  }

  componentDidMount() {
    this.setState({ added: this.isInFridge() })
  }

  handleClick(e) {
    var ingredient = this.props.item
    var that = this
    var elemId = '#' + that.props.listkey
    if (this.state.added) {
      this.delFromFridge(ingredient, function () {
        if ((that.props.fridge.length > 2 && that.props.context == "dashboard") ||
        that.props.context == "index")
          that.showTooltip(elemId)
      })
    } else {
      this.addToFridge(ingredient, () => {
        if ((that.props.fridge.length < 3 && that.props.context == "index") ||
          that.props.context == "dashboard")
          that.showTooltip(elemId)
      })
    }
  }

  addToFridge(ingredient, cb) {
    var that = this
    addIngredient(ingredient, function (err, res, body) {
      if (!err && res.statusCode == 200) {
        that.props.handleUpdate('add', ingredient.id.toString())
        var unmounting = that.props.fridge.length > 2
        if (!unmounting) that.setState({
          status: 'success',
          message: `Added ${ingredient.name} to fridge!`,
          added: true
        })
      } else {
        if (!unmounting) that.setState({
          status: 'failure',
          message: 'Failed to save to fridge.'
        })
      }
      cb()
    })
  }

  delFromFridge(ingredient, cb) {
    var that = this
    delIngredient(ingredient, function (err, res, body) {
      if (!err && res.statusCode == 200) {
        that.props.handleUpdate('del', ingredient.id.toString())
        var unmounting = that.props.fridge.length < 3
          if (!unmounting) that.setState({
          status: 'success',
          message: `Deleted ${ingredient.name} from fridge!`,
          added: false
        })
      } else {
        if (!unmounting) that.setState({
          status: 'failure',
          message: 'Failed to delete from fridge.'
        })
      }
      cb()
    })
  }

  isInFridge() {
    var itemIdStr = this.props.item.id.toString()
    return this.props.fridge.includes(itemIdStr)
  }

  showTooltip(elemId) {
    window.showTooltip($(elemId))
    $('.tooltip-inner').last().html(this.state.message)
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