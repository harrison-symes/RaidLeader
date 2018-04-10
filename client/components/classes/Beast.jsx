import React, {Component} from 'react'
import {connect} from 'react-redux'

import mapStateToProps from './utils/classStateMap'
import PartyMemberFrame from '../frames/PartyMemberFrame'

class Beast extends PartyMemberFrame {
  finishCast() {
    const {member, started, player, dispatch} = this.props
    let {power, weapon_effect, speed} = member
    if (started && member.isAlive) {
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
