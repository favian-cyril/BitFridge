import React from 'react'
import searchIngredients from '../models/apicalls'
import IngredientSuggestion from './IngredientSuggestion'
import ErrorMsg from './ErrorMsg'
import Preloader from './Preloader'


export default class SuggestionsList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      results: '',
      loading: false,
      timestamp: null,
      errtype: null
    }
    this.processResults = this.processResults.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    var searchText = nextProps.searchText.trim()

    if (searchText.length > 1) {
      // Clear results, set loading to true for anims
      this.setState({ results: '', errtype: null, loading: true })

      // Create timestamp
      const lastTimestamp = (new Date).getTime()
      this.setState({ timestamp: lastTimestamp })

      // Fetch results
      searchIngredients(searchText, (err, res, body) => {
        if (err)
          if (err.name == 'TypeError') {
            this.setState({ errtype: 'offline'})
          } else throw err
        else if (!err && res.statusCode === 200) {
          if (lastTimestamp === this.state.timestamp)
            if (body.length != 0)
              this.setState({ results: body })
            else
              this.setState({ errtype: 'notfound'})
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
    var results, status = null
    if (this.props.isFocused && this.props.searchText.length > 1) {
      status = 'open'
      if (this.state.loading) {
        results = <Preloader/>
      } else if (this.state.errtype == 'offline') {
        results = <ErrorMsg msg='No connection' desc='Check your internet connection.' img='err-noconnection.png'/>
      } else if (this.state.errtype == 'notfound') {
        results = <ErrorMsg msg='No results' desc='Your search did not return any results.' img='err-noresults.png'/>
      } else if (this.state.errtype === null && this.state.results.length) {
        results = this.processResults()
      }
    }
    return (
      <div className={'dropdown clearfix ' + status}>
        {results}
      </div>
    )
  }
}
