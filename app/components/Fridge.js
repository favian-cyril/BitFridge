import React from 'react'
import CardContent from '../components/CardContent'
import IngredientSuggestion from '../components/IngredientSuggestion'

export default class Fridge extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      contents: [],
      settings: {
        sort: 'default', 
        allergies: null 
      }
    }
  }

  render() {
    return (
      <div className='container fridge'>
        <CardContent title={this.props.title} contents={this.state.contents}/>
      </div>
    )
  }
}

Fridge.defaultProps = {
  title: 'My Fridge'
}