import React from 'react'
import CookingTodayIngredient from './CookingTodayIngredient'

const CookingToday = (props) => {
  var active = props.isExpanded.expand && props.id === props.isExpanded.id
  const accordionClass = active ? 'active' : ''
  const caretClass = active ? 'fa-caret-down' : 'fa-caret-right'
  const panelClass = active ? 'show' : ''

  let results = props.recipe.missedIngredients.map((item, i) =>
    <CookingTodayIngredient key={i} id={i} ingredient={item}/>
  )
  if (props.recipe.missedIngredients.length === 0) {
    results = <CookingTodayIngredient key={"0"} id={0} ingredient={{name: "No missing ingredients"}}/>
  }

  return (
    <div>
      <button className={`accordion ${accordionClass}`} onClick={() => {props.toggleAccordion(props.id)}} id={props.id}>
        <span className={`fa ${caretClass}`}></span>
        <a
          href={props.recipe.sourceUrl}
          target="_blank" rel="noopener noreferrer"
        >
          {props.recipe.title}
        </a>
      </button>
      <div className={`panel ${panelClass}`} id={props.id}>
        <ul className="list-group">
          {results}
        </ul>
      </div>
    </div>
  )
}

CookingToday.propTypes = {
  recipe: React.PropTypes.shape({
    title: React.PropTypes.string.isRequired,
    sourceUrl: React.PropTypes.string.isRequired,
    missedIngredients: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        name: React.PropTypes.string.isRequired
      }).isRequired
    ).isRequired
  }).isRequired,
  toggleAccordion: React.PropTypes.func.isRequired,
  isExpanded: React.PropTypes.shape({
    expand: React.PropTypes.bool.isRequired,
    id: React.PropTypes.number.isRequired
  }).isRequired,
  id: React.PropTypes.number.isRequired
}

export default CookingToday