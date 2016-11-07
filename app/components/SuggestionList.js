import React from 'react'
import IngredientContainer from '../containers/IngredientContainer'
import Preloader from '../components/Preloader'
import Error from '../components/Error'

const SuggestionList = (props) => {
  let results
  const status = (props.isFocused && props.searchText.length > 1) ? 'open' : ''
  if (props.isLoading) {
    results = (
      <div className="dropdown-menu">
        <Preloader/>
      </div>
    )
  } else if (props.errorType === 'NOTFOUND') {
    results = (
      <div className="dropdown-menu">
        <Error
          msg="No Results Found"
          desc="Your search did not return any results."
        />
      </div>
    )
  } else if (props.errorType === 'OFFLINE') {
    results = (
      <div className="dropdown-menu">
        <Error
          msg="Network Connection Error"
          desc="Check your internet connection and try again."
        />
      </div>
    )
  } else if (props.errorType === 'SERVERERR') {
    results = (
      <div className="dropdown-menu">
        <Error
          msg="Server Error"
          desc="The server is having problems, please leave him alone and try again later."
        />
      </div>
    )
  } else if (props.errorType === '' && props.suggestionResults.length) {
    results = (
      <ul className="media-list dropdown-menu">
        {
          props.suggestionResults.map((item, i) => (
            <IngredientContainer
              key={i}
              ingredient={item}
              idName={`ingr_${i}`}
              parent={'search'}
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
