import React from 'react'
import PartyMemberFrame from '../frames/PartyMemberFrame'
import {connect} from 'react-redux'

import mapStateToProps from './utils/classStateMap'

export class Warrior extends PartyMemberFrame {
  finishCast() {
    const {member, boss, dispatch, started} = this.props
    let {power} = member
    if (member.isAlive && started) {
      if (member.weapon_effect == 'enrage' && (member.hp / member.initHp) <= 0.5) power*=2
      if (member.weapon_effect == 'taunt') dispatch({type: 'BOSS_CHANGE_TARGET', target:member})
      if (boss.hp / boss.initHp * 100 <= 25) dispatch({type: 'CRITICAL_ATTACK_BOSS', power})
      else dispatch({type: 'PHYSICAL_ATTACK_BOSS', power})
    }
  }
  startFighting () {
    const {dispatch, member} = this.props
    dispatch({type: 'WARRIOR_START_BUFF', target: member})
    this.startCast()
  }
}

export default connect(mapStateToProps)(Warrior)
