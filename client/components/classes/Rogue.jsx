import React from 'react'
import PartyMemberFrame from '../frames/PartyMemberFrame'
import {connect} from 'react-redux'

import mapStateToProps from './utils/classStateMap'

class Rogue extends PartyMemberFrame {
  finishCast(power) {
    if (this.props.started && this.props.member.isAlive) {
      this.createSVG()
      if (Math.random() < 0.2) this.props.dispatch({type: 'CRITICAL_ATTACK_BOSS', power})
      else this.props.dispatch({type: 'PHYSICAL_ATTACK_BOSS', power})
      this.startCast()
    }
  }
  startFighting () {
    this.props.dispatch({type: 'ROGUE_START_BUFF'})
    this.startCast()
  }
}

export default connect(mapStateToProps)(Rogue)
