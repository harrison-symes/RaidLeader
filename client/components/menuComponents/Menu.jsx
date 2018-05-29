import React from 'react'
import {Link} from 'react-router-dom'

import Spellbook from './Spellbook'
import EquipPlayerWeapon from './EquipPlayerWeapon'
import Party from './Party'
import Inventory from './Inventory'
import Dungeons from './Dungeons'

import BossSelection from './BossSelection'
import BossPreview from './BossPreview'
import DungeonRewards from './DungeonRewards'

import {MenuBackground} from '../../utils/dungeonInfo'

export default class Menu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modalView: null,
      bossPreview: false
    }
  }

  componentDidMount = () => this.props.getAll(this.props.auth.isAuthenticated)

  togglePreview = () => this.setState({bossPreview: !this.state.bossPreview})

  loadGame = () => this.props.loadGame(this.props)

  renderStartGameButton = () => {
    const {playerParty, playerSpells, boss, playerWeapon} = this.props

    if (!playerParty.length == 0 && !playerSpells.length == 0 && boss && playerWeapon) return <Link className="button column is-full-width is-large is-outlined is-success" onClick={this.loadGame} to="/game">Start Game</Link>
    else return <a disabled className="button column is-fullwidth is-large is-danger">Start Game</a>
  }

  showModal = modalView => this.setState({modalView})

  close = () => this.setState({modalView: null})

  modalSwitch = () => {
    switch(this.state.modalView) {
      case 'Travel To Town': return this.renderTownConfirmModal()
      case 'Boss Selection': return <BossSelection close={this.close} />
      case 'Equip Player Weapon': return <EquipPlayerWeapon close={this.close} />
      case 'Assemble Party': return <Party close={this.close} />
      case 'Select Spells': return <Spellbook close={this.close} />
      default: return null
    }
  }

  renderMenuLink = (name, icon) => {
    const {pathname} = this.props.location
    return <a onClick={() => this.showModal(name)} className="button is-fullwidth is-large is-info is-outlined">
      <span className="icon">
        <i className={`ra ${icon} ra-lg`}></i>
      </span>
      <span className="content is-large"> &nbsp;{name}&nbsp;</span>
      <span className="icon">
        <i className={`ra ${icon} ra-lg` }></i>
      </span>
    </a>
  }

  goToTown = () => this.props.travelToTown()

  renderTownConfirmModal = () => (
    <div className={`Modal modal is-active`} >
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{this.state.modalView}</p>
          <button onClick={() => this.showModal(null)} className="delete" aria-label="close"></button>
        </header>
        <section className="modal-card-body">
          <div className="has-text-centered">
            <p className="subtitle is-4">If you travel to Town, you will lose all progress for your current dungeon</p>
            <Link to="/" onClick={this.goToTown} className="button is-info is-outlined is-large">Travel Anyway</Link>
          </div>
        </section>
        <footer className="modal-card-foot">
          <button onClick={() => this.showModal(null)} className="button is-large is-warning is-outlined is-fullwidth">Cancel</button>
        </footer>
      </div>
    </div>
  )

  render = () => {
    const {playerParty, playerSpells, currentLocation, boss, gold, recruits, playerWeapon} = this.props
    const background = MenuBackground(currentLocation.name)
    return <div className="Town Menu has-text-centered" style={{backgroundColor: background.colour, backgroundImage: `url(${background.background})`}}>
      <div className="has-text-centered Town-Banner Menu-Banner">
        <p className="title is-1"><i className={`ra ${background.icon} ra-fw`} />&nbsp; {currentLocation.name} &nbsp;<i className={`ra ${background.icon} ra-fw`} /></p>
      </div>
      {this.modalSwitch()}
      <div className="Town-Buttons Menu-Buttons">
        <div className="columns">
          <button className="button column is-fullwidth is-danger is-large is-outlined" onClick={() => this.showModal('Travel To Town')}>Travel to Town</button>
          <DungeonRewards />
          {this.renderStartGameButton()}
        </div>
        <br />
        <div className="columns">
          {(!boss || !playerWeapon || playerParty.length == 0 || playerSpells == 0)
            && <div className="column">
              <p className="title is-3">To Do:</p>
              {!boss && this.renderMenuLink('Boss Selection', ' ra-targeting')}
              {!playerWeapon && this.renderMenuLink('Equip Player Weapon', 'ra-switch-weapon')}
              {!playerParty.length > 0 && this.renderMenuLink('Assemble Party', 'ra-three-friends')}
              {!playerSpells.length > 0 && this.renderMenuLink('Select Spells', 'ra-spell-book')}
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
