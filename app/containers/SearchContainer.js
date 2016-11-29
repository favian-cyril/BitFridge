import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import _ from 'lodash'
import SearchBar from '../components/SearchBar'
import SuggestionList from '../components/SearchResults'
import * as actionCreators from '../actions'

class SearchContainer extends React.Component {
  constructor(props) {
    super(props)
    this.handleInput = this.handleInput.bind(this)
    this.handleInput = _.debounce(this.handleInput, 300)
  }

  handleInput() {
    const inputText = document.getElementById('search-input').value
    console.log(inputText)
    this.props.updateSearchText(inputText)
    this.props.fetchSuggestions()
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <SearchBar
            handleInput={this.handleInput}
            handleToggleFocus={this.props.toggleFocus}
          />
        </div>
        <div className="row">
          <SuggestionList
            searchText={this.props.searchText}
            isFocused={this.props.isFocused}
            isLoading={this.props.isLoading}
            errorType={this.props.errorType}
            suggestionResults={this.props.contents}
          />
        </div>
      </div>
    )
  }
}

SearchContainer.propTypes = {
  // TODO: Fill in propTypes
}

const mapStateToProps = state => ({
  errorType: state.errorType.search,
  ...state.search
})

const mapDispatchToProps = dispatch => ({
  updateSearchText: bindActionCreators(actionCreators.updateSearchText, dispatch),
  fetchSuggestions: bindActionCreators(actionCreators.fetchSuggestions, dispatch),
  toggleFocus: bindActionCreators(actionCreators.toggleFocus, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer)
