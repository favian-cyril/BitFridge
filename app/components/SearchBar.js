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
    var divClass, iClass, inputClass
    if (this.props.context == 'index') {
      divClass = " form-group-lg"
      iClass = " fa-lg"
      inputClass = " form-control-lg"
    }
    return (
      <div className={"form-group right-inner-addon" + divClass}>
        <i className={"fa fa-search" + iClass}></i>
        <input
          className={"form-control " + inputClass}
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
