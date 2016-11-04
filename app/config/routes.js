import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import MainContainer from '../containers/MainContainer'
import Index from '../components/Index'
import Dashboard from '../components/Dashboard'

const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={MainContainer}>
      <IndexRoute component={Index}/>
      <Route path="/dash" component={Dashboard}/>
    </Route>
  </Router>
)

export default routes
