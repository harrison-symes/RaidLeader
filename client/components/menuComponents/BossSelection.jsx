import React from 'react'
import {connect} from 'react-redux'

import BossPreview from './BossPreview'

const BossSelection = ({currentLocation}) => {
  const defeated = currentLocation.bosses.filter(boss => boss.isDefeated)
  const bosses = currentLocation.bosses.filter(boss => !boss.isDefeated)
  return <div className="has-text-centered" id="bossModalID">
    {currentLocation.bosses.map((boss, i) => <i className={`title has-text-${i + 1 <= defeated.length ? 'success' : 'danger'} is-2 icon ${i + 1 <= defeated.length ? 'ra-broken-skull' : 'ra-skull'} ra ra-fw`} />)}
    {defeated.length > 0 && <div>
      {bosses.length && <p className="title is-3">Defeated: </p>}
      {defeated.length && <p className="title is-3">Bosses Remaining: </p>}
    </div>}
    {defeated.map((boss, i) => <BossPreview key={'boss-preview-'+i} boss={boss} i={i} />)}
    {bosses.length && <p className="title is-3">Bosses Remaining: </p>}
    {bosses.map((boss, i) => <BossPreview key={'boss-preview-'+i} boss={boss} i={i} />)}
  </div>
}

const mapStateToProps = ({location}) => {
  return {
    currentLocation: location
  }
}


export default connect(mapStateToProps)(BossSelection)
