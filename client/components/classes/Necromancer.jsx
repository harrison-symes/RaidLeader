import React from 'react'
import PartyMemberFrame from '../frames/PartyMemberFrame'
import {connect} from 'react-redux'

import mapStateToProps from './utils/classStateMap'

export class Necromancer extends PartyMemberFrame {
  finishCast() {
    const {member, started, player, dispatch} = this.props
    let {power, weapon_effect} = member
    if (started) {
      if (!member.isAlive) power*=0.5
      
      if (member.weapon_effect == 'criticalDead' && !member.isAlive) dispatch({type: 'CRITICAL_ATTACK_BOSS', power})
      else dispatch({type: 'PHYSICAL_ATTACK_BOSS', power})
    }
  }
  completeCast(target) {
    this.createSVG(target)
    this.startCast()
  }
  startCast() {
    const {power, speed, isAlive} = this.props.member
    const {started, member, dispatch} = this.props
    if (started) setTimeout(() => {
      if (started) {
        if (member.weapon_effect == 'selfPoison' && Math.random() < (1 / member.speed)) dispatch({type: 'ADD_EFFECT_TO_TARGET', target: member, effect: poisonConstructor()})
        this.completeCast()
      }
    }, 10000 / speed)
  }
  startFighting () {
    this.props.dispatch({type: 'NECROMANCER_START_BUFF'})
    this.startCast()
  }
}

export default connect(mapStateToProps)(Necromancer)
