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
import {getExperience} from '../actions/experience'

import {MenuBackground} from '../utils/dungeonInfo'


class Menu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modalView: null,
      bossPreview: false
    }
    this.loadGame = this.loadGame.bind(this)
    this.goToTown = this.goToTown.bind(this)
    this.close = this.close.bind(this)
    this.togglePreview = this.togglePreview.bind(this)
  }
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.dispatch(getRecruits())
      this.props.dispatch(getSpells())
      this.props.dispatch(getDungeons())
      this.props.dispatch(getPlayerGold())
      this.props.dispatch(getWeapons())
      this.props.dispatch(getExperience())
    } else this.props.dispatch({type: 'RECEIVE_RECRUITS', recruits: []})
  }
  togglePreview() {
    this.setState({bossPreview: !this.state.bossPreview})
  }
  readyRecruits(recruits) {
    const {weapons} = this.props
    return recruits.map(recruit => {
      if (recruit.weapon_id) {
        let weapon = weapons.find(wep => wep.id == recruit.weapon_id)
        recruit.initHp += recruit.initHp * weapon.hp
        recruit.hp += recruit.hp * weapon.hp
        recruit.initPower += recruit.initPower * weapon.power
        recruit.power += recruit.power * weapon.power
        recruit.initSpeed += weapon.speed
        recruit.speed += recruit.speed * weapon.speed
        recruit.weapon_name = weapon.name
        recruit.weapon_level = weapon.level
        recruit.weapon_effect = weapon.bonusEffect
      } else {
        recruit.weapon_name = null
      }
      return recruit
    })
  }
  loadGame() {
    let {playerParty, playerSpells, weapons, playerWeapon, auth} = this.props
    playerParty = this.readyRecruits(playerParty)
    this.props.dispatch({type: 'LOAD_GAME', playerParty, playerSpells, playerWeapon, name: auth.user.user_name})
  }
  renderStartGameButton () {
    const {playerParty, playerSpells, boss, playerWeapon} = this.props
    if (!playerParty.length == 0 && !playerSpells.length == 0 && boss && playerWeapon) return <Link className="button column is-full-width is-large is-outlined is-success" onClick={this.loadGame} to="/game">Start Game</Link>
    else return <a disabled className="button column is-fullwidth is-large is-danger">Start Game</a>
  }
  showModal(modalView) {
    this.setState({modalView})
  }
  close () {
    this.setState({modalView: null})
  }
  modalSwitch() {
    switch(this.state.modalView) {
      case 'Boss Selection': return <BossSelection close={this.close} />
      case 'Travel To Town': return this.renderTownConfirmModal()
      case 'Equip Player Weapon': return <EquipPlayerWeapon close={this.close} />
      case 'Assemble Party': return <Party close={this.close} />
      case 'Select Spells': return <Spellbook close={this.close} />
      default: return null
    }
  }
  renderMenuLink (name, icon) {
    const {pathname} = this.props.location
    return <a onClick={() => this.showModal(name)} className="button is-fullwidth is-large is-warning is-outlined">
      <span className="icon">
        <i className={`ra ${icon} ra-lg`}></i>
      </span>
      <span className="content is-large"> &nbsp;{name}&nbsp;</span>
      <span className="icon">
        <i className={`ra ${icon} ra-lg` }></i>
      </span>
    </a>
  }
  goToTown() {
    this.props.dispatch({type: "TRAVEL_TO_TOWN"})
  }
  renderTownConfirmModal() {
    return <div className={`Modal modal is-active`} >
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{this.state.modalView}</p>
          <button onClick={() => this.showModal(null)} className="delete" aria-label="close"></button>
        </header>
        <section className="modal-card-body">
          <div className="has-text-centered">
            <p className="subtitle is-4">If you travel to Town, you will lose all progress for your current dungeon</p>
            <Link to="/" onClick={this.goToTown} className="button is-warning is-outlined is-large">Travel Anyway</Link>
          </div>
        </section>
        <footer className="modal-card-foot">
          <button onClick={() => this.showModal(null)} className="button is-large is-info is-outlined is-fullwidth">Cancel</button>
        </footer>
      </div>
    </div>
  }
  render() {
    const {playerParty, playerSpells, currentLocation, boss, gold, recruits, showWelcome, playerWeapon} = this.props
    const background = MenuBackground(currentLocation.name)
    return <div className="Town Menu has-text-centered" style={{backgroundColor: background.colour, backgroundImage: `url(${background.background})`}}>
      <div className="has-text-centered Town-Banner Menu-Banner">
        <p className="title is-1"><i className={`ra ${background.icon} ra-fw`} />&nbsp; {currentLocation.name} &nbsp;<i className={`ra ${background.icon} ra-fw`} /></p>
      </div>
      {this.modalSwitch()}
      <div className="Town-Buttons Menu-Buttons">
        <div className="columns">
          <button className="button column is-fullwidth is-info is-large is-outlined" onClick={() => this.showModal('Travel To Town')}>Travel to Town</button>
          <DungeonRewards />
          {this.renderStartGameButton()}
        </div>
        <br />
        <div className="columns">
          {(!boss || !playerWeapon || playerParty.length == 0 || playerSpells == 0)
            && <div className="column">
              <p className="title is-3">To Do:</p>
              {!boss && this.renderMenuLink('Boss Selection', ' ra-on-target')}
              {!playerWeapon && this.renderMenuLink('Equip Player Weapon', 'ra-crystal-wand')}
              {!playerParty.length > 0 && this.renderMenuLink('Assemble Party', 'ra-podium')}
              {!playerSpells.length > 0 && this.renderMenuLink('Select Spells', 'ra-scroll-unfurled')}
            </div>
          }
          {(playerWeapon != null || boss != null || playerSpells.length > 0 || playerParty.length > 0) && <div className="column">
            <p className="title is-3">Done:</p>
            {boss != null && <span className="level">
              {this.renderMenuLink('Boss Selection', 'ra-on-target')}
              <BossPreview i={0} boss={boss} showMore={this.state.bossPreview} close={this.togglePreview} selectBoss={this.togglePreview} back={this.togglePreview}/>
            </span>}
            {playerWeapon && this.renderMenuLink('Equip Player Weapon', 'ra-crystal-wand')}
            {playerParty.length > 0 && this.renderMenuLink('Assemble Party', 'ra-podium')}
            {playerSpells.length > 0 && this.renderMenuLink('Select Spells', 'ra-scroll-unfurled')}
          </div>}
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
