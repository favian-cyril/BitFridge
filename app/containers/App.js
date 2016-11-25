import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    // bindings
  }
  
  componentDidMount() {
    const { dispatch, location } = this.props
    dispatch(actions.fetchUserData())
      .then(() => {

      })
  }
}