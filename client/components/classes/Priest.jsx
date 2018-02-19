import React from 'react'
import PartyMemberFrame from '../frames/PartyMemberFrame'
import {connect} from 'react-redux'

import mapStateToProps from './utils/classStateMap'

class Priest extends PartyMemberFrame {
  findTarget() {
    const {started, member, dispatch, party} = this.props
    if (!started || !member.isAlive) return

    let target = null
    party.forEach(member => {
      if (!target) target = member
      else if (target &&( member.hp/ member.initHp) < (target.hp / target.initHp)) target = member
    })
    let overHealing = (target.initHp - target.hp) - member.power
    if (overHealing < 0) target = null
    this.completeCast(target)
  }
  finishCast(target) {
    console.log({target});
    const {started, member, dispatch, party} = this.props
    const {power} = member
    if (member.weapon_effect == "curePoison") dispatch({type: 'REMOVE_EFFECT_FROM_TARGET', target, effect: {name: 'Poison'}})
    let overHealing =(target.initHp - target.hp) - member.power
    if (overHealing < 0) dispatch({type: 'PHYSICAL_ATTACK_BOSS', power: overHealing * -2})
    dispatch({type: 'HEAL_FRIENDLY_TARGET', target, power})
  }
  startCast() {
    const {power, speed, isAlive} = this.props.member
    const {party, started} = this.props
    if (!started) return
    setTimeout(() => this.findTarget(), 10000 / speed)
  }
  startFighting () {
    const {heroClass, power, speed, initHp} = this.props.member
    this.props.dispatch({type: 'PRIEST_START_BUFF', hp: initHp / 2, target: this.props.member})
    this.startCast();
  }
}

export default connect(mapStateToProps)(Priest)
