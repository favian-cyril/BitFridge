import React from 'react'
import CardContent from '../components/CardContent'

export default class FridgeContainer extends React.Component {
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
        <CardContent contents={this.state.contents}/>
      </div>
    )
  }
}

FridgeContainer.defaultProps = {
  title: 'Fridge'
}