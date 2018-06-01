import React from 'react'
import {connect} from 'react-redux'

import mapStateToProps from './utils/bossStateMap'
import BossFrame from '../frames/BossFrame'

class PiratePercy extends BossFrame {
  constructor(props) {
    super(props)
  }
  solveSpell(spells, boss) {
    const aliveTargets = this.props.party.filter(recruit => recruit.isAlive)
    let castSpell = spells.filter(spell => {
      if (!spell.onCooldown && spell.cost <= boss.mana) {
        switch(boss.stage) {
          case 'stageOne':
            switch(spell.name) {
              case 'Dynamite!': return aliveTargets.find(recruit => !recruit.effects.find(effect => effect.name == 'Bomb'))
              case 'Hook Hand!': return true
              case 'Call Polly!': return aliveTargets.length > 0
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

export default connect(mapStateToProps)(PiratePercy)
