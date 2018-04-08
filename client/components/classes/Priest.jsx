import React from 'react'
import PartyMemberFrame from '../frames/PartyMemberFrame'
import {connect} from 'react-redux'

import mapStateToProps from './utils/classStateMap'

export class Priest extends PartyMemberFrame {
  findTarget() {
    const {started, member, dispatch, party} = this.props
    if (!started || !member.isAlive) return

    let target = null
    party.forEach(member => {
      if (!target && member.isAlive) target = member
      else if (target && member.isAlive && ( member.hp/ member.initHp) < (target.hp / target.initHp)) target = member
    })
    let overHealing = (target.initHp - target.hp) - member.power
    if (overHealing < 0) target = null
    this.completeCast(target)
  }
  finishCast(target) {
    const {started, member, dispatch} = this.props
    let {power} = member
    if (!target) return
    if (member.weapon_effect == 'halfLife' && (target.hp / target.initHp) >= 0.5) power*=2
    if (member.weapon_effect == "curePoison") dispatch({type: 'REMOVE_EFFECT_FROM_TARGET', target, effect: {name: 'Poison'}})
    let overHealing =(target.initHp - target.hp) - power
    if (overHealing < 0) dispatch({type: 'PHYSICAL_ATTACK_BOSS', power: overHealing * -2})
    dispatch({type: 'HEAL_FRIENDLY_TARGET', target, power})
  }
  startCast() {
    const {power, speed, isAlive} = this.props.member
    const {started, member} = this.props
    if (!started || !isAlive) return

    setTimeout(() => this.findTarget(), 10000 / speed)
  }
  startFighting () {
    const {member, dispatch} = this.props
    const {heroClass, power, speed, initHp} = this.props.member
    dispatch({type: 'PRIEST_START_BUFF', target: member})
    this.startCast();
  }
}

export default connect(mapStateToProps)(Priest)
