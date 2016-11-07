import React from 'react'

const CookingToday = (props) => {
  // Fetch data from props
  return (
    // JSX/HTML markup for the component
    // You will use props here
    <button className="accordion">
      <span className="fa fa-caret-right"></span>
      <span className="fa fa-caret-down" style="display: none;"></span>
      {props.recipe.name}
      <a
        className="fa fa-2x fa-external-link btn-add-icon"
        href="{props.recipe.sourceUrl}"
      >
      </a>
    </button>
    <div className="panel">
      <ul className="list-group">
        <li className="list-group-item">
          // missing ingredients
        </li>
      </ul>
    </div>
  )
}

CookingToday.propTypes = {
  // props you expect from CookingTodayList
}

export default CookingToday