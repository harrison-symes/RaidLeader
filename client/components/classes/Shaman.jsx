import React from 'react'
import PartyMemberFrame from '../frames/PartyMemberFrame'
import {connect} from 'react-redux'

import mapStateToProps from './utils/classStateMap'

import {renewConstructor} from '../../utils/effectConstructors'

class Shaman extends PartyMemberFrame {
  finishCast(power) {
    const {member, started, player, dispatch, party} = this.props
    if (started && member.isAlive) {
      var renewTarget = member
      party.forEach(recruit => {
        if (recruit.initHp - recruit.hp > renewTarget.initHp - renewTarget.hp) renewTarget = recruit
      })
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
