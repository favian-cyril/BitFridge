import React from 'react'

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange() {
    this.props.onInput(
      this.refs.searchInput.value
    )
  }

  render() {
    return (
      <div className="input-group input-group-lg col-lg-8 col-lg-offset-2">
        <input
          className="form-control"
          type="text"
          ref="searchInput"
          placeholder="Search for ingredients..."
          value={this.props.text}
          onChange={this.handleChange}
        />
        <span className="input-group-btn">
          <button className="btn btn-default" type="button">
            <span className="glyphicon glyphicon-search"> </span>
          </button>
        </span>
      </div>
    )
  }
}
