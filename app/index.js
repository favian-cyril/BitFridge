import React from 'react'  // eslint-disable-line no-unused-vars
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import routes from './config/routes'
import rootReducer from './reducers'
import middleware from './middleware'

const store = createStore(
  rootReducer,
  applyMiddleware(thunk, logger, ...middleware)
)

const Root = () => (
  <Provider store={store}>
    {routes}
  </Provider>
)

ReactDOM.render(Root, document.getElementById('app'))
