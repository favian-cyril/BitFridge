import React from 'react'
import SearchBar from '../components/SearchBar'
import SuggestionsList from '../components/SuggestionsList'

export default class SearchContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      isFocused: false
    }
    this.handleInput = this.handleInput.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
  }

  handleInput(input) {
    this.setState({ text: input })
  }
  
  handleFocus(focus) {
    this.setState({ isFocused: focus })
    console.log('this.state.isFocused: ' + focus)
  }

  render() {
    return (
      <div>
        <SearchBar
          text={this.state.text}
          onInput={this.handleInput}
          setFocus={this.handleFocus}
        />
        <SuggestionsList
          searchText={this.state.text}
          isFocused={this.state.isFocused}
        />
      </div>
    )
  }
}