import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import {logoutUser} from '../../actions/logout'

import RecruitmentCentre from './RecruitmentCentre'
import Library from './Library'
import TrainingCentre from './TrainingCentre'
import Dungeons from './Dungeons'
import WeaponStore from './WeaponStore'

const buttonStyle = {height: '10vh', width: '45vw', margin: '1vw'}

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
      case 'Weapon Store': return <WeaponStore close={close} />
      case 'Dungeon Map': return <Dungeons close={close} />
      default: return null
    }
  }
  renderTownMenuButton (name) {
    return <button onClick={() => this.toggleModal(name)} style={buttonStyle} className="column is-6 button is-large is-dark is-outlined is-fullwidth ">{name}</button>
  }
  render() {
    const {gold, recruits, spellBook} = this.props
    const {showRecruitmentModal} = this.state
    return <div style={{margin: '0'}}>
      <div className="hero-head has-text-centered">
        <p className="title is-1">Town</p>
        <div className="columns">
          <div className="column is-4">
            <p className="subtitle is-4">Spells Learnt: {spellBook.length}</p>
          </div>
          <div className="column is-4">
            <p className="subtitle is-4">Gold: {gold}</p>
          </div>
          <div className="column is-4">
            <p className="subtitle is-4">Recuits: {recruits.length}</p>
          </div>
        </div>

      </div>
      {this.modalSwitch()}
      <div className="hero-body is-fullheight has-text-centered">
        <button onClick={() => this.toggleModal('Dungeon Map')} style={{height: '15vh', width: '45vw', margin: 'auto', marginBottom: '2vw'}} className="button is-large is-fullwidth is-inverted is-light">Travel</button>
        <div className="columns">
          {this.renderTownMenuButton('Recruitment Centre')}
          {this.renderTownMenuButton('Library')}
        </div>
        <div className="columns">
          {this.renderTownMenuButton('Training Centre')}
          <button disabled style={buttonStyle} className="column is-6 button is-large is-dark is-fullwidth is-outlined">Store (WIP)</button>
        </div>
        <div className="columns">
          <Link to="/" style={buttonStyle} className="button is-large is-fullwidth is-danger is-outlined" onClick={() => this.props.dispatch(logoutUser())}>Logout</Link>
          <div style={buttonStyle} disabled className="button is-large is-fullwidth is-dark is-outlined">Profile (WIP)</div>
        </div>
      </div>
    </div>
  }
}

const mapStateToProps = (state) => {
  const {gold, recruits, spellBook} = state
  return {
    gold, recruits, spellBook
  }
}

export default connect(mapStateToProps)(Town)
