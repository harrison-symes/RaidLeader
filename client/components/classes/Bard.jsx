import React from 'react'
import PartyMemberFrame from '../frames/PartyMemberFrame'
import {connect} from 'react-redux'

import mapStateToProps from './utils/classStateMap'

export class Bard extends PartyMemberFrame {
  finishCast() {
    const {member, started, player, dispatch} = this.props
    let {power, weapon_effect, speed} = member
    power = this.alterPower(power)
    if (started && member.isAlive) {
      let manaChance = (1 / speed) > Math.random()
      let manaGain = manaChance ? 3 : 0
      if (weapon_effect == 'loseMana') manaGain = -1
      dispatch({type: 'PHYSICAL_ATTACK_BOSS', power})
      if (manaGain != 0) dispatch({type: 'PLAYER_GAIN_MANA', power: manaGain})
    }
  }
  startFighting () {
    this.props.dispatch({type: 'BARD_START_BUFF'})
    this.startCast()
  }
}

export default connect(mapStateToProps)(Bard)
