import React from 'react'
import {connect} from 'react-redux'

import Dungeon from './Dungeon'

const Dungeons = ({dungeons}) => {
  return <div>
    <p className="subtitle is-1">Dungeons:</p>
    <div className="has-text-centered" style={{overflowY: 'scroll', maxHeight: '70vh'}}>
      {dungeons.map((dungeon, i) => <Dungeon dungeon={dungeon} key={`dungeon-${i}`} />)}
    </div>
  </div>
}

const mapStateToProps = ({dungeons}) => {
  return {
    dungeons
  }
}

export default connect(mapStateToProps)(Dungeons)
