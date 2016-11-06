import React from 'react'
import SearchContainer from '../containers/SearchContainer'

const Index = (props) => {
  const logoUrl = '/images/logo-4x.png'
  const logoImage = (
    <img
      className="img-responsive index-logo
      offset-md-3 col-md-6
      offset-xs-2 col-xs-8"
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
      <div className="container-fluid">
        <div className="row">
          {logoImage}
        </div>
        <div className="row">
          <div className="offset-xs-1 col-xs-10 offset-md-2 col-md-8">
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
  isInFridge: React.PropTypes.func.isRequired
}

Index.defaultProps = {
  updateFridge: () => {},
  isInFridge: () => {}
}

export default Index
