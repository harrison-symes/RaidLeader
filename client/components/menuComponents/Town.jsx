import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import {logoutUser} from '../../actions/logout'

import {get, set} from '../../utils/localstorage'

import RecruitmentCentre from './RecruitmentCentre'
import Library from './Library'
import TrainingCentre from './TrainingCentre'
import MageTower from './MageTower'
import Dungeons from './Dungeons'
import BlackMarket from './BlackMarket'
import MyRecruits from './MyRecruits'
import MySpells from './MySpells'

import {GoldIcon, RecruitCountIcon, SpellCountIcon, GemIcon} from '../icons/StatIcons'

class Town extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: null
    }
  }
  toggleModal(menu) {
    this.setState({showModal: menu})
  }
  modalSwitch() {
    const {showModal} = this.state
    let close = () => this.toggleModal(null)
    close = close.bind(this)
    switch (showModal) {
      case 'Logout': return this.renderLogoutConfirmModal()
      case 'Recruitment Centre': return <RecruitmentCentre close={close} />
      case 'Library': return <Library close={close} />
      case 'Training Centre': return <TrainingCentre close={close} />
      case 'Mage Tower': return <MageTower close={close} />
      case 'Black Market': return <BlackMarket close={close} />
      case 'Dungeon Map': return <Dungeons close={close} />
      case 'My Recruits': return <MyRecruits close={close} />
      case 'My Spells': return <MySpells close={close} />
      default: return null
    }
  }
  renderLogoutConfirmModal() {
    let recruitsPending = !!JSON.parse(get('offeredRecruits'))
    let spellsPending = !!JSON.parse(get('offeredSpells'))

    return <div className={`Modal modal is-active`} >
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Logout</p>
          <button onClick={() => this.toggleModal(null)} className="delete" aria-label="close"></button>
        </header>
        <section className="modal-card-body">
          <div className="has-text-centered">
            {(recruitsPending || spellsPending )
              ? <div>
                {recruitsPending && <p className="subtitle is-2">You still have some Recruits waiting at the Recruitment Centre!</p>}
                {spellsPending && <p className="subtitle is-2">You still have some Spells waiting at the Library!</p>}
              </div>
              : <div className="has-text-centered">
                <p className="subtitle is-2">Make sure you don't forget your password!</p>
                <span className="columns">
                  <button to="/" onClick={() => this.toggleModal(null)} className="column is-9 button is-primary is-outlined is-large">Stay</button>
                  <Link to="/" onClick={() => this.props.dispatch(logoutUser())} className="column is-3 button is-fullwidth is-danger is-outlined is-large">(Logout)</Link>
                </span>
              </div>
            }
          </div>
        </section>
        <footer className="modal-card-foot">
          <button onClick={() => this.toggleModal(null)} className="button is-large is-warning is-outlined is-fullwidth">Cancel</button>
        </footer>
      </div>
    </div>
  }
  renderTownMenuButton (name, icon, required) {
    var closed
    if (required) closed = !this.props.dungeons.find(dungeon => dungeon.name == required && dungeon.isCompleted)
    return <a disabled={closed} title={closed ? `Complete ${required}`: name} onClick={() => closed ? null : this.toggleModal(name)} className="column is-6 button is-large is-info is-outlined">
      <span className="icon is-large">
        <i className={`ra ${icon} ra-lg`}></i>
      </span>
      &nbsp;{name}&nbsp;
      <span className="icon is-large">
        <i className={`ra ${icon} ra-lg` }></i>
      </span>
    </a>
  }
  render() {
    const {gold, recruits, spellBook, gems} = this.props
    const {showRecruitmentModal} = this.state
    return <div className="Town">
      <div className="has-text-centered Town-Banner">
          <p className="title is-1"> <i className="ra  ra-heart-tower ra-fw" /> Town <i className="ra ra-heart-tower ra-fw" /></p>
        <div className="level has-text-centered Resources">
          <div className="button is-outlined is-light Info-Button is-3" style={{cursor: 'pointer'}}>
            <div className="subtitle is-2" onClick={()=>this.toggleModal('My Spells')}>
              <SpellCountIcon amount={spellBook.length} />
            </div>
          </div>
          <div className="is-3">
            <p className="subtitle is-2"><GoldIcon value={gold} /></p>
          </div>
          <div className="is-3">
            <p className="subtitle is-2"><GemIcon value={gems} /></p>
          </div>
          <div className="button is-outlined is-light Info-Button is-3" style={{cursor: 'pointer'}}>
            <p className="subtitle is-2" onClick={()=>this.toggleModal('My Recruits')}>
              <RecruitCountIcon amount={recruits.length} />
            </p>
          </div>
        </div>

      </div>
      {this.modalSwitch()}
      <div className="Town-Buttons has-text-centered">
        <a onClick={() => this.toggleModal('Dungeon Map')} className="Travel-Button button is-large is-fullwidth is-primary is-outlined">
          <span className="icon is-large">
            <i className={`ra ra-magic-portal ra-lg` }></i>
          </span>
          <span>&nbsp;Travel&nbsp;</span>
          <span className="icon is-large">
            <i className={`ra ra-magic-portal ra-lg` }></i>
          </span>
        </a>

        <div className="columns Town-Button-Div">
          {this.renderTownMenuButton('Recruitment Centre', 'ra-barracks', 'The Hunt')}
          {this.renderTownMenuButton('Library', 'ra-gift-of-knowledge', 'The Hunt')}
        </div>
        <div className="columns Town-Button-Div">
          {this.renderTownMenuButton('Training Centre', 'ra-military-fort', 'The Cursed Wilds')}
          {this.renderTownMenuButton('Mage Tower', 'ra-crystal-ball', 'The Hunt')}
        </div>
        <div className="columns Town-Button-Div">
          <a title={"Don't do it!"} onClick={() => this.toggleModal('Logout')} className="column is-6 button is-large is-danger is-outlined">
            <span className="icon is-large">
              <i className={`ra ra-exit-door ra-lg`}></i>
            </span>
            &nbsp;Logout&nbsp;
            <span className="icon is-large">
              <i className={`ra ra-exit-door ra-lg` }></i>
            </span>
          </a>
          {this.renderTownMenuButton('Black Market', 'ra-receive-money', 'The Cursed Wilds')}

        </div>
      </div>
      <Link to="/new" className="button is-large is-fullwidth is-primary Info-Button is-outlined is-inverted">
        <span><i className="ra ra-scroll-unfurled ra-lg" /></span>
          <span>&nbsp;What's New?&nbsp;</span>
        <span><i className="ra ra-scroll-unfurled ra-lg" /></span>
      </Link>
    </div>
  }
}

const mapStateToProps = (state) => {
  const {gold, recruits, spellBook, dungeons, gems} = state
  return {
    gold,
    recruits,
    spellBook,
    dungeons,
    gems
  }
}

export default connect(mapStateToProps)(Town)
