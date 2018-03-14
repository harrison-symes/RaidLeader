import React from 'react'
import {connect} from 'react-redux'

import BossSpells from './BossSpells'

const BossSpellBar = ({dispatch, boss}) => {
  return <div className="columns is-mobile BossSpellBar has-text-centered">
    {boss.spells.map((spell, i) => <BossSpells key={`${spell.name}_${i}`} spell={spell} />)}
  </div>
}

const mapStateToProps = ({boss}) => {
  return ({boss})
}

export default connect(mapStateToProps)(BossSpellBar)
