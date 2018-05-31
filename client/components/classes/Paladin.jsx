import React from 'react'
import PartyMemberFrame from '../frames/PartyMemberFrame'
import {connect} from 'react-redux'
import AttackIcon from '../frames/AttackIcon'

import mapStateToProps from './utils/classStateMap'

export class Paladin extends PartyMemberFrame {
  finishCast() {
    const {member, boss, started, dispatch} = this.props
    let {power, isAlive} = member
    power = this.alterPower(power)

    if (started && isAlive) {
      dispatch({type: 'PHYSICAL_ATTACK_BOSS', power: power})
      if (member.weapon_effect != 'noTaunt') dispatch({type: 'BOSS_CHANGE_TARGET', target: member})
      if (member.weapon_effect == 'noTaunt' || (boss.bossTarget && boss.bossTarget.id == member.id)) dispatch({type: 'HEAL_FRIENDLY_TARGET', target: member, power})
    }
  }
  startFighting () {
    const {dispatch, member} = this.props
    const {power, speed} = member
    dispatch({type: 'PALADIN_START_BUFF', target: member})
    this.startCast()
  }
}


export default connect(mapStateToProps)(Paladin)
