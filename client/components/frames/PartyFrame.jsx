import React, {Component} from 'react'
import {connect} from 'react-redux'

import MemberFrame from './PartyMemberFrame'

class PartyFrame extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {party} = this.props
    return <div className="section PartyFrame">
      <div className="columns">
        {party.map((member, i) => <MemberFrame member={member} key={`member-${i}`} /> )}
      </div>
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
