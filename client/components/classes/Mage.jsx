import React from 'react'
import PartyMemberFrame from '../frames/PartyMemberFrame'
import {connect} from 'react-redux'

import mapStateToProps from './utils/classStateMap'

class Mage extends PartyMemberFrame {
  finishCast(power) {
    if (this.props.started && this.props.member.isAlive) {
      if (this.props.player.mana / this.props.player.maxMana * 100 < 30) power*2
      this.props.dispatch({type: 'SPECIAL_ATTACK_BOSS', power})
      this.startCast()
    }
  }
  startFighting () {
    this.props.dispatch({type: 'MAGE_START_BUFF'})
    this.startCast()
  }
}

export default connect(mapStateToProps)(Mage)
