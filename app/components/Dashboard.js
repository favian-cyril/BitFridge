import React from 'react'
import CookingTodayList from './CookingTodayList'
import Fridge from './Fridge'
import NavUser from './NavUser'
import RecipeResults from './RecipeResults'
import SearchContainer from '../containers/SearchContainer'

const Dashboard = (props, context) => (
  <div className="dash-container">
    <nav className="navbar navbar-fixed-top navbar-light clearfix">
      <div className="row">
        <div className="col-xs-2 offset-xs-1">
          <div className="navbar-brand" href="#">
            <img className="img-responsive" src="../images/logo-1x.png" alt="logo-nav"/>
          </div>
        </div>
        <div className="col-xs-4 offset-xs-2 search-bar-fix">
          <div className="container">
            <SearchContainer
              updateFridge={props.updateFridge}
              isInFridge={props.isInFridge}
            />
          </div>
        </div>
        <NavUser user={props.user}/>
      </div>
    </nav>
    <div className="container-fluid">
      <div className="row">
        <div className="col-xs-4 offset-xs-1">
          <div className="row">
            <Fridge
              title="My Fridge"
              contents={context.fridge}
              updateFridge={props.updateFridge}
              isInFridge={props.isInFridge}
              errorType={props.errorType.fridge}
            />
          </div>
          <div className="row">
            <CookingTodayList
              title="Cooking Today"
              cookingToday={context.cookingToday}
              toggleAccordion={props.toggleAccordion}
              isExpanded={props.isExpanded}
              clearCookToday={props.clearCookToday}
            />
          </div>
        </div>
        <div className="col-xs-6">
          <div className="row">
            <RecipeResults
              isLoading={props.isLoading}
              addCookToday={props.addCookToday}
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
  addCookToday: React.PropTypes.func.isRequired,
  toggleAccordion: React.PropTypes.func.isRequired,
  isLoading: React.PropTypes.bool.isRequired,
  isExpanded: React.PropTypes.shape({
    expand: React.PropTypes.bool.isRequired,
    id: React.PropTypes.number.isRequired
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
  isInFridge: () => {},
  moreRecipes: () => {},
  retryRecipes: () => {},
  addCookToday: () => {},
  toggleAccordion: () => {},
  clearCookToday: () => {},
  isLoading: false,
  isExpanded: {expand:false, id:0},
  user: {}
}

Dashboard.contextTypes = {
  fridge: React.PropTypes.arrayOf(React.PropTypes.object),
  recipes: React.PropTypes.arrayOf(React.PropTypes.object),
  cookingToday: React.PropTypes.arrayOf(React.PropTypes.object)
}

export default Dashboard
