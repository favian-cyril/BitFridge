import React from 'react'

const SearchBar = props => (
  <div className="input-group form-group right-inner-addon">
    <input
      className="form-control"
      type="text"
      id="search-input"
      placeholder="Search for ingredients..."
      onChange={props.handleInput}
      onFocus={props.handleToggleFocus}
      onBlur={props.handleToggleFocus}
    />
    <span className="input-group-addon">
      <i className="fa fa-search"/>
    </span>
  </div>
)


SearchBar.propTypes = {
  handleInput: React.PropTypes.func.isRequired,
  handleToggleFocus: React.PropTypes.func.isRequired
}

export default SearchBar
