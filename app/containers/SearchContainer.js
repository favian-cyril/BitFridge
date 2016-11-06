import React from 'react'
import _ from 'lodash'
import SearchBar from '../components/SearchBar'
import SuggestionList from '../components/SuggestionList'
import { searchIngredients } from '../clientapi'

class SearchContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchText: '',
      isFocused: false,
      isLoading: false,
      errorType: '',
      timestamp: null,
      suggestionResults: []
    }
    this.handleInput = this.handleInput.bind(this)
    this.handleToggleFocus = this.handleToggleFocus.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.fetchResults = this.fetchResults.bind(this)
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.state.searchText !== nextState.searchText) {
      const searchText = nextState.searchText.trim()
      this.handleSearch(searchText)
    }
  }

  handleInput() {
    const inputText = document.getElementById('search-input').value
    this.setState({ searchText: inputText })
  }

  handleToggleFocus() {
    this.setState({
      isFocused: !this.state.isFocused
    })
  }

  handleSearch(searchText) {
    if (searchText.length > 1) {
      const lastTimestamp = (new Date()).getTime()
      this.setState({
        isLoading: true,
        errorType: '',
        timestamp: lastTimestamp,
        suggestionResults: []
      })
      this.fetchResults(searchText, lastTimestamp)
    }
  }

  fetchResults(searchText, lastTimestamp) {
    searchIngredients(searchText)
      .then((results) => {
        if (results.length !== 0 && lastTimestamp === this.state.timestamp) {
          results = _.uniqBy(results, 'id')
          results = results.map((ingredient) => {
            ingredient.isAdded = this.props.isInFridge(ingredient)
            return ingredient
          })
          this.setState({ suggestionResults: results })
        } else if (results.length === 0) {
          this.setState({ errorType: 'NOTFOUND' })
        }
        this.setState({ isLoading: false })
      })
      .catch((error) => {
        if (error.message && error.message === 'Network Error') {
          this.setState({ errorType: 'OFFLINE' })
        } else if (error.response && error.response.data.code === 'ENOTFOUND') {
          this.setState({ errorType: 'SERVERERR' })
        } else if (error) {
          throw error
        }
        this.setState({ isLoading: false })
      })
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <SearchBar
            handleInput={_.debounce(this.handleInput, 400)}
            handleToggleFocus={this.handleToggleFocus}
          />
        </div>
        <div className="row">
          <SuggestionList
            searchText={this.state.searchText}
            isFocused={this.state.isFocused}
            isLoading={this.state.isLoading}
            errorType={this.state.errorType}
            suggestionResults={this.state.suggestionResults}
            updateFridge={this.props.updateFridge}
            isInFridge={this.props.isInFridge}
          />
        </div>
      </div>
    )
  }
}

SearchContainer.propTypes = {
  updateFridge: React.PropTypes.func.isRequired,
  isInFridge: React.PropTypes.func.isRequired
}

export default SearchContainer
