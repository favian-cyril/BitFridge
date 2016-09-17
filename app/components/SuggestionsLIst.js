import React from 'react'
import searchIngredients from '../models/apicalls'

export default class SuggestionsList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      results: []
    }
  }

  componentWillReceiveProps(nextProps) {
    var searchText = nextProps.searchText
    searchIngredients(searchText, true, (err, res, body) => {
      if (err)
        throw err
      else if (!err && res.statusCode === 200) {
        this.state.results = body
      }
    })
  }

  render() {
    return (
      <p>{this.state.results}</p>
    )
  }
}