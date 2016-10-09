import React from 'react'
import CardContent from '../components/CardContent'

export default class CardContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      settings: this.props.settings,
      contents: this.props.contents
    }
  }
  render() {
    return (
      <div className={'container ' + this.props.classname}>
        <CardContent contents={this.props.contents}/>
      </div>
    )
  }
}

CardContainer.defaultProps = {
  settings: {},
  contents: [],
  title: 'Default Title'
}