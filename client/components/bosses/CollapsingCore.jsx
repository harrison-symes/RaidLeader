import React from 'react'
import {connect} from 'react-redux'

import mapStateToProps from './utils/bossStateMap'
import BossFrame from '../frames/BossFrame'

class CyclingConveyer extends BossFrame {
  constructor(props) {
    super(props)
  }
  solveSpell(spells, boss) {
    const aliveTargets = this.props.party.filter(recruit => recruit.isAlive).length
    let castSpell = spells.filter(spell => {
      if (!spell.onCooldown && spell.cost <= boss.mana) {
        switch(boss.stage) {
          case 'stageOne':
            switch(spell.name) {
              case 'Charge': return boss.armor == 0
              case 'Magnetic Pulse': return true
              case 'Magma Surge': return true
              default: return null
            }
          case 'stageTwo':
            switch(spell.name) {
              case 'Meltdown': return boss.mana >= spell.manaRequired
              case 'Half Life': return aliveTargets > 0
              case 'Magma Surge': return true

              default: return null
            }
          case 'stageThree':
            switch(spell.name) {
              case 'Explode': return boss.mana == spell.manaRequired
              case 'Radiate': return aliveTargets > 0
              case 'Half Life': return aliveTargets > 0
              case 'Fission': return true
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
