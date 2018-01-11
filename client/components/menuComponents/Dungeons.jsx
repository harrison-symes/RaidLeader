import React from 'react'
import {connect} from 'react-redux'

import Dungeon from './Dungeon'

const Dungeons = ({dungeons, playerParty}) => {
  let partyLevel = 1
  playerParty.forEach(member => {
    if (member.level > partyLevel) partyLevel = member.level
  })
  return <div>
    <div className="level">
      <p style={{float: 'left'}} className="title is-1">Dungeons:</p>
      <p style={{float: 'right'}} className="subtitle is-1">Party Level ({partyLevel})</p>
    </div>
    <hr />
    <div className="has-text-centered" style={{overflowY: 'scroll', maxHeight: '70vh'}}>
      {dungeons.map((dungeon, i) => <Dungeon dungeon={dungeon} partyLevel={partyLevel} key={`dungeon-${i}`} />)}
    </div>
  </div>
}

const mapStateToProps = ({dungeons, playerParty}) => {
  return {
    dungeons,
    playerParty
  }
}

export default connect(mapStateToProps)(Dungeons)
