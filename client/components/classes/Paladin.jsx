import React from 'react'
import PartyMemberFrame from '../frames/PartyMemberFrame'
import {connect} from 'react-redux'

class Paladin extends PartyMemberFrame {
  constructor(props) {
    super(props)
  }
  finishCast(member) {
    this.props.dispatch({type: 'PHYSICAL_ATTACK_BOSS', power: member.power})
    this.props.dispatch({type: 'BOSS_CHANGE_TARGET', target: member})
    this.props.dispatch({type: 'HEAL_FRIENDLY_TARGET', target: member, power: member.power / 2})
  }
  startCast() {
    const {power, speed} = this.props.member
    setTimeout(() => this.finishCast(this.props.member), 10000 / speed)
  }
  startFighting () {
    const {power, speed} = this.props.member
    this.props.dispatch({type: 'PALADIN_START_BUFF', target: this.props.member})
    this.startCst()
  }
}

const mapStateToProps = ({started, party, friendlyTarget}) => {
  return {
    started,
    party,
    friendlyTarget
  }
}

export default connect(mapStateToProps)(Paladin)
