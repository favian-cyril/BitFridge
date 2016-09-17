import React from 'react'

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.props.onInput(event.target.value)
  }

  render() {
    return (
      <form>
        <input
          type="text"
          placeholder="Search for ingredients..."
          value={this.props.text}
          onChange={this.handleChange}
        />
      </form>
    )
  }
}
