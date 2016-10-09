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
            <img className="index-logo col-lg-offset-4 col-md-offset-4 col-lg-4 col-md-4 clearfix"
                 src="/images/logo-3x.png"/>
          </div>
          <SearchContainer/>
        </div>
      )
    }
  }
}