import React from 'react'
import PartyMemberFrame from '../frames/PartyMemberFrame'
import {connect} from 'react-redux'

import mapStateToProps from './utils/classStateMap'

class Priest extends PartyMemberFrame {
  finishCast(power, target) {
    const {started, member, dispatch} = this.props
    if (!started || !member.isAlive) return
    if (!target) dispatch({type: 'SPECIAL_ATTACK_BOSS', power: power * 2})
    else {
      if (member.weapon_effect == "curePoison") dispatch({type: 'REMOVE_EFFECT_FROM_TARGET', target, effect: {name: 'Poison'}})
      dispatch({type: 'HEAL_FRIENDLY_TARGET', target, power})
    }
    this.startCast()
  }
  startCast() {
    const {power, speed, isAlive} = this.props.member
    const {party, started} = this.props
    if (!started) return
    let target = null
    party.forEach(member => {
      if (!target && member.hp < member.initHp) target = member
      else if (target && member.initHp - member.hp > target.initHp - target.hp) target = member
    })
    setTimeout(() => this.finishCast(power, target), 10000 / speed)
  }
  startFighting () {
    const {heroClass, power, speed, initHp} = this.props.member
    this.props.dispatch({type: 'PRIEST_START_BUFF', hp: initHp / 2, target: this.props.member})
    this.startCast();
  }
}

export default connect(mapStateToProps)(Priest)
