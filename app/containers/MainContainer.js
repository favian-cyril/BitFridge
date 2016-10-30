import React from 'react'
import RecipesContainer from './RecipesContainer'
import SearchContainer from './SearchContainer'
import Fridge from '../components/Fridge'
import { getFridge } from '../clientapi'

export default class MainContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      display: 'index',
      fridge: [],
      recipes: []
    }
    this.getFridge = this.getFridge.bind(this)
    this.updateFridge = this.updateFridge.bind(this)
    this.updateRecipes = this.updateRecipes.bind(this)
    this.updateMissing = this.updateMissing.bind(this)
  }

  getChildContext() {
    return {
      fridge: this.state.fridge,
      display: this.state.display,
      recipes: this.state.recipes
    }
  }
  
  componentWillUpdate(nextProps, nextState) {
    if (nextState.fridge) {
      if (nextState.fridge.length > 0 && nextState.display == 'index')
        this.setState({display: 'dash'})
      else if (nextState.fridge.length < 1 && nextState.display == 'dash')
        this.setState({display: 'index'})
    }
    if (this.state.fridge != nextState.fridge) {
      console.log('fridge changed')
    }
  }
  
  componentDidMount() {
    this.setState({ fridge: this.getFridge() })
  }

  getFridge() {
    var that = this
    getFridge((err, res, body) => {
      if (!err) {
        that.setState({ fridge: body })
      }
    })
  }

  updateFridge(op, item) {
    var fridge = this.state.fridge
    var idx = -1
    fridge.forEach((res, i) => { if (res.id == item.id) idx = i })
    if (op == 'add' && idx == -1) {
      fridge.push(item)
    } else if (op == 'del' && idx > -1) {
      fridge.splice(idx, 1)
    }
    this.setState({ fridge: fridge })
  }

  updateRecipes(recipes) {
    this.setState({ recipes: recipes })
  }

  updateMissing(recipe, missing) {
    var recipes = this.state.recipes
    recipes.forEach((item, i) => {
      if (item.name == recipe.name) {
        recipes[i].missing = missing
      }
    })
    this.setState({ recipes: recipes })
  }

  render() {
    if (this.state.display == 'index') {
      return (
        <div className="index-container index-view">
          <div className="container-fluid">
            <div className="row">
              <img className="img-responsive index-logo offset-md-4 col-md-4" src="/images/logo-4x.png"/>
            </div>
            <div className="row">
              <div className="centered col-md-6">
                <SearchContainer handleUpdate={this.updateFridge}/>
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="dash-container">
          <nav className="navbar navbar-fixed-top navbar-light clearfix">
            <div className="row">
              <div className="col-xs-3 offset-xs-1">
                <img className="img-responsive" src="../images/logo-1x.png"/>
              </div>
              <div className="col-xs-7 search-bar-fix">
                <div className="container">
                  <SearchContainer handleUpdate={this.updateFridge}/>
                </div>
              </div>
            </div>
          </nav>
          <div className="container-fluid">
            <div className="row">
              <div className="col-xs-3 offset-xs-1">
                <div className="row">
                  <Fridge contents={this.state.fridge} handleUpdate={this.updateFridge}/>
                </div>
              </div>
              <div className="col-xs-7">
                <div className="row">
                  <RecipesContainer handleUpdateRecipes={this.updateRecipes}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}

MainContainer.childContextTypes = {
  fridge: React.PropTypes.array,
  display: React.PropTypes.string,
  recipes: React.PropTypes.array
}