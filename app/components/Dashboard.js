import React from 'react'
import Fridge from './Fridge'
import RecipeResults from './RecipeResults'
import SearchContainer from '../containers/SearchContainer'

const Dashboard = (props, context) => (
  <div className="dash-container">
    <nav className="navbar navbar-fixed-top navbar-light clearfix">
      <div className="row">
        <div className="col-xs-3 offset-xs-1">
          <div className="navbar-brand" href="#">
            <img className="img-responsive" src="../images/logo-1x.png" alt="logo-nav"/>
          </div>
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
        <div className="col-xs-5 col-lg-3 offset-lg-1">
          <div className="row">
            <Fridge
              title="My Fridge"
              contents={context.fridge}
              updateFridge={props.updateFridge}
              isInFridge={props.isInFridge}
              errorType={props.errorType.fridge}
            />
          </div>
        </div>
        <div className="col-xs-7">
          <div className="row">
            <RecipeResults
              isLoading={props.isLoading}
              moreRecipes={props.moreRecipes}
              retryRecipes={props.retryRecipes}
              errorType={props.errorType.recipes}
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
  moreRecipes: React.PropTypes.func.isRequired,
  retryRecipes: React.PropTypes.func.isRequired,
  isLoading: React.PropTypes.bool.isRequired,
  errorType: React.PropTypes.shape({
    fridge: React.PropTypes.string.isRequired,
    recipes: React.PropTypes.string.isRequired
  })
}

// Default props for cloned children
Dashboard.defaultProps = {
  updateFridge: () => {},
  isInFridge: () => {},
  moreRecipes: () => {},
  retryRecipes: () => {},
  isLoading: false
}

Dashboard.contextTypes = {
  fridge: React.PropTypes.arrayOf(React.PropTypes.object)
}

export default Dashboard
