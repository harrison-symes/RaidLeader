import React from 'react'
import PartyMemberFrame from '../frames/PartyMemberFrame'
import {connect} from 'react-redux'

import mapStateToProps from './utils/classStateMap'

class Priest extends PartyMemberFrame {
  finishCast(power) {
    const {started, member, dispatch, party} = this.props
    if (!started || !member.isAlive) return

    let target = null
    party.forEach(member => {
      if (!target) target = member
      else if (target && member.initHp - member.hp > target.initHp - target.hp) target = member
    })

    if (member.weapon_effect == "curePoison") dispatch({type: 'REMOVE_EFFECT_FROM_TARGET', target, effect: {name: 'Poison'}})
    let overHealing = power - (member.initHp - member.hp)
    if (overHealing < 0) dispatch({type: 'PHYSICAL_ATTACK_BOSS', power: overHealing * -2})
    dispatch({type: 'HEAL_FRIENDLY_TARGET', target, power})
  }
  startCast() {
    const {power, speed, isAlive} = this.props.member
    const {party, started} = this.props
    if (!started) return
    setTimeout(() => this.finishCast(power), 10000 / speed)
  }
  startFighting () {
    const {heroClass, power, speed, initHp} = this.props.member
    this.props.dispatch({type: 'PRIEST_START_BUFF', hp: initHp / 2, target: this.props.member})
    this.startCast();
  }
}

export default connect(mapStateToProps)(Priest)
