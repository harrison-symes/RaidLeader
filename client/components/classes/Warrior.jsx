import React from 'react'
import PartyMemberFrame from '../frames/PartyMemberFrame'
import {connect} from 'react-redux'

import mapStateToProps from './utils/classStateMap'

class Warrior extends PartyMemberFrame {
  finishCast(power) {
    if (this.props.boss.hp / this.props.boss.initHp * 100 < 25) this.props.dispatch({type: 'CRITICAL_ATTACK_BOSS', power})
    else this.props.dispatch({type: 'PHYSICAL_ATTACK_BOSS', power})
    this.startCast()
  }
  startFighting () {
    this.props.dispatch({type: 'WARRIOR_START_BUFF', target: this.props.member})
    this.startCast()
  }
}

export default connect(mapStateToProps)(Warrior)
