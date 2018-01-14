import React from 'react'
import {connect} from 'react-redux'
import {HashRouter as Router, Route, Link} from 'react-router-dom'

import Spellbook from './menuComponents/Spellbook'
import Party from './menuComponents/Party'
import Inventory from './menuComponents/Inventory'
import Dungeons from './menuComponents/Dungeons'

import BossSelection from './menuComponents/BossSelection'
import RecruitFrame from './menuComponents/RecruitFrame'
import SpellFrame from './menuComponents/SpellFrame'
import BossPreview from './menuComponents/BossPreview'
import DungeonRewards from './menuComponents/DungeonRewards'

import {getRecruits} from '../actions/recruits'
import {getSpells} from '../actions/spells'
import {getDungeons} from '../actions/dungeons'
import {getPlayerGold} from '../actions/gold'

class Menu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      townTravelModal: false
    }
    this.loadGame = this.loadGame.bind(this)
    this.goToTown = this.goToTown.bind(this)
  }
  componentDidMount() {
    this.props.dispatch(getRecruits())
    this.props.dispatch(getSpells())
    this.props.dispatch(getDungeons())
    this.props.dispatch(getPlayerGold())
  }
  loadGame() {
    const {playerParty, playerSpells} = this.props
    this.props.dispatch({type: 'LOAD_GAME', playerParty, playerSpells})
  }
  renderStartGameButton () {
    const {playerParty, playerSpells, boss} = this.props
    if (!playerParty.length == 0 && !playerSpells.length == 0 && boss) return <Link className="button is-large is-info" onClick={this.loadGame} to="/game">Start Game</Link>
    else return <Link disabled className="button is-large is-danger" to="/game">Start Game</Link>
  }
  renderMenuLink (path, display) {
    const {pathname} = this.props.location
    return <Link to={pathname == path ? '/' : path} className={`button is-large ${pathname == path ? 'is-success' : 'is-info is-outlined'}`}>{display}</Link>
  }
  goToTown() {
    this.setState({townTravelModal: false})
    this.props.dispatch({type: "TRAVEL_TO_TOWN"})
  }
  setTownModalState(townTravelModal) {
    this.setState({townTravelModal})
  }
  renderTownConfirmModal() {
    return <div className={`modal is-active`} >
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Travel to Town:</p>
          <button onClick={() => this.setTownModalState(false)} className="delete" aria-label="close"></button>
        </header>
        <section className="modal-card-body">
          <p className="subtitle is-4">If you travel to Town, you will lose all progress for your current dungeon</p>
        </section>
        <footer className="modal-card-foot has-text-centered">
          <div className="level">
            <button onClick={() => this.setTownModalState(false)} className="button is-large">Cancel</button>
            <button onClick={this.goToTown} className="button is-warning is-large">Travel Anyway</button>
          </div>
        </footer>
      </div>
      <button onClick={() => this.setTownModalState(false)} className="modal-close is-large" aria-label="close"></button>
    </div>
  }
  render() {
    const {playerParty, playerSpells, currentLocation, boss, gold} = this.props
    const {townTravelModal} = this.state
    console.log({boss});
    return <div className="section has-text-centered">
    {townTravelModal && this.renderTownConfirmModal()}
      <div className="level">
        <div className="level-left">
          {currentLocation.name != 'Town' && <button className="button is-info is-large is-outlined" onClick={() => this.setTownModalState(true)}>Travel to Town</button>}
          {currentLocation.name == 'Town' &&  this.renderMenuLink('/', 'Town')}
          {currentLocation.name == 'Town' &&  this.renderMenuLink('/dungeons', 'Dungeon Map')}
        </div>
        <p className="title is-3">Gold: {gold}</p>
        <div className="level-right">
          {currentLocation.name != 'Town'
            ? this.renderMenuLink('/party', 'Assemble Party')
            : <button className="button is-large is-info isoutlined" disabled>Assemble Party</button>
          }
          {currentLocation.name != 'Town'
            ? this.renderMenuLink('/spellbook', 'Spell Book')
            : <button className="button is-large is-info isoutlined" disabled>Choose Spells</button>
          }
          {this.renderStartGameButton()}
        </div>
      </div>
      <hr />
      <div className="columns">
        {currentLocation.name != 'Town' &&
          <div className="column" style={{overflowY: 'scroll', maxHeight: '80vh'}}>
            <p className="title is-1">{currentLocation && currentLocation.name}</p>
            <hr/>
            <DungeonRewards />
            {boss != null && <div className="has-text-centered">
              <p className="title is-3">Target:</p>
              <BossPreview i={0} boss={boss} />
            </div>}
            <BossSelection />
          </div>
        }
        <div className="column">
          <Router>
            <div>
              {currentLocation.name == 'Town' && <Route path="/dungeons" component={Dungeons} />}
              {currentLocation.name != 'Town' && <div>
                {this.props.location.pathname == '/' && <div>
                  <div className="has-text-centered">
                    <p className="subtitle is-1">Your Party: ({playerParty.length}/{currentLocation.max_party})</p>
                    <div className="columns is-multiline" style={{overflowX:'scroll'}}>
                      {playerParty.map((recruit, i) => <table key={`recruit-in-party-main-${i}`} className="column is-4 table box">
                        <RecruitFrame recruit={recruit}  />
                      </table>)}
                    </div>
                    <hr />
                  </div>
                  <div className="has-text-centered">
                    <p className="subtitle is-1">Your Spells: ({playerSpells.length}/{currentLocation.max_spells})</p>
                    <div className="columns is-multiline">
                      {playerSpells.map((spell, i) => <table key={`spell-in-bar-main-${i}`} className="column is-4 table box">
                        <SpellFrame spell={spell}  />
                      </table>)}
                    </div>
                    <hr />
                  </div>
                </div>}
                <Route path="/spellbook" component={Spellbook} />
                <Route path="/party" component={Party} />
                <Route path="/inventory" component={Inventory} />
              </div>}
            </div>
          </Router>
        </div>
      </div>
    </div>
  }
}

const mapStateToProps = ({playerParty, playerSpells, location, boss, gold}) => {
  return {
    playerParty,
    playerSpells,
    currentLocation: location,
    boss,
    gold
  }
}

export default connect(mapStateToProps)(Menu)
