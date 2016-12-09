import React from 'react'
import { throttle } from 'lodash'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { toggleTab } from  '../redux/actions'
import FridgeList from '../components/FridgeList'
import ShoppingList from '../components/ShoppingList'

class FridgeShop extends React.Component {
  constructor(props) {
    super(props)
    this.handleToggleTab = this.handleToggleTab.bind(this)
    this.handleToggleTab = throttle(this.handleToggleTab, 500, {leading: true})
  }

  handleToggleTab() {
    this.props.toggleTab()
  }

  render() {
    return (
      <div className="card">
        <div className="card-block frg-shp">
          <ul className="nav nav-tabs" id="fridge-shop" role="tablist">
            <li
              className="nav-item"
              onMouseDown={e => e.preventDefault()}
            >
              <a
                onClick={this.handleToggleTab}
                className="nav-link active"
                data-toggle="tab"
                href="#fridge"
                role="tab"
              >
                <span className="bf bf-fridge"></span>
                Fridge
              </a>
            </li>
            <li
              className="nav-item"
              onMouseDown={e => e.preventDefault()}
            >
              <a
                onClick={this.handleToggleTab}
                className="nav-link"
                data-toggle="tab"
                href="#shopping-list"
                role="tab"
              >
                <span className="bf bf-shopping-basket"></span>
                Shopping List
              </a>
            </li>
          </ul>
        </div>
        <div className="tab-content">
          <div className="tab-pane fade in active" id="fridge" role="tabpanel">
            <FridgeList
              contents={this.props.contents}
              updateFridge={this.props.updateFridge}
            />
          </div>
          <div className="tab-pane fade" id="shopping-list" role="tabpanel">
            <ShoppingList
              contents={this.props.contents}
              updateFridge={this.props.updateFridge}
            />
          </div>
        </div>
      </div>
    )
  }
}

FridgeShop.propTypes = {
  contents: React.PropTypes.arrayOf(
    React.PropTypes.object
  ).isRequired,
  updateFridge: React.PropTypes.func.isRequired,
  toggleTab: React.PropTypes.func.isRequired
}

FridgeShop.defaultProps = {
  contents: []
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    toggleTab
  }, dispatch)
}

export default connect(null, mapDispatchToProps)(FridgeShop)