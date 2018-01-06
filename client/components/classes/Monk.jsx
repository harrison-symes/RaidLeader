import React from 'react'
import PartyMemberFrame from '../frames/PartyMemberFrame'
import {connect} from 'react-redux'

import mapStateToProps from './utils/classStateMap'


class Monk extends PartyMemberFrame {
  finishCast() {
    this.props.dispatch({type: 'PHYSICAL_ATTACK_BOSS', power: this.props.member.power})
    this.props.dispatch({type: 'HEAL_ALL_FRIENDLY', power: this.props.member.power / 2})
    this.startCast()
  }
  startFighting () {
    const {power, speed} = this.props.member
    this.props.dispatch({type: 'MONK_START_BUFF', target: this.props.member})
    this.startCast()
  }
}

export default connect(mapStateToProps)(Monk)
