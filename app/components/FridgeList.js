import React from 'react'
import TransitionGroup from 'react-addons-css-transition-group'
import Ingredient from '../components/Ingredient'

const FridgeList = props => (
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
)

FridgeList.propTypes = {
  contents: React.PropTypes.arrayOf(
    React.PropTypes.object
  ).isRequired,
  updateFridge: React.PropTypes.func.isRequired
}

export default FridgeList