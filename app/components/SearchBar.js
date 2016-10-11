import React from 'react'


export default class SearchBar extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
  }

  handleChange() {
    var searchQuery = this.refs.searchInput.value
    this.props.onInput(searchQuery)
  }

  handleFocus() {
    this.props.setFocus(true)
  }

  handleBlur() {
    this.props.setFocus(false)
  }

  render() {
    return (
      <div className="form-group form-group-lg right-inner-addon">
        <i className="fa fa-search"></i>
        <input
          className="form-control"
          type="text"
          ref="searchInput"
          placeholder="Search for ingredients..."
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
      </div>
    )
  }
}
