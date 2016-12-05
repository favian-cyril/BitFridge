import React from 'react'
import NavUser from './NavUser'
import SearchContainer from './Search'

const Index = (props) => {
  const logoUrl = '/images/logo-4x.png'
  const logoImage = (
    <img
      className="img-responsive index-logo
      col-xs-10 offset-xs-1
      col-sm-8 offset-sm-2
      col-md-6 offset-md-3
      col-lg-4 offset-lg-4"
      src={logoUrl}
      alt="bitfridge-logo"
      title="Hello!"
      data-toggle="tooltip"
      data-container="body"
      data-placement="top"
      data-trigger="click"
    />
  )
  return (
    <div className="index-container">
      <nav className="navbar navbar-fixed-top navbar-index clearfix">
        <div className="row">
          <NavUser user={props.user} display={props.display}/>
        </div>
      </nav>
      <div className="container-fluid">
        <div className="row">
          {logoImage}
        </div>
        <div className="row">
          <div
            className="col-lg-6 offset-lg-3">
            <SearchContainer fridge={props.fridge}/>
          </div>
        </div>
      </div>
    </div>
  )
}

Index.propTypes = {
  updateFridge: React.PropTypes.func.isRequired,
  isInFridge: React.PropTypes.func.isRequired,
  user: React.PropTypes.shape({
    id: React.PropTypes.string,
    name: React.PropTypes.string
  }).isRequired
}

Index.defaultProps = {
  updateFridge: () => {},
  isInFridge: () => {},
  user: {}
}

export default Index
