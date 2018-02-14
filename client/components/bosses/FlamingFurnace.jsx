import React from 'react'
import {connect} from 'react-redux'

import mapStateToProps from './utils/bossStateMap'
import BossFrame from '../frames/BossFrame'

class FlamingFurnace extends BossFrame {
  constructor(props) {
    super(props)
  }
  solveSpell(spells, boss) {
    let castSpell = spells.filter(spell => {
      if (!spell.onCooldown && spell.cost <= boss.mana) {
        switch (spell.name) {
          case 'Unleash Flames': return boss.armor == 0
          default: return true
        }
      } else return false
    })[0]
    return castSpell
  }
}

export default connect(mapStateToProps)(FlamingFurnace)
