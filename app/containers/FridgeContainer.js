import React from 'react'
import CardContainer from './CardContainer'

export default function (props) {
  var settings = { sort: 'default', allergies: null }
  var contents = <CardContent contents={this.props.contents}/>
  return (
    <CardContainer
      title='Fridge'
      classname='fridge'
      settings={settings}
      contents={contents}
    />
  )
}