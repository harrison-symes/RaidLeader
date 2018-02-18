import React from 'react'
import PartyMemberFrame from '../frames/PartyMemberFrame'
import {connect} from 'react-redux'

import mapStateToProps from './utils/classStateMap'

class Hunter extends PartyMemberFrame {
  finishCast(power) {
    const {member, started, player, dispatch} = this.props
    if (started && member.isAlive) {
      this.createSVG()
      if (member.weapon_effect == 'taunt') this.props.dispatch({type: 'BOSS_CHANGE_TARGET', target: member})
      if (member.hp / member.initHp * 100 < 50) {
        dispatch({type: 'CRITICAL_ATTACK_BOSS', power})
        dispatch({type: 'PERCENT_HEAL_FRIENDLY_TARGET', target:member, percentage: 0.1})
      } else dispatch({type: 'PHYSICAL_ATTACK_BOSS', power})
      this.startCast()
    }
  }
  startFighting () {
    this.props.dispatch({type: 'HUNTER_START_BUFF', target: this.props.member})
    this.startCast()
  }
}

export default connect(mapStateToProps)(Hunter)
