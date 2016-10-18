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
              <img className="img-responsive index-logo col-md-offset-4 col-md-4" src="/images/logo-4x.png"/>
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
        <div className="index-container">
          <div className="container">
            <img className="img-responsive index-logo col-lg-offset-3 col-md-offset-3 col-lg-6 col-md-6"
                 src="/images/logo-8x.png"/>
          </div>
          <SearchContainer context="dashboard"/>
        </div>
      )
    }
  }
}