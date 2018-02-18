import React from 'react'
import PartyMemberFrame from '../frames/PartyMemberFrame'
import {connect} from 'react-redux'
import AttackIcon from '../frames/AttackIcon'

import mapStateToProps from './utils/classStateMap'

class Paladin extends PartyMemberFrame {
  finishCast(power) {
    const {member} = this.props
    this.createSVG()
    if (this.props.started && this.props.member.isAlive) {
      this.props.dispatch({type: 'PHYSICAL_ATTACK_BOSS', power: power})
      if (member.weapon_effect != 'noTaunt') this.props.dispatch({type: 'BOSS_CHANGE_TARGET', target: member})
      this.props.dispatch({type: 'HEAL_FRIENDLY_TARGET', target: member, power})
      this.startCast()
    }
  }
  startFighting () {
    const {power, speed} = this.props.member
    this.props.dispatch({type: 'PALADIN_START_BUFF', target: this.props.member})
    this.startCast()
  }
}


export default connect(mapStateToProps)(Paladin)
