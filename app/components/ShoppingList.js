import React from 'react'
import TransitionGroup from 'react-addons-css-transition-group'
import Ingredient from '../components/Ingredient'

const ShoppingList = props => (
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
)

ShoppingList.propTypes = {
  contents: React.PropTypes.arrayOf(
    React.PropTypes.object
  ).isRequired,
  updateFridge: React.PropTypes.func.isRequired
}

export default ShoppingList