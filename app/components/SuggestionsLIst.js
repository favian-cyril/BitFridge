import React from 'react'
import searchIngredients from '../models/apicalls'
import classnames from 'classnames'
import IngredientSuggestion from './IngredientSuggestion'


export default class SuggestionsList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      results: '',
      loading: false
    }
    this.processResults = this.processResults.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ results: '', loading: true })
    searchIngredients(nextProps.searchText, true, (err, res, body) => {
      if (err) throw err
      else if (!err && res.statusCode === 200) {
        this.setState({ results: body })
      }
    })
    this.setState({ loading: false })
  }
  
  processResults() {
    var imgBaseURL = 'https://spoonacular.com/cdn/ingredients_100x100/'
    return (
      <ul className='media-list dropdown-menu'>
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
    )
  }

  render() {
    var results = (this.state.results.length && this.props.isFocused && this.props.searchText.length)
      ? this.processResults() 
      : null
    var status = this.state.hidden ? '' : 'open'
    return (
      <div className={ classnames('col-lg-8 col-lg-offset-2 dropdown clearfix', status) }>
        {results}
      </div>
    )
  }
}