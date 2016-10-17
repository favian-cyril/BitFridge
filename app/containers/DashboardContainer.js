import React from 'react'
import SearchContainer from './SearchContainer'
import FridgeCardContainer from './FridgeCardContainer'

export default class DashboardContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showDash: true
    }
  }
  render() {
    if (this.state.showDash) {
      return (
      	<nav class="navbar navbar-fixed-top navbar-light bg-faded">
      		<div class="row">
      			<div class="col-xs-6 col-md-4">
      				<img className="img-responsive index-logo col-lg-offset-3 col-md-offset-3 col-lg-6 col-md-6" src="/images/logo-1x.png"/>
                 </div>
      			<div class="col-xs-12 col-md-8">
      				<SearchContainer context="dashboard"/>
      			</div>
      		</div>
      	</nav>
        <div class="container">
            <div class="row">
                <div class="col-lg-4 col-md-4">
                    <div class="row">
                        <FridgeCardContainer />
                        <!--Cooking today container-->
                    </div>
                </div>
                <div class="col-lg-8 col-md-8">
                    <!--Recipe result container-->
                </div>
            </div>
        </div>
      )
    }
  }
}