import React from 'react'
import PartyMemberFrame from '../frames/PartyMemberFrame'
import {connect} from 'react-redux'

import mapStateToProps from './utils/classStateMap'

class Warlock extends PartyMemberFrame {
  finishCast(power) {
    if (this.props.member.isAlive && this.props.started) {
      this.props.dispatch({type: 'PHYSICAL_ATTACK_BOSS', power})
      this.props.dispatch({type: 'WARLOCK_DAMAGE_ALL'})
    }
  }
  startFighting () {
    this.props.dispatch({type: 'WARLOCK_START_BUFF', power: this.props.member.power * 3})
    this.startCast()
  }
}

export default connect(mapStateToProps)(Warlock)
