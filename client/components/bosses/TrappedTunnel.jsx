import React from 'react'
import {connect} from 'react-redux'

import mapStateToProps from './utils/bossStateMap'
import BossFrame from '../frames/BossFrame'

class TrappedTunnel extends BossFrame {
  constructor(props) {
    super(props)
  }
  solveSpell(spells, boss) {
    let castSpell = spells.filter(spell => {
      if (!spell.onCooldown && spell.cost <= boss.mana) {
        switch(boss.stage) {
          case 'stageZero': return true
          case 'stageOne':
            switch(spell.name) {
              case 'Next Room': return boss.mana >= spell.manaRequired
              case 'Crushing Walls': return this.props.party.filter(recruit => recruit.isAlive).length > 0
              case 'Dart Trap': return this.props.party.filter(recruit => recruit.isAlive && recruit.hp / recruit.initHp > 0.5).length > 0
              case 'Snake Trap': return this.props.party.filter(recruit => recruit.isAlive && recruit.hp / recruit.initHp > 0.5).length > 0
              default: return null
            }
          case 'stageTwo':
            switch(spell.name) {
              case 'Next Room': return boss.mana >= spell.manaRequired
              case 'Crumbling Walls': return this.props.party.filter(recruit => recruit.isAlive).length > 0
              case 'Snake Trap': return this.props.party.filter(recruit => recruit.isAlive && recruit.hp / recruit.initHp > 0.5).length > 0
              case 'Spike Trap': return this.props.party.filter(recruit => recruit.isAlive && recruit.hp / recruit.initHp <= 0.2).length > 0
              default: return null
            }
          case 'stageThree':
            switch(spell.name) {
              case 'Escape!': return boss.mana >= spell.manaRequired
              case 'Dart Trap': return this.props.party.filter(recruit => recruit.isAlive && recruit.hp / recruit.initHp > 0.5).length > 0
              case 'Snake Trap': return this.props.party.filter(recruit => recruit.isAlive && recruit.hp / recruit.initHp > 0.5).length > 0
              case 'Spike Trap': return this.props.party.filter(recruit => recruit.isAlive && recruit.hp / recruit.initHp <= 0.2).length > 0

              default: return null
            }
          default: return null
        }
      } else return false
    })[0]
    return castSpell
  }
}

export default connect(mapStateToProps)(TrappedTunnel)
