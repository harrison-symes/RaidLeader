import React, {Component} from 'react'
import {connect} from 'react-redux'

import Dungeon from './Dungeon'

import {getRecruits} from '../../actions/recruits'
import {getSpells} from '../../actions/spells'
import {getDungeons} from '../../actions/dungeons'
import {getPlayerGold} from '../../actions/gold'
import {getWeapons} from '../../actions/weapons'

class Dungeons extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: null,
      allowed: false
    }
    this.selectDungeon = this.selectDungeon.bind(this)
  }
  selectDungeon(selected, allowed) {
    this.setState({selected, allowed})
  }
  componentDidMount() {
    this.props.dispatch(getRecruits())
    this.props.dispatch(getSpells())
    this.props.dispatch(getDungeons())
    this.props.dispatch(getPlayerGold())
    this.props.dispatch(getWeapons())
  }
  travel() {
    this.props.dispatch({type: 'TRAVEL_TO_DUNGEON', dungeon: this.state.selected})
  }
  render() {
    const {dungeons, playerParty, close} = this.props
    const {selected, allowed} = this.state
    return <div className="Modal modal is-active">
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title is-1">Dungeon Map</p>
          <button onClick={close} className="delete" aria-label="close"></button>
        </header>
        <section className="modal-card-body">
          <div className="has-text-centered">
            {dungeons.map((dungeon, i) => <Dungeon selected={this.state.selected} selectDungeon={this.selectDungeon} dungeon={dungeon} key={`dungeon-${i}`} />)}
          </div>
        </section>
        <footer className="modal-card-foot">
          <a onClick={close} className="button is-large is-dark is-outlined is-fullwidth">
            <span>Stay in Town&nbsp;</span>
            <span className="icon is-large">
              <i className={`ra ra-bottom-right ra-lg` }></i>
            </span>
          </a>
          {selected && allowed && <a onClick={()=>this.travel()} className="button is-large is-outlined is-primary is-fullwidth">Travel Here&nbsp;<i className="icon ra ra-compass" /></a>}
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
