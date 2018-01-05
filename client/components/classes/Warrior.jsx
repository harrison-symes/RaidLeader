import React from 'react'
import PartyMemberFrame from '../frames/PartyMemberFrame'
import {connect} from 'react-redux'

class Warrior extends PartyMemberFrame {
  startFighting () {
    const {heroClass, power, speed} = this.props.member
    let interval = null
    interval = setInterval(() => this.physicalAttack(power), 10000 / speed)
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

export default connect(mapStateToProps)(Warrior)
