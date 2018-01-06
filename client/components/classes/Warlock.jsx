import React from 'react'
import PartyMemberFrame from '../frames/PartyMemberFrame'
import {connect} from 'react-redux'

class Warlock extends PartyMemberFrame {
  finishCast(power) {
    this.props.dispatch({type: 'SPECIAL_ATTACK_BOSS', power})
    this.props.dispatch({type: 'DAMAGE_ALL_FRIENDLY', power: power / 2})
    this.startCast()
  }
  startCast() {
    const {power, speed} = this.props.member
    setTimeout(() => this.finishCast(power), 10000 / speed)
  }
  startFighting () {
    this.props.dispatch({type: 'WARLOCK_START_BUFF', power: this.props.member.power})
    this.startCast()
  }
}

const mapStateToProps = ({started, party, friendlyTarget}) => {
  return {
    started,
    party,
    friendlyTarget
  }
}

export default connect(mapStateToProps)(Warlock)
