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
    const {member, started, player, dispatch} = this.props
    if (started && member.isAlive) {
      console.log({member});
      if (member.weapon_effect == 'selfPoison' && Math.random() < 0.5 / member.speed) dispatch({type: 'ADD_EFFECT_TO_TARGET', target: member, effect: poisonConstructor(member.weapon_level * 2)})
      if (player.mana / player.maxMana * 100 < 30) power*2
      dispatch({type: 'SPECIAL_ATTACK_BOSS', power})
      this.startCast()
    }
  }
  startFighting () {
    this.props.dispatch({type: 'MAGE_START_BUFF'})
    this.startCast()
  }
}

export default connect(mapStateToProps)(Mage)
