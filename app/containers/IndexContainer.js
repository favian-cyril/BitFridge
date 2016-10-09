import React from 'react'
import SearchContainer from './SearchContainer'
import FridgeContainer from './FridgeCardContainer'

export default class IndexContainer extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <SearchContainer/>
        <FridgeContainer contents={[]}/>
      </div>
    )
  }
}