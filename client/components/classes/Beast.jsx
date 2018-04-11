import React, {Component} from 'react'
import {connect} from 'react-redux'

import mapStateToProps from './utils/classStateMap'
import PartyMemberFrame from '../frames/PartyMemberFrame'

import {poisonConstructor} from '../../utils/effectConstructors'

class Beast extends PartyMemberFrame {
  finishCast() {
    const {member, started, player, dispatch, party} = this.props
    let {power, weapon_effect, speed} = member
    if (started && member.isAlive) {
      if (member.weapon_effect == 'foxPet') {
        dispatch({type: 'REMOVE_EFFECT_FROM_TARGET', effect: {name: 'Poison'}, target: {id: member.ownerId}})
        dispatch({type: 'REMOVE_EFFECT_FROM_TARGET', effect: {name: 'Poison'}, target: member})
      }
      dispatch({type: 'PHYSICAL_ATTACK_BOSS', power})
    }
  }
  componentDidMount() {
    if (this.props.started) setTimeout(() => this.startCast(), Math.random() * 1000)
  }
  startFighting() {
    this.startCast()
  }
}

export default connect(mapStateToProps)(Beast)
