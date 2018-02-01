import React from 'react'
import {connect} from 'react-redux'
import {HashRouter as Router, Route, Link} from 'react-router-dom'
import Welcome from './Welcome'

import Spellbook from './menuComponents/Spellbook'
import EquipPlayerWeapon from './menuComponents/EquipPlayerWeapon'
import Party from './menuComponents/Party'
import Inventory from './menuComponents/Inventory'
import Dungeons from './menuComponents/Dungeons'
import Town from './menuComponents/Town'

import BossSelection from './menuComponents/BossSelection'
import RecruitFrame from './menuComponents/RecruitFrame'
import SpellFrame from './menuComponents/SpellFrame'
import BossPreview from './menuComponents/BossPreview'
import DungeonRewards from './menuComponents/DungeonRewards'

import {getRecruits} from '../actions/recruits'
import {getSpells} from '../actions/spells'
import {getDungeons} from '../actions/dungeons'
import {getPlayerGold} from '../actions/gold'
import {getWeapons} from '../actions/weapons'

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
    this.props.dispatch(getWeapons())
  }
  loadGame() {
    let {playerParty, playerSpells, weapons, playerWeapon, auth} = this.props
    playerParty = playerParty.map(recruit => {
      if (recruit.weapon_id) {
        let weapon = weapons.find(wep => wep.id == recruit.weapon_id)
        recruit.initHp += recruit.initHp * weapon.hp
        recruit.hp += recruit.hp * weapon.hp
        recruit.initPower += recruit.initPower * weapon.power
        recruit.power += recruit.power * weapon.power
        recruit.initSpeed += weapon.speed
        recruit.speed += weapon.speed
        recruit.weapon_name = weapon.name
        recruit.weapon_level = weapon.level
        recruit.weapon_effect = weapon.bonusEffect
      } else {
        recruit.weapon_name = null
      }
      return recruit
    })
    this.props.dispatch({type: 'LOAD_GAME', playerParty, playerSpells, playerWeapon, name: auth.user.user_name})
  }
  renderStartGameButton () {
    const {playerParty, playerSpells, boss, playerWeapon} = this.props
    if (!playerParty.length == 0 && !playerSpells.length == 0 && boss && playerWeapon) return <Link className="button is-large is-info" onClick={this.loadGame} to="/game">Start Game</Link>
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
            <Link to="/" onClick={this.goToTown} className="button is-warning is-large">Travel Anyway</Link>
          </div>
        </footer>
      </div>
      <button onClick={() => this.setTownModalState(false)} className="modal-close is-large" aria-label="close"></button>
    </div>
  }
  render() {
    const {playerParty, playerSpells, currentLocation, boss, gold, recruits, showWelcome} = this.props
    const {townTravelModal} = this.state
    return <div className="Menu has-text-centered">
      {townTravelModal && this.renderTownConfirmModal()}
      <div>
        <div className="level">
          <div className="level-left">
            {currentLocation.name != 'Town' && <button className="button is-info is-large is-outlined" onClick={() => this.setTownModalState(true)}>Travel to Town</button>}
          </div>
          <p className="title is-3">Gold: {gold}</p>
          <div className="level-right">
            {this.renderMenuLink('/playerweapon', 'Player')}
            {this.renderMenuLink('/party', 'Assemble Party')}
            {this.renderMenuLink('/spellbook', 'Spell Book')}
            {this.renderStartGameButton()}
          </div>
        </div>
        <hr />
      </div>
      <div className="columns">
        <div className="column" style={{overflowY: 'scroll', maxHeight: '80vh'}}>
          <p className="title is-1">{currentLocation && currentLocation.name}</p>
          <hr/>
          <DungeonRewards />
          {boss != null && <div className="has-text-centered">
            <p className="title is-3">Target:</p>
            <BossPreview i={0} boss={boss} />
            <hr />
          </div>}
          <BossSelection />
        </div>
        <div className="column">
          <Router>
            <div>
              <div>
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
                <Route path="/playerWeapon" component={EquipPlayerWeapon} />
              </div>
            </div>
          </Router>
        </div>
      </div>
    </div>
  }
}

const mapStateToProps = ({auth, showWelcome, playerParty, playerSpells, location, boss, gold, weapons, recruits, playerWeapon}) => {
  return {
    showWelcome,
    playerParty,
    playerSpells,
    currentLocation: location,
    boss,
    gold,
    weapons,
    recruits,
    playerWeapon,
    auth
  }
}

export default connect(mapStateToProps)(Menu)
