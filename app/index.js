import React from 'react'
import ReactDOM from 'react-dom'
import { Route, Router, browserHistory } from 'react-router'
import IndexContainer from './containers/IndexContainer'

var routes = (
  <Router history={browserHistory}>
    <Route path='/' component={IndexContainer}/>
  </Router>
)

ReactDOM.render(routes, document.getElementById('app'))