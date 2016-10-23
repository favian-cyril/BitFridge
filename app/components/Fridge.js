import React from 'react'
import CardContent from '../components/CardContent'

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
        <CardContent title={this.props.title} 
                     contents={this.props.contents}
                     handleUpdate={this.props.handleUpdate}/>
      </div>
    )
  }
}

Fridge.defaultProps = {
  title: 'My Fridge'
}