import React from 'react'
import {connect} from 'react-redux'

import BossSpells from './BossSpells'

const BossSpellBar = ({spells, dispatch, bossCount}) => {
  return <div className="columns PlayerSpellBar has-text-centered">
    {spells.map((spell, i) => <BossSpells key={`${i}_${bossCount}`} spell={spell} />)}
  </div>
}

const mapStateToProps = ({bossCount}) => ({bossCount})

export default connect(mapStateToProps)(BossSpellBar)
