import React from 'react'
import PartyMemberFrame from '../frames/PartyMemberFrame'
import {connect} from 'react-redux'

import mapStateToProps from './utils/classStateMap'

export class Bard extends PartyMemberFrame {
  finishCast() {
    const {member, started, player, dispatch} = this.props
    let {power, weapon_effect} = member
    if (started && member.isAlive) {
      dispatch({type: 'PHYSICAL_ATTACK_BOSS', power})
      dispatch({type: 'PLAYER_GAIN_MANA', power: 1})
    }
  }
  startFighting () {
    this.props.dispatch({type: 'BARD_START_BUFF'})
    this.startCast()
  }
}

export default connect(mapStateToProps)(Bard)
