import React from 'react'
import IngredientContainer from '../containers/IngredientContainer'
import Preloader from '../components/Preloader'
import Error from '../components/Error'

const SuggestionList = (props) => {
  let results
  const status = (props.isFocused && props.searchText.length > 1) ? 'open' : ''
  if (props.isLoading) {
    results = <div className="preloader dropdown-menu"><Preloader/></div>
  } else if (props.errorType === 'NOTFOUND') {
    results = <Error msg="No results" desc="Your search did not return any results."/>
  } else if (props.errorType === 'OFFLINE') {
    results = <Error msg="No connection" desc="Check your internet connection."/>
  } else if (props.errorType === '' && props.suggestionResults.length) {
    results = (
      <ul className="media-list dropdown-menu">
        {
          props.suggestionResults.map((item, i) => (
            <IngredientContainer
              key={i}
              ingredient={item}
              idName={`ingr_${i}`}
              updateFridge={props.updateFridge}
              isInFridge={props.isInFridge}
            />
          ))
        }
      </ul>
    )
  }
  return (
    <div className={`dropdown clearfix ${status}`}>
      {results}
    </div>
  )
}

SuggestionList.propTypes = {
  searchText: React.PropTypes.string.isRequired,
  isFocused: React.PropTypes.bool.isRequired,
  isLoading: React.PropTypes.bool.isRequired,
  errorType: React.PropTypes.string,
  suggestionResults: React.PropTypes.arrayOf(
    React.PropTypes.object
  ).isRequired,
  updateFridge: React.PropTypes.func.isRequired,
  isInFridge: React.PropTypes.func.isRequired
}

export default SuggestionList
