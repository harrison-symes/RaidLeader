import React from 'react'
import PartyMemberFrame from '../frames/PartyMemberFrame'
import {connect} from 'react-redux'

import mapStateToProps from './utils/classStateMap'

import {renewConstructor} from '../../utils/effectConstructors'

class Shaman extends PartyMemberFrame {
  finishCast(power) {
    const {member, started, player, dispatch, party} = this.props
    if (started && member.isAlive) {
      this.createSVG()
      var renewTarget = member
      party.forEach(recruit => {
        if ((recruit.initHp / recruit.hp) * 100 < (renewTarget.initHp / renewTarget.hp) * 100) renewTarget = recruit
      })
      if (member.weapon_effect == "curePoison") dispatch({type: 'REMOVE_EFFECT_FROM_TARGET', renewTarget, effect: {name: 'Poison'}})
      dispatch({type: 'ADD_EFFECT_TO_TARGET', target: renewTarget, effect: renewConstructor()})
      dispatch({type: 'PHYSICAL_ATTACK_BOSS', power})
      this.startCast()
    }
  }
  startFighting () {
    this.props.dispatch({type: 'SHAMAN_START_BUFF'})
    this.startCast()
  }
}

export default connect(mapStateToProps)(Shaman)
