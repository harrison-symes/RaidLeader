import React from 'react'
import PartyMemberFrame from '../frames/PartyMemberFrame'
import {connect} from 'react-redux'

import mapStateToProps from './utils/classStateMap'

const poisonConstructor = (power) => ({
  name: 'Poison',
  duration: 15,
  power,
  colour: '#BA8CE8',
  tickRate: 5,
  type: 'DAMAGE_FRIENDLY_TARGET'
})

class Mage extends PartyMemberFrame {
  finishCast(power) {
    if (this.props.started && this.props.member.isAlive) {
      if (this.props.member.weapon_effect == 'selfPoison') this.props.dispatch({type: 'ADD_EFFECT_TO_TARGET', target: member, effect: poisonConstructor(this.props.member.weapon_effect * 2)})
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
