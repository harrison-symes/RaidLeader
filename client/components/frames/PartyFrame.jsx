import React, {Component} from 'react'
import {connect} from 'react-redux'

class PartyFrame extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <div>
      Party
    </div>
  }
}

const mapStateToProps = state => {
  return {

  }
}

const mapDispatchToProps = dispatch => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PartyFrame)
