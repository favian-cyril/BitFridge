import React from 'react'
import SearchContainer from './SearchContainer'
import FridgeContainer from './FridgeCardContainer'

export default class IndexContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showDash: false
    }
  }
  render() {
    if (!this.state.showDash) {
      return (
        <div className="index-container">
          <div className="container">
            <img className="img-responsive index-logo col-lg-offset-3 col-md-offset-3 col-lg-6 col-md-6"
                 src="/images/logo-8x.png"/>
          </div>
          <SearchContainer context="index"/>
        </div>
      )
    } else {
      return (
        <div className="index-container">
          <div className="container">
            <img className="img-responsive index-logo col-lg-offset-3 col-md-offset-3 col-lg-6 col-md-6"
                 src="/images/logo-8x.png"/>
          </div>
          <SearchContainer context="dashboard"/>
        </div>
      )
    }
  }
}