import React from 'react'
import PartyMemberFrame from '../frames/PartyMemberFrame'
import {connect} from 'react-redux'

import mapStateToProps from './utils/classStateMap'

class Warlock extends PartyMemberFrame {
  finishCast(power) {
    this.props.dispatch({type: 'SPECIAL_ATTACK_BOSS', power})
    this.props.dispatch({type: 'DAMAGE_ALL_FRIENDLY', power: power / 2})
    this.startCast()
  }
  startFighting () {
    this.props.dispatch({type: 'WARLOCK_START_BUFF', power: this.props.member.power})
    this.startCast()
  }
}

export default connect(mapStateToProps)(Warlock)
