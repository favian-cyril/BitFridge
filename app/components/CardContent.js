import React from 'react'
import IngredientSuggestion from './IngredientSuggestion'

export default class CardContent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      contents: props.contents
    }
  }
  render() {
    return (
      <div className={'dropdown clearfix open'}>
        <ul className='media-list dropdown-menu'>
          {
            this.state.contents.map((item, i) => {
              return <IngredientSuggestion item={ item } key={ i }/>
            })
          }
        </ul>
      </div>
    )
  }
}

CardContent.defaultProps = {
  contents: []
}