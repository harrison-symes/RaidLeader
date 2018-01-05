import React from 'react'
import PartyMemberFrame from '../frames/PartyMemberFrame'
import {connect} from 'react-redux'

class Mage extends PartyMemberFrame {
  startFighting () {
    const {power, speed} = this.props.member
    let interval = null
    interval = setInterval(() => this.specialAttack(power), 10000 / speed)
    this.setState({interval})
  }
}

const mapStateToProps = ({started, party, friendlyTarget}) => {
  return {
    started,
    party,
    friendlyTarget
  }
}

export default connect(mapStateToProps)(Mage)
