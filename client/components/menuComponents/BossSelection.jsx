import React from 'react'
import {connect} from 'react-redux'

import BossPreview from './BossPreview'

const BossSelection = ({currentLocation}) => {
  const {bosses} = currentLocation
  return <div className="has-text-centered" id="bossModalID">
    <p className="subtitle is-3">Bosses Remaining: </p>
    {bosses.filter(boss => !boss.isDefeated).map((boss, i) => <BossPreview key={'boss-preview-'+i} boss={boss} i={i} />)}
  </div>
}

const mapStateToProps = ({location}) => {
  return {
    currentLocation: location
  }
}


export default connect(mapStateToProps)(BossSelection)
