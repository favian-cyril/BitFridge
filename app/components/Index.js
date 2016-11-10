import React from 'react'
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
      <div className="container-fluid">
        <div className="row">
          {logoImage}
        </div>
        <div className="row">
          <div className="offset-xs-3 col-xs-6">
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
