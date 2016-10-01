import React from 'react'
import searchIngredients from '../clientAPI'
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
    this.handleSearch = this.handleSearch.bind(this)
    this.createTimestamp = this.createTimestamp.bind(this)
    this.fetchResults = this.fetchResults.bind(this)
    this.loadResultsList = this.loadResultsList.bind(this)
    this.processResults = this.processResults.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    var searchText = nextProps.searchText.trim()
    this.handleSearch(searchText)
  }

  handleSearch(searchText) {
    if (searchText.length > 1) {
      // Clear results and errtype, set loading to true for anims
      this.setState({ results: '', errtype: null, loading: true })

      // Create timestamp
      const lastTimestamp = this.createTimestamp()

      this.fetchResults(searchText, lastTimestamp)
    }
  }

  createTimestamp() {
    let ts = (new Date).getTime()
    this.setState({ timestamp: ts })
    return ts
  }

  fetchResults(searchText, lastTimestamp) {
    // Make API call
    searchIngredients(searchText, (err, res, body) => {
      if (err) {
        // TypeError: Failed to fetch
        if (err.name == 'TypeError')
          this.setState({errtype: 'offline'})
        // Other unhandled error
        else
          throw err
      }
      // No errors, success
      else if (!err && res.statusCode === 200) {
        // Check timestamp, accept result if request is not stale
        if (lastTimestamp === this.state.timestamp)
          // Check if request returned any results
          if (body.length != 0)
            this.setState({ results: body })
          else
            this.setState({ errtype: 'notfound'})
      }
      // Clear loading anims
      this.setState({ loading: false })
    })
  }

  loadResultsList() {
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

  processResults() {
    var results, status = null

    if (this.state.loading)
      results = <Preloader/>
    else if (this.state.errtype == 'offline')
      results = <ErrorMsg msg='No connection' desc='Check your internet connection.' img='err-noconnection.png'/>
    else if (this.state.errtype == 'notfound')
      results = <ErrorMsg msg='No results' desc='Your search did not return any results.' img='err-noresults.png'/>
    else if (this.state.errtype === null && this.state.results.length)
      results = this.loadResultsList()
    return results
  }

  render() {
    var status, results
    if (this.props.isFocused && this.props.searchText.length > 1)
      status = 'open'

    results = this.processResults()

    return (
      <div className={'dropdown clearfix ' + status}>
        {results}
      </div>
    )
  }
}