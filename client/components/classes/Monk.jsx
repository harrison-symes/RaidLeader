import React from 'react'
import PartyMemberFrame from '../frames/PartyMemberFrame'
import {connect} from 'react-redux'

import mapStateToProps from './utils/classStateMap'


class Monk extends PartyMemberFrame {
  finishCast() {
    if (this.props.started && this.props.member.isAlive) {
      if (member.weapon_effect == 'taunt') this.props.dispatch({type: 'BOSS_CHANGE_TARGET', target: member})
      this.props.dispatch({type: 'PHYSICAL_ATTACK_BOSS', power: this.props.member.power})
      this.props.dispatch({type: 'LEVEL_HEAL_ALL_FRIENDLY'})
    }
  }
  startFighting () {
    const {power, speed} = this.props.member
    this.props.dispatch({type: 'MONK_START_BUFF', target: this.props.member})
    this.startCast()
  }
}

export default connect(mapStateToProps)(Monk)
