import React from 'react'
import {connect} from 'react-redux'

import mapStateToProps from './utils/bossStateMap'
import BossFrame from '../frames/BossFrame'

class BossTwo extends BossFrame {
  constructor(props) {
    super(props)
  }
  solveSpell(spells, boss) {
    let castSpell = spells.filter(spell => {
      if (!spell.onCooldown && spell.cost <= boss.mana) {
        switch (spell.name) {
          case 'Protect':
            return (boss.armor <= boss.initArmor - spell.powerRatio)
          case 'Spit':
            return !this.props.party.find(member => member.isAlive)
          case 'Swipe': return this.props.party.find(member => member.isAlive)
          default: return false
        }
      } else return false
    })[0]
    return castSpell
  }
}

export default connect(mapStateToProps)(BossTwo)
