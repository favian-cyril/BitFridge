import React from 'react'
import SearchBar from '../components/SearchBar'
import SuggestionsList from '../components/SuggestionsList'
import { Debounce } from 'react-throttle'

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
  }

  render() {
    return (
      <div className='container'>
        <div className='centered col-lg-8 col-md-8 col-lg-offset-2 col-md-offset-2'>
          <Debounce time='400' handler='onInput'>
            <SearchBar
              onInput={this.handleInput}
              setFocus={this.handleFocus}
              context={this.props.context}
            />
          </Debounce>
          <SuggestionsList
            searchText={this.state.text}
            isFocused={this.state.isFocused}
            fridge={this.props.fridge}
            handleUpdate={this.props.handleUpdate}
          />
        </div>
      </div>
    )
  }
}
