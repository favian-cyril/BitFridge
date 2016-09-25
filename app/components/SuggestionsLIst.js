import React from 'react'
import searchIngredients from '../models/apicalls'
import classnames from 'classnames'
import IngredientSuggestion from './IngredientSuggestion'


export default class SuggestionsList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      results: '',
      loading: false,
      timestamp: null
    }
    this.processResults = this.processResults.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    var searchText = nextProps.searchText.trim()

    if (searchText.length > 1) {
      // Clear results, set loading to true for anims
      this.setState({ results: '', loading: true })

      // Create timestamp
      const lastTimestamp = (new Date).getTime()
      this.setState({ timestamp: lastTimestamp })

      // Fetch results
      searchIngredients(searchText, (err, res, body) => {
        if (err) throw err
        else if (!err && res.statusCode === 200) {
          if (lastTimestamp === this.state.timestamp) {
            this.setState({ results: body })
          } else {
          }
        }
        // Clear loading anims
        this.setState({ loading: false })
      })
    }
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