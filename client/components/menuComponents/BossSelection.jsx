import React from 'react'
import {connect} from 'react-redux'

import BossPreview from './BossPreview'

const BossSelection = ({currentLocation}) => {
  const defeated = currentLocation.bosses.filter(boss => boss.isDefeated)
  const bosses = currentLocation.bosses.filter(boss => !boss.isDefeated)
  return <div className={`Modal modal is-active`} >
    <div className="modal-background"></div>
    <div className="modal-card">
      <header className="modal-card-head">
        <p className="modal-card-title">{this.state.modalView}</p>
        <button onClick={() => this.showModal(null)} className="delete" aria-label="close"></button>
      </header>
      <section className="modal-card-body">
        <div className="has-text-centered" id="bossModalID">
          {currentLocation.bosses.map((boss, i) => <i className={`title has-text-${i + 1 <= defeated.length ? 'success' : 'danger'} is-2 icon ${i + 1 <= defeated.length ? 'ra-broken-skull' : 'ra-skull'} ra ra-fw`} />)}
          {defeated.length > 0 && <div>
            {bosses.length && <p className="title is-3">Defeated: </p>}
            {defeated.map((boss, i) => <BossPreview key={'boss-preview-'+i} boss={boss} i={i} />)}
            <br />
          </div>}
          {bosses.length && <p className="title is-3">Bosses Remaining: </p>}
          {bosses.map((boss, i) => <BossPreview key={'boss-preview-'+i} boss={boss} i={i} />)}
        </div>
      </section>
      <footer className="modal-card-foot">
        <button onClick={() => this.showModal(null)} className="button is-large is-info is-outlined is-fullwidth">Cancel</button>
      </footer>
    </div>
  </div>
}

const mapStateToProps = ({location}) => {
  return {
    currentLocation: location
  }
}


export default connect(mapStateToProps)(BossSelection)
