import React from 'react'
import PartyMemberFrame from '../frames/PartyMemberFrame'
import {connect} from 'react-redux'

import mapStateToProps from './utils/classStateMap'

export class Rogue extends PartyMemberFrame {
  finishCast() {
    const {member, started, dispatch} = this.props
    let {power, isAlive} = member
    if (started && member.isAlive) {
      if (Math.random() < 0.2) dispatch({type: 'CRITICAL_ATTACK_BOSS', power})
      else dispatch({type: 'PHYSICAL_ATTACK_BOSS', power})
    }
  }
  startFighting () {
    this.props.dispatch({type: 'ROGUE_START_BUFF'})
    this.startCast()
  }
}

export default connect(mapStateToProps)(Rogue)
