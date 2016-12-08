import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import _ from 'lodash'
import SearchBar from './SearchBar'
import SearchResults from './SearchResults'
import * as actionCreators from '../redux/actions'

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.isInFridge = this.isInFridge.bind(this)
    this.handleInput = this.handleInput.bind(this)
    this.handleInput = _.debounce(this.handleInput, 300) 
  }

  handleInput() {
    const inputText = document.getElementById('search-input').value
    this.props.updateSearchText(inputText)
    this.props.fetchSuggestions()
  }
  
  isInFridge(ingredient) {
    return this.props.fridge.contents.map(i => i.name).includes(ingredient.name)
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
          <SearchResults
            searchText={this.props.searchText}
            isFocused={this.props.isFocused}
            isLoading={this.props.isLoading}
            isInFridge={this.isInFridge}
            errorType={this.props.errorType}
            suggestionResults={this.props.contents}
          />
        </div>
      </div>
    )
  }
}

Search.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Search)
