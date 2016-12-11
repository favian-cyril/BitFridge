import React from 'react'
import CookingTodayIngredient from './CookingTodayIngredient'

const CookingToday = props => {
  var active = props.accordion.isExpanded && props.index === props.accordion.index
  console.log({ active, expanded: props.accordion.isExpanded, index: props.accordion.index })
  const accordionClass = active ? 'active' : ''
  const caretClass = active ? 'fa-caret-down' : 'fa-caret-right'
  const panelClass = active ? 'show' : ''

  let results = props.recipe.missedIngredients.map((item, i) =>
    <CookingTodayIngredient key={i} id={i} ingredient={item}/>
  )
  if (props.recipe.missedIngredients.length === 0) {
    results = <CookingTodayIngredient key={"0"} id={0} ingredient={{ name: "No missing ingredients" }}/>
  }

  return (
    <div>
      <button className={`accordion ${accordionClass}`} onClick={() => {props.toggleCookingToday(props.index)}} id={props.index}>
        <span className={`fa ${caretClass}`}></span>
        <a
          href={props.recipe.sourceUrl}
          target="_blank" rel="noopener noreferrer"
        >
          {props.recipe.title}
        </a>
      </button>
      <div className={`panel ${panelClass}`} id={props.index}>
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
        name: React.PropTypes.string.isRequired,
        image: React.PropTypes.string.isRequired
      }).isRequired
    ).isRequired
  }).isRequired,
  toggleCookingToday: React.PropTypes.func.isRequired,
  accordion: React.PropTypes.shape({
    isExpanded: React.PropTypes.bool.isRequired,
    index: React.PropTypes.number.isRequired
  }).isRequired,
  index: React.PropTypes.number.isRequired
}

export default CookingToday