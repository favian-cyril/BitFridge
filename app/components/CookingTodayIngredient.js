import React from 'react'

const CookingTodayIngredient = (props) => (
  <li className="list-group-item" id={props.id}>{props.ingredient.name}</li>
)

CookingTodayIngredient.propTypes = {
  id: React.PropTypes.number.isRequired,
  ingredient: React.PropTypes.shape({
    name: React.PropTypes.string.isRequired
  }).isRequired
}

export default CookingTodayIngredient
