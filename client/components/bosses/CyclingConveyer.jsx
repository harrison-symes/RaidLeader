import React from 'react'
import {connect} from 'react-redux'

import mapStateToProps from './utils/bossStateMap'
import BossFrame from '../frames/BossFrame'

class CyclingConveyer extends BossFrame {
  constructor(props) {
    super(props)
  }
  solveSpell(spells, boss) {
    let castSpell = spells.filter(spell => {
      if (!spell.onCooldown && spell.cost <= boss.mana) {
        switch(boss.stage) {
          case 'stageZero':
            return true
          case 'stageOne':
            switch(spell.name) {
              case 'Recharge': return true
              case 'Short Circuit':
                return boss.spells.find(bossSpell => bossSpell.name == 'Recharge').onCooldown
              case 'Discharge':
                return boss.spells.find(bossSpell => bossSpell.name == 'Short Circuit').onCooldown
              case 'Change Gears':
                return boss.spells.find(bossSpell => bossSpell.name == 'Discharge').onCooldown
              default: return null
            }
          case 'stageTwo':
            switch(spell.name) {
              case 'Power Up':
                return true
              case 'Payload':
                return boss.spells.find(bossSpell => bossSpell.name == 'Power Up').onCooldown
              case 'Power Drill':
                return boss.spells.find(bossSpell => bossSpell.name == 'Payload').onCooldown
              case 'Change Gears':
                return boss.spells.find(bossSpell => bossSpell.name == 'Power Drill').onCooldown
              default: return null
            }
          case 'stageThree':
            switch(spell.name) {
              case 'Repair':
                return true
              case 'Discharge':
                return true
              case 'Power Drill':
                return true
              case 'Speed Up': return true
              default: return null
            }
          default: return null
        }
      } else return false
    })[0]
    return castSpell
  }
}

export default connect(mapStateToProps)(CyclingConveyer)
