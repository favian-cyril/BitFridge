import React from 'react'

const Error = props =>
  <div className="search-error dropdown-menu">
    <h4 className="text-xs-center">{props.msg}</h4>
    <p className="text-xs-center text-muted">{props.desc}</p>
  </div>

Error.propTypes = {
  msg: React.PropTypes.string.isRequired,
  desc: React.PropTypes.string
}

export default Error
