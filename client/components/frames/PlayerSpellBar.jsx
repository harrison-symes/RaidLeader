import React from 'react'
import {connect} from 'react-redux'

import PlayerSpell from './PlayerSpell'

const PlayerSpellBar = ({spells, selectedSpell, dispatch}) => {

  return <div className="columns is-multiline PlayerSpellBar has-text-centered">
    {spells.map((spell, i) => <PlayerSpell key={`spell-bar-item-${i}`} spell={spell} idx={i + 1}/>)}
  </div>
}


export default connect()(PlayerSpellBar)
