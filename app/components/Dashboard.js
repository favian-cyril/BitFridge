import React from 'react'
import Fridge from './Fridge'
import RecipeResults from './RecipeResults'
import SearchContainer from '../containers/SearchContainer'

const Dashboard = (props, context) => (
  <div className="dash-container">
    <nav className="navbar navbar-fixed-top navbar-light clearfix">
      <div className="row">
        <div className="col-xs-3 offset-xs-1">
          <img className="img-responsive" src="../images/logo-1x.png" alt="logo-nav"/>
        </div>
        <div className="col-xs-7 search-bar-fix">
          <div className="container">
            <SearchContainer
              updateFridge={props.updateFridge}
              isInFridge={props.isInFridge}
            />
          </div>
        </div>
      </div>
    </nav>
    <div className="container-fluid">
      <div className="row">
        <div className="col-xs-3 offset-xs-1">
          <div className="row">
            <Fridge
              title="My Fridge"
              contents={context.fridge}
              updateFridge={props.updateFridge}
              isInFridge={props.isInFridge}
            />
          </div>
        </div>
        <div className="col-xs-7">
          <div className="row">
            <RecipeResults
              isLoading={props.isLoading}
              viewMore={props.viewMore}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
)

Dashboard.propTypes = {
  updateFridge: React.PropTypes.func.isRequired,
  isInFridge: React.PropTypes.func.isRequired,
  viewMore: React.PropTypes.func.isRequired,
  isLoading: React.PropTypes.bool.isRequired
}

// Default props for cloned children
Dashboard.defaultProps = {
  updateFridge: () => {},
  isInFridge: () => {},
  viewMore: () => {},
  isLoading: false
}

Dashboard.contextTypes = {
  fridge: React.PropTypes.arrayOf(React.PropTypes.object)
}

export default Dashboard
