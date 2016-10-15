import React from 'react'
import IngredientSuggestion from './IngredientSuggestion'

export default class CardContent extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className={'dropdown clearfix open'}>
        <ul className='media-list dropdown-menu'>
          {
            this.props.contents.map((item, i) => {
              return <IngredientSuggestion item={ item } key={ i } fridge={ this.props.fridge }/>
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