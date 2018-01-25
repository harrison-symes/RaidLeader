import React from 'react'
import {connect} from 'react-redux'

import mapStateToProps from './utils/bossStateMap'
import BossFrame from '../frames/BossFrame'

class PlaguePiltherer extends BossFrame {
  constructor(props) {
    super(props)
  }
  solveSpell(spells, boss) {
    let castSpell = spells.find(spell => {
      if (!spell.onCooldown && spell.cost <= boss.mana) {
        switch (spell.name) {
          case 'Ingest Plague': return boss.power == 0
          case 'Spread Plague': return boss.power == 5 && this.props.party.filter(member => member.isAlive).length > 0
          case 'Regenerate': return boss.hp < boss.initHp - spell.health || boss.armor < boss.initArmor - spell.armor
          case 'Ravage': return true
          default: return false
        }
      } else return false
    })
    return castSpell
  }
}

export default connect(mapStateToProps)(PlaguePiltherer)
