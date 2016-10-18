import React from 'react'
import SearchContainer from './SearchContainer'
import { getFridge } from '../clientapi'

export default class IndexContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showDash: false,
      fridge: null
    }
    this.getFridge = this.getFridge.bind(this)
    this.updateFridge = this.updateFridge.bind(this)
  }

  componentDidMount() {
    this.getFridge()
  }
  
  componentWillUpdate(nextProps, nextState) {
    if (nextState.fridge.length > 2 && !nextState.showDash)
      this.setState({ showDash: true })
    else if (nextState.fridge.length < 3 && nextState.showDash)
      this.setState({ showDash: false })
  }

  getFridge() {
    var that = this
    getFridge((err, res, body) => {
      if (!err) {
        that.setState({ fridge: body })
      }
    })
  }

  updateFridge(op, id) {
    var fridge = this.state.fridge
    if (op == 'add') {
      fridge.push(id)
    } else if (op == 'del') {
      let idx = fridge.indexOf(id)
      if (idx > -1) fridge.splice(idx, 1)
    }
    this.setState({ fridge: fridge })
  }
  
  render() {
    if (!this.state.showDash) {
      return (
        <div className="index-container index-view">
          <div className="container-fluid">
            <div className="row">
              <img className="img-responsive index-logo offset-md-4 col-md-4" src="/images/logo-4x.png"/>
            </div>
            <div className="row">
              <div className="centered col-md-6">
                <SearchContainer context="index" fridge={this.state.fridge} handleUpdate={this.updateFridge}/>
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
                  <SearchContainer context="dashboard" fridge={this.state.fridge} handleUpdate={this.updateFridge}/>
                </div>
              </div>
            </div>
          </nav>
          <div className="container-fluid">
          </div>
        </div>
      )
    }
  }
}