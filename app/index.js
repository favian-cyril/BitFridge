import React from 'react'  // eslint-disable-line no-unused-vars
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider, connect } from 'react-redux'
import App from './App'
import Index from './components/Index'
import Dashboard from './components/Dashboard'
import store from './redux/store'

const Root = ({ store, history }) => (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Index}/>
        <Route path="/dash" component={Dashboard}/>
      </Route>
    </Router>
  </Provider>
)

ReactDOM.render(
  <Root store={store} history={browserHistory}/>,
  document.getElementById('app')
)
