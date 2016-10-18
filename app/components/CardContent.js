import React from 'react'
import IngredientSuggestion from './IngredientSuggestion'

export default class CardContent extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="card">
        <div className="card-block">
          <h5 className="card-title">{this.props.title}</h5>
        </div>
        <div className="list-wrapper">
          <ul className='media-list dropdown-menu'>
            {
              this.props.contents.map((item, i) => {
                return <IngredientSuggestion item={ item } key={ i } fridge={ this.props.fridge }/>
              })
            }
          </ul>
        </div>
      </div>
    )
  }
}