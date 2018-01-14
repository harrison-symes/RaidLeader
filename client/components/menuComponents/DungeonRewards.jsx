import React, {Component} from 'react'
import {connect} from 'react-redux'

import BossPreview from './BossPreview'

class DungeonRewards extends Component {
  render() {
    const {currentLocation} = this.props
    const bossesDefeated = currentLocation.bosses.filter(boss => boss.isDefeated)
    return <div className="has-text-centered">
      <p className="title is-3">Dungeon Progress:</p>
      <hr />
      <p className="subtitle is-3">Bosses Defeated: {bossesDefeated.length} / {currentLocation.bosses.length}</p>
      {bossesDefeated == currentLocation.bosses.length && <div>
        <div className="button is-large is-primary is-fullwidth">Collect Rewards</div>
      </div>}
      {bossesDefeated.map(boss => <BossPreview boss={boss} i={0} />)}
      <hr />
    </div>
  }
}

const mapStateToProps = ({location}) => {
  return {
    currentLocation: location
  }
}

export default connect(mapStateToProps)(DungeonRewards)
