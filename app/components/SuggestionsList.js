import React from 'react'
import { searchIngredients } from '../clientapi'
import IngredientSuggestion from './IngredientSuggestion'
import ErrorMsg from './ErrorMsg'
import Preloader from './Preloader'


export default class SuggestionsList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      results: [],
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
    if (this.props.searchText !== nextProps.searchText) {
      var searchText = nextProps.searchText.trim()
      this.handleSearch(searchText)
    }
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
          this.setState({ errtype: 'offline' })
        // ServerError: Nasty stuff happening in the server
        else if (err.name == 'ServerError')
          this.setState({ errtype: 'servererr' })
        // Other unhandled error
        else
          throw err
      } else {
        // Check timestamp, accept result if request is not stale
        if (lastTimestamp === this.state.timestamp)
          // Check if request returned any results
          if (body.length != 0) {
            var results = []
            var resId = []
            body.forEach((item, i) => {
              if (resId.indexOf(item.id) === -1) {
                results.push(item)
                resId.push(item.id)
              }
            })
            this.setState({ results: results })
          }
          else
            this.setState({ errtype: 'notfound'})
      }
      // Clear loading anims
      this.setState({ loading: false })
    })
  }

  loadResultsList() {
    return (
      <ul className='media-list dropdown-menu'>
        {
          this.state.results.map((item, i) => {
            return <IngredientSuggestion 
              item={item} 
              key={i} 
              listkey={i}
              fridge={this.props.fridge}
              handleUpdate={this.props.handleUpdate}
            />
          })
        }
      </ul>
    )
  }

  processResults() {
    if (this.state.loading)
      return <Preloader/>
    else {
      switch (this.state.errtype) {
        case 'notfound':
          return <ErrorMsg msg='No results' desc='Your search did not return any results.'/>
        case 'offline':
          return <ErrorMsg msg='No connection' desc='Check your internet connection.'/>
        default:
          if (this.state.errtype === null && this.state.results.length)
            return this.loadResultsList()
      }
    }
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