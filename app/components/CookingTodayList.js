import React from 'react'
import CookingToday from './CookingToday'

const CookingTodayList = (props) => {
  // Fetch data from props, which would be Dashboard
  // Map all props.cookingToday() to create multiple CookingToday
  let results
  if (props.cookingToday.length > 0) {
    results = props.cookingToday.map((recipe) => {
      return <CookingToday someProp={recipe.prop} />
    })
  }
  return (
    // JSX/HTML markup for the component
    // You will use props here
  )
}

CookingTodayList.propTypes = {
  // props you expect from CookingTodayList
}

export default CookingTodayList