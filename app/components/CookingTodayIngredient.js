import React from 'react'

const CookingTodayIngredient = props => {
  const crossed = props.ingredient.isInFridge ? 'crossed' : ''
  return (
    <li className={`list-group-item ${crossed}`} id={props.id}>{props.ingredient.name}</li>
  )
}

CookingTodayIngredient.propTypes = {
  id: React.PropTypes.number.isRequired,
  ingredient: React.PropTypes.shape({
    name: React.PropTypes.string.isRequired
  }).isRequired
}

export default CookingTodayIngredient
