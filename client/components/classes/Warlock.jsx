import React from 'react'
import PartyMemberFrame from '../frames/PartyMemberFrame'
import {connect} from 'react-redux'

import mapStateToProps from './utils/classStateMap'

class Warlock extends PartyMemberFrame {
  finishCast() {
    let {power} = this.props.member
    if (this.props.member.isAlive && this.props.started) {
      this.props.dispatch({type: 'PHYSICAL_ATTACK_BOSS', power})
      this.props.dispatch({type: 'PERCENT_DAMAGE_DAMAGE_ALL_FRIENDLY', percentage: 0.05})
    }
  }
  startFighting () {
    this.props.dispatch({type: 'WARLOCK_START_BUFF', power: this.props.member.power * 3})
    this.startCast()
  }
}

export default connect(mapStateToProps)(Warlock)
