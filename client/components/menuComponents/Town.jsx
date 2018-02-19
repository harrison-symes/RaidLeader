import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import {logoutUser} from '../../actions/logout'

import RecruitmentCentre from './RecruitmentCentre'
import Library from './Library'
import TrainingCentre from './TrainingCentre'
import Dungeons from './Dungeons'
import BlackMarket from './BlackMarket'

import {GoldIcon, RecruitCountIcon, SpellCountIcon} from '../icons/StatIcons'

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
      case 'Recruitment Centre': return <RecruitmentCentre close={close} />
      case 'Library': return <Library close={close} />
      case 'Training Centre': return <TrainingCentre close={close} />
      case 'Black Market': return <BlackMarket close={close} />
      case 'Dungeon Map': return <Dungeons close={close} />
      default: return null
    }
  }
  renderTownMenuButton (name, icon, required) {
    var closed
    if (required) closed = !this.props.dungeons.find(dungeon => dungeon.name == required && dungeon.isCompleted)
    return <a disabled={closed} title={closed ? `Complete ${required}`: name} onClick={() => this.toggleModal(name)} className="column is-6 button is-large is-warning is-outlined">
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
    const {gold, recruits, spellBook} = this.props
    const {showRecruitmentModal} = this.state
    return <div className="Town">
      <div className="has-text-centered Town-Banner">
          <p className="title is-1"> <i className="ra  ra-heart-tower ra-fw" /> Town <i className="ra ra-heart-tower ra-fw" /></p>
        <div className="level has-text-centered Resources">
          <div className=" is-4">
            <div className="subtitle is-2">
              <SpellCountIcon amount={spellBook.length} />
            </div>
          </div>
          <div className=" is-4">
            <p className="subtitle is-2"><GoldIcon value={gold} /></p>
          </div>
          <div className=" is-4">
            <p className="subtitle is-2">
              <RecruitCountIcon amount={recruits.length} />
            </p>
          </div>
        </div>

      </div>
      {this.modalSwitch()}
      <div className="Town-Buttons has-text-centered">
        <a onClick={() => this.toggleModal('Dungeon Map')} className="Travel-Button button is-large is-fullwidth is-primary is-outlined">
          <span className="icon is-large">
            <i className={`ra ra-forward ra-lg` }></i>
          </span>
          <span>&nbsp;Travel&nbsp;</span>
          <span className="icon is-large">
            <i className={`ra ra-forward ra-lg` }></i>
          </span>
        </a>

        <div className="columns Town-Button-Div">
          {this.renderTownMenuButton('Recruitment Centre', 'ra-guarded-tower', 'The Hunt')}
          {this.renderTownMenuButton('Library', 'ra-crystal-ball', 'The Hunt')}
        </div>
        <div className="columns Town-Button-Div">
          {this.renderTownMenuButton('Training Centre', 'ra-muscle-up', 'The Cursed Wilds')}
          {this.renderTownMenuButton('Black Market', 'ra-pawn', 'The Cursed Wilds')}
        </div>
        <div className="columns Town-Button-Div">
          <Link to="/" className="button is-large is-fullwidth is-danger is-outlined" onClick={() => this.props.dispatch(logoutUser())}>
            <span className="icon is-large">
              <i className={`ra ra-turd ra-lg` }></i>
            </span>
            <span>&nbsp;Logout&nbsp;</span>
            <span className="icon is-large">
              <i className={`ra ra-turd ra-lg` }></i>
            </span>
          </Link>
          <div disabled className="button is-large is-fullwidth is-dark is-outlined">Profile (WIP)</div>
        </div>
      </div>
    </div>
  }
}

const mapStateToProps = (state) => {
  const {gold, recruits, spellBook, dungeons} = state
  return {
    gold, recruits, spellBook, dungeons
  }
}

export default connect(mapStateToProps)(Town)
