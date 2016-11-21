import React from 'react'
import NavUser from './NavUser'
import SearchContainer from '../containers/SearchContainer'

const Index = (props) => {
  const logoUrl = '/images/logo-4x.png'
  const logoImage = (
    <img
      className="img-responsive index-logo
      offset-xs-4 col-xs-4"
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
          <NavUser
            user={props.user}
            display="index"
          />
        </div>
      </nav>
      <div className="container-fluid">
        <div className="row">
          {logoImage}
        </div>
        <div className="row">
          <div className="col-xs-6 offset-xs-3">
            <SearchContainer
              updateFridge={props.updateFridge}
              isInFridge={props.isInFridge}
            />
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
