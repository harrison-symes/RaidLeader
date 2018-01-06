import React from 'react'
import PartyMemberFrame from '../frames/PartyMemberFrame'
import {connect} from 'react-redux'

class Monk extends PartyMemberFrame {
  monkAttack() {
    this.props.dispatch({type: 'PHYSICAL_ATTACK_BOSS', power: this.props.member.power})
    this.props.dispatch({type: 'HEAL_ALL_FRIENDLY', power: this.props.member.power / 2})
    this.startCast()
  }
  startCast() {
    const {speed} = this.props.member
    setTimeout(() => this.monkAttack(), 10000 / speed)
  }
  startFighting () {
    const {power, speed} = this.props.member
    this.props.dispatch({type: 'MONK_START_BUFF', target: this.props.member})
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

export default connect(mapStateToProps)(Monk)
