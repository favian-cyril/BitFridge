import React from 'react'  // eslint-disable-line no-unused-vars
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import App from './containers/App'
import Index from './components/Index'
import Dashboard from './components/Dashboard'
import store from './store'

const Root = () => (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Index}/>
        <Route path="/dash" component={Dashboard}/>
      </Route>
    </Router>
  </Provider>
)

ReactDOM.render(<Root/>, document.getElementById('app'))
