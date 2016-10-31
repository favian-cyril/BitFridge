import React from 'react'
import SearchContainer from '../containers/SearchContainer'

const Index = (props) => {
  const logoUrl = '/images/logo-4x.png'
  const logoImage = (
    <img
      className="img-responsive index-logo offset-md-4 col-md-4"
      src={logoUrl}
      alt="bitfridge-logo"
    />
  )
  return (
    <div className="index-container">
      <div className="container-fluid">
        <div className="row">
          {logoImage}
        </div>
        <div className="row">
          <div className="centered col-md-6">
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
