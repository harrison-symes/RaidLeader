import React from 'react'
import {connect} from 'react-redux'

import BossSpells from './BossSpells'

const BossSpellBar = ({spells, dispatch}) => {
  return <div className="columns PlayerSpellBar has-text-centered">
    {spells.map((spell, i) => <BossSpells key={`boss-spell-bar-item-${i}`} spell={spell} />)}
  </div>
}


export default connect()(BossSpellBar)
