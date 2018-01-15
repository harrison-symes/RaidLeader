import React from 'react'
import {connect} from 'react-redux'

import mapStateToProps from './utils/bossStateMap'
import BossFrame from '../frames/BossFrame'

class DamagedDragon extends BossFrame {
  constructor(props) {
    super(props)
  }
  solveSpell(spells, boss) {
    let castSpell = spells.filter(spell => {
      if (!spell.onCooldown && spell.cost <= boss.mana) {
        switch (spell.name) {
          case 'Roar': return true
          case 'Feeble Fire': return true
          case 'Weakened Bite': return true
          default: return false
        }
      } else return false
    })[0]
    return castSpell
  }
}

export default connect(mapStateToProps)(DamagedDragon)
