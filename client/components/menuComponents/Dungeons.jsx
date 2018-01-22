import React, {Component} from 'react'
import {connect} from 'react-redux'

import Dungeon from './Dungeon'

class Dungeons extends Component {
  render() {
    const {dungeons, playerParty, close} = this.props
    return <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title is-1">Dungeon Map</p>
          <button onClick={close} className="delete" aria-label="close"></button>
        </header>
        <section className="modal-card-body" style={{backgroundColor: '#DCDCDC'}}>
          <div className="has-text-centered">
            {dungeons.map((dungeon, i) => <Dungeon dungeon={dungeon} key={`dungeon-${i}`} />)}
          </div>
        </section>
        <footer className="modal-card-foot">
          <button onClick={close} className="button is-large is-info is-outlined is-fullwidth">Stay in Town</button>
        </footer>
      </div>
    </div>
  }
}

const mapStateToProps = ({dungeons, playerParty}) => {
  return {
    dungeons,
    playerParty
  }
}

export default connect(mapStateToProps)(Dungeons)
