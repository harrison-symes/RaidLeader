import React from 'react'
import PartyMemberFrame from '../frames/PartyMemberFrame'
import {connect} from 'react-redux'

import mapStateToProps from './utils/classStateMap'

import {renewConstructor} from '../../utils/effectConstructors'

export class Shaman extends PartyMemberFrame {
  finishCast() {
    const {member, started, player, dispatch, party} = this.props
    let {power} = member
    if (started && member.isAlive) {
      var renewTarget = member
      party.forEach(recruit => {
        if (recruit.isAlive && (recruit.hp / recruit.initHp) * 100 < (renewTarget.hp / renewTarget.initHp) * 100) renewTarget = recruit
      })
      if (member.weapon_effect == 'speedBooster') dispatch({type: 'INCREASE_RECRUIT_SPEED', percentage: 0.1, target: renewTarget})
      if (member.weapon_effect == "curePoison") dispatch({type: 'REMOVE_EFFECT_FROM_TARGET', target: renewTarget, effect: {name: 'Poison'}})
      dispatch({type: 'ADD_EFFECT_TO_TARGET', target: renewTarget, effect: renewConstructor()})
      dispatch({type: 'PHYSICAL_ATTACK_BOSS', power})
    }
  }
  startFighting () {
    this.props.dispatch({type: 'SHAMAN_START_BUFF'})
    this.startCast()
  }
}

export default connect(mapStateToProps)(Shaman)
