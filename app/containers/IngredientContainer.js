import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Ingredient from '../components/Ingredient'
import { toggleAddDelete } from  '../actions'

const mapStateToProps = state => {
  return {
    message: state.message,
    display: state.display
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    toggleAddDelete
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Ingredient)
