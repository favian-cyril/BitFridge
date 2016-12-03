import React from 'react'
import CookingTodayList from './CookingTodayList'
import Fridge from './Fridge'
import NavUser from './NavUser'
import RecipeResults from './RecipeResults'
import SearchContainer from './Search'

const Dashboard = (props, context) => (
  <div className="dash-container">
    <nav className="navbar navbar-fixed-top navbar-light clearfix">
      <div className="row">
        <div className="col-xs-6 col-lg-2 offset-lg-1">
          <div className="navbar-brand" href="#">
            <img className="img-responsive" src="../images/logo-1x.png" alt="logo-nav"/>
          </div>
        </div>
        <div className="col-xs-3 col-sm-2 pull-right">
          <NavUser user={props.user}/>
        </div>
        <div className="col-xs-12 col-lg-4 offset-lg-2 search-bar-fix">
          <SearchContainer fridge={props.fridge}/>
        </div>
      </div>
    </nav>
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-4 offset-lg-1">
          <div className="row">
            <Fridge
              title="My Fridge"
              contents={props.fridge.contents}
              updateFridge={props.updateFridge}
              errorType={props.errorType.fridge}
            />
          </div>
          <div className="row">
            <CookingTodayList
              title="Cooking Today"
              cookingToday={props.cookingToday}
              toggleCookingToday={props.toggleCookingToday}
              clearCookToday={props.clearCookingToday}
            />
          </div>
        </div>
        <div className="col-lg-6">
          <div className="row">
            <RecipeResults
              isLoading={props.recipes.isLoading}
              addCookToday={props.addToCookingToday}
              moreRecipes={props.fetchMoreRecipes}
              retryRecipes={props.refreshRecipes}
              errorType={props.errorType.recipes}
              recipes={props.recipes}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
)

Dashboard.propTypes = {
  updateFridge: React.PropTypes.func.isRequired,
  moreRecipes: React.PropTypes.func.isRequired,
  retryRecipes: React.PropTypes.func.isRequired,
  addCookToday: React.PropTypes.func.isRequired,
  toggleCookingToday: React.PropTypes.func.isRequired,
  isLoading: React.PropTypes.bool.isRequired,
  isExpanded: React.PropTypes.shape({
    expand: React.PropTypes.bool.isRequired,
    index: React.PropTypes.number.isRequired
  }).isRequired,
  errorType: React.PropTypes.shape({
    fridge: React.PropTypes.string.isRequired,
    recipes: React.PropTypes.string.isRequired
  }),
  user: React.PropTypes.shape({
    id: React.PropTypes.string,
    name: React.PropTypes.string
  }).isRequired,
  clearCookToday: React.PropTypes.func.isRequired
}

// Default props for cloned children
Dashboard.defaultProps = {
  updateFridge: () => {},
  moreRecipes: () => {},
  retryRecipes: () => {},
  addCookToday: () => {},
  toggleCookingToday: () => {},
  clearCookToday: () => {},
  isLoading: false,
  isExpanded: { expand: false, index: 0 },
  user: {}
}

export default Dashboard
