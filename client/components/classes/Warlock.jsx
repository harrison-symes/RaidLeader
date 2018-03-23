import React from 'react'
import PartyMemberFrame from '../frames/PartyMemberFrame'
import {connect} from 'react-redux'

import mapStateToProps from './utils/classStateMap'

export class Warlock extends PartyMemberFrame {
  finishCast() {
    const {member, started, dispatch} = this.props
    let {power, isAlive, weapon_effect} = member
    if (isAlive && started) {
      dispatch({type: 'PHYSICAL_ATTACK_BOSS', power})
      if (weapon_effect == 'lightningRod') dispatch({type: 'PERCENT_DAMAGE_DAMAGE_FRIENDLY_TARGET', target: member, percentage: 0.05})
      else dispatch({type: 'PERCENT_DAMAGE_DAMAGE_ALL_FRIENDLY', percentage: 0.05, target: member})
    }
  }
  startFighting () {
    const {member, dispatch} = this.props
    dispatch({type: 'WARLOCK_START_BUFF', power: member.power * 3})
    this.startCast()
  }
}

export default connect(mapStateToProps)(Warlock)
