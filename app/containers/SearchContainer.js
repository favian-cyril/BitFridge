import React from 'react'
import SearchBar from '../components/SearchBar'
import SuggestionsList from '../components/SuggestionsList'

export default class SearchContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: ''
    }
    this.handleInput = this.handleInput.bind(this)
  }

  handleInput(input) {
    this.setState({ text: input })
  }

  render() {
    return (
      <div>
        <SearchBar
          text={this.state.text}
          onInput={this.handleInput}
        />
        <SuggestionsList
          searchText={this.state.text}
        />
      </div>
    )
  }
}