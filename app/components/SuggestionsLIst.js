import React from 'react'
import searchIngredients from '../models/apicalls'
import classnames from 'classnames'
import IngredientSuggestion from './IngredientSuggestion'

var onClickOutside = require('react-onclickoutside')

class SuggestionsList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      results: '',
      hidden: false
    }
    this.handleClickOutside = this.handleClickOutside.bind(this)
  }

  handleClickOutside(e) {
    this.setState({ hidden: true })
  }

  componentWillReceiveProps(nextProps) {
    var searchText = nextProps.searchText
    searchIngredients(searchText, true, (err, res, body) => {
      if (err)
        throw err
      else if (!err && res.statusCode === 200) {
        this.setState({ results: body, hidden: false })
      }
    })
  }

  render() {
    var imgBaseURL = 'https://spoonacular.com/cdn/ingredients_100x100/'
    var status = this.state.hidden ? '' : 'open'
    var resultsList = this.state.results
      ? <ul className='media-list dropdown-menu'>
        {
          this.state.results.map((item, i) => {
            return (
              <IngredientSuggestion
                src={ imgBaseURL + item.image }
                title={ item.name }
                key={ i }/>
            )
          })
        }
      </ul>
      : <span> </span>
    return (
      <div className={ classnames('col-lg-8 col-lg-offset-2 dropdown clearfix', status) }>
        {resultsList}
      </div>
    )
  }
}

export default onClickOutside(SuggestionsList)