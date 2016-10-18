import React from 'react'
import ReactDOM from 'react-dom'
import { Route, Router, browserHistory } from 'react-router'
import MainContainer from './containers/MainContainer'

var routes = (
  <Router history={browserHistory}>
    <Route path='/' component={MainContainer}/>
  </Router>
)

ReactDOM.render(routes, document.getElementById('app'))