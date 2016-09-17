import React from 'react'
import ReactDOM from 'react-dom'
import { Route, Router, browserHistory } from 'react-router'
import SearchContainer from './containers/SearchContainer'

var routes = (
  <Router history={browserHistory}>
    <Route path='/' component={SearchContainer}/>
  </Router>
)

ReactDOM.render(routes, document.getElementById('app'))