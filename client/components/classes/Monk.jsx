import React from 'react'
import PartyMemberFrame from '../frames/PartyMemberFrame'
import {connect} from 'react-redux'

import mapStateToProps from './utils/classStateMap'


class Monk extends PartyMemberFrame {
  finishCast() {
    if (this.props.started && this.props.member.isAlive) {
      this.props.dispatch({type: 'PHYSICAL_ATTACK_BOSS', power: this.props.member.power})
      this.props.dispatch({type: 'HEAL_ALL_FRIENDLY', power: this.props.member.power})
      this.startCast()
    }
  }
  startFighting () {
    const {power, speed} = this.props.member
    this.props.dispatch({type: 'MONK_START_BUFF', target: this.props.member})
    this.startCast()
  }
}

export default connect(mapStateToProps)(Monk)
