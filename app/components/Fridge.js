import React from 'react'
import IngredientSuggestion from './IngredientSuggestion'

export default class Fridge extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      settings: {
        sort: 'default', 
        allergies: null 
      }
    }
  }

  render() {
    return (
      <div className='container fridge'>
        <div className="card">
          <div className="card-block">
            <h5 className="card-title">{this.props.title}</h5>
          </div>
          <div className="list-wrapper">
            <ul className='media-list'>
              {
                this.props.contents.map((item, i) => {
                  return <IngredientSuggestion item={ item } key={ i }
                                               parent='fridge'
                                               fridge={ this.props.fridge }
                                               handleUpdate={this.props.handleUpdate}/>
                })
              }
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

Fridge.defaultProps = {
  title: 'My Fridge'
}