import React, {Component} from 'react'
import {connect} from 'react-redux'

import Dungeon from './Dungeon'


import {getRecruits} from '../../actions/recruits'
import {getSpells} from '../../actions/spells'
import {getDungeons} from '../../actions/dungeons'
import {getPlayerGold} from '../../actions/gold'
import {getWeapons} from '../../actions/weapons'

class Dungeons extends Component {
  componentDidMount() {
    this.props.dispatch(getRecruits())
    this.props.dispatch(getSpells())
    this.props.dispatch(getDungeons())
    this.props.dispatch(getPlayerGold())
    this.props.dispatch(getWeapons())
  }
  render() {
    const {dungeons, playerParty, close} = this.props
    console.log({dungeons});
    return <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title is-1">Dungeon Map</p>
          <button onClick={close} className="delete" aria-label="close"></button>
        </header>
        <section className="modal-card-body">
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
