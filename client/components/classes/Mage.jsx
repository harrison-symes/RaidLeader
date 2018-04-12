import React from 'react'
import PartyMemberFrame from '../frames/PartyMemberFrame'
import {connect} from 'react-redux'

import mapStateToProps from './utils/classStateMap'

export class Mage extends PartyMemberFrame {
  finishCast() {
    const {member, started, player, dispatch} = this.props
    let {power, weapon_effect} = member
    if (started && member.isAlive) {
      if (player.mana / player.maxMana * 100 <= 30) power*=2
      dispatch({type: 'PHYSICAL_ATTACK_BOSS', power})
      if (weapon_effect == 'charge') dispatch({type: 'PLAYER_GAIN_MANA', power: 1})
    }
  }
  startFighting () {
    this.props.dispatch({type: 'MAGE_START_BUFF'})
    this.startCast()
  }
}

export default connect(mapStateToProps)(Mage)
