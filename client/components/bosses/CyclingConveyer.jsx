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
                return true
              case 'Discharge':
                return true
              case 'Change Gears':
                return true
              default: return null
            }
          case 'stageTwo':
            switch(spell.name) {

              default: return null
            }
          case 'stageThree':
            switch(spell.name) {

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
