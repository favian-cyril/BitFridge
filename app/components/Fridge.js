import React from 'react'
import TransitionGroup from 'react-addons-css-transition-group'
import Ingredient from '../components/Ingredient'

const Fridge = props => (
  <div className="card">
    <div className="card-block frg-shp">
      <ul className="nav nav-tabs" id="fridge-shop" role="tablist">
        <li className="nav-item">
          <a className="nav-link active" data-toggle="tab" href="#fridge" role="tab">
            <span className="bf bf-fridge"></span>
            Fridge
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" data-toggle="tab" href="#shopping-list" role="tab">
            <span className="bf bf-shopping-basket"></span>
            Shopping List
          </a>
        </li>
      </ul>
    </div>
    <div className="tab-content">
      <div className="tab-pane fade in active" id="fridge" role="tabpanel">
        <div className="list-wrapper">
          <ul className="media-list">
            <TransitionGroup
              transitionName="fridge-contents"
              transitionEnterTimeout={600}
              transitionLeaveTimeout={600}
            >
              {
                props.contents.map((item, i) => (
                    <Ingredient
                      key={i}
                      ingredient={item}
                      idName={`fridge-${i}`}
                      parent={'fridge'}
                    />
                  )
                )
              }
            </TransitionGroup>
          </ul>
        </div>
      </div>
      <div className="tab-pane fade" id="shopping-list" role="tabpanel">
        <div className="list-wrapper">
          <ul className="media-list">
            <TransitionGroup
              transitionName="fridge-contents"
              transitionEnterTimeout={600}
              transitionLeaveTimeout={600}
            >
              {
                props.contents.map((item, i) => (
                    <Ingredient
                      key={i}
                      ingredient={item}
                      idName={`shopping-list-${i}`}
                      parent={'shopping-list'}
                    />
                  )
                )
              }
            </TransitionGroup>
          </ul>
        </div>
      </div>
    </div>
  </div>
)

Fridge.propTypes = {
  title: React.PropTypes.string.isRequired,
  contents: React.PropTypes.arrayOf(
    React.PropTypes.object
  ).isRequired,
  updateFridge: React.PropTypes.func.isRequired
}

Fridge.defaultProps = {
  title: 'My Fridge',
  contents: []
}

export default Fridge
