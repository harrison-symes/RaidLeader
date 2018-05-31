import React from 'react'
import PartyMemberFrame from '../frames/PartyMemberFrame'
import {connect} from 'react-redux'

import mapStateToProps from './utils/classStateMap'

export class Hunter extends PartyMemberFrame {
  finishCast() {
    const {member, started, player, dispatch} = this.props
    const {power, isAlive, hp, initHp, weapon_effect} = member
    power = this.alterPower(power)

    if (started && isAlive) {
      if (weapon_effect == 'taunt') this.props.dispatch({type: 'BOSS_CHANGE_TARGET', target: member})
      if (hp / initHp * 100 < 50) {
        dispatch({type: 'CRITICAL_ATTACK_BOSS', power})
        dispatch({type: 'PERCENT_HEAL_FRIENDLY_TARGET', target:member, percentage: 0.1})
      } else dispatch({type: 'PHYSICAL_ATTACK_BOSS', power})
    }
  }
  startFighting () {
    const {member, dispatch} = this.props
    dispatch({type: 'HUNTER_START_BUFF', target: member})
    this.startCast()
  }
}

export default connect(mapStateToProps)(Hunter)
