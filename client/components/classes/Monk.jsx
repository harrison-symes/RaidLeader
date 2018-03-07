import React from 'react'
import PartyMemberFrame from '../frames/PartyMemberFrame'
import {connect} from 'react-redux'

import mapStateToProps from './utils/classStateMap'


export class Monk extends PartyMemberFrame {
  finishCast() {
    const {started, member, dispatch} = this.props
    if (started && member.isAlive) {
      if (member.weapon_effect == 'taunt') dispatch({type: 'BOSS_CHANGE_TARGET', target: member})
      dispatch({type: 'PHYSICAL_ATTACK_BOSS', power: member.power})
      dispatch({type: 'PERCENT_HEAL_ALL_FRIENDLY', percentage: 0.1})
    }
  }
  startFighting () {
    const {member, dispatch} = this.props
    const {power, speed} = member
    dispatch({type: 'MONK_START_BUFF', target: member})
    this.startCast()
  }
}

export default connect(mapStateToProps)(Monk)
