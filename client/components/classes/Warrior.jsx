import React from 'react'
import PartyMemberFrame from '../frames/PartyMemberFrame'
import {connect} from 'react-redux'

class Warrior extends PartyMemberFrame {
  finishCast(power) {
    if (this.props.member.hp / this.props.member.initHp * 100 < 50) this.props.dispatch({type: 'CRITICAL_ATTACK_BOSS', power})
    else this.props.dispatch({type: 'PHYSICAL_ATTACK_BOSS', power})
    this.startCast()
  }
  startCast() {
    const {power, speed} = this.props.member
    setTimeout(() => this.finishCast(power), 10000 / speed)
  }
  startFighting () {
    this.props.dispatch({type: 'WARRIOR_START_BUFF', target: this.props.member})
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

export default connect(mapStateToProps)(Warrior)
