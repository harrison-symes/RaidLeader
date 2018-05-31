import React from 'react'
import PartyMemberFrame from '../frames/PartyMemberFrame'
import {connect} from 'react-redux'

import mapStateToProps from './utils/classStateMap'


export class Monk extends PartyMemberFrame {
  finishCast() {
    const {started, member, dispatch, party} = this.props
    let {power} = member
    power = this.alterPower(power)

    if (started && member.isAlive) {
      if (member.weapon_effect == 'taunt') dispatch({type: 'BOSS_CHANGE_TARGET', target: member})
      dispatch({type: 'PHYSICAL_ATTACK_BOSS', power: power})
      dispatch({type: 'HEAL_ALL_FRIENDLY', power: power / party.length})
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
