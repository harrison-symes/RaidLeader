import React, {Component} from 'react'
import {connect} from 'react-redux'

class PartyFrame extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {party} = this.props
    return <div>
      Party
      <h1>party count: {party.length}</h1>
    </div>
  }
}

const mapStateToProps = ({party}) => {
  return {
    party
  }
}

const mapDispatchToProps = dispatch => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PartyFrame)
