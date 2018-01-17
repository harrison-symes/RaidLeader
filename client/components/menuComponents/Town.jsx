import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import {logoutUser} from '../../actions/logout'

import RecruitmentCentre from './RecruitmentCentre'
import Library from './Library'
import TrainingCentre from './TrainingCentre'
import Dungeons from './Dungeons'
import WeaponStore from './WeaponStore'

const buttonStyle = {height: '14vh', width: '45vw', margin: '1vw'}

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
    return <button onClick={() => this.toggleModal(name)} style={buttonStyle} className="column is-6 button is-large is-success is-fullwidth is-outlined is-inverted ">{name}</button>
  }
  render() {
    const {gold, recruits, spellBook} = this.props
    const {showRecruitmentModal} = this.state
    return <div style={{height: '89vh', margin: '0'}} className="hero is-bold is-primary">
      <div className="hero-head has-text-centered">
        <p className="title is-1">Town</p>
        <div className="columns">
          <div className="column is-4">
            <p className="subtitle is-2">Spells Learnt: {spellBook.length}</p>
          </div>
          <div className="column is-4">
            <p className="subtitle is-2">Gold: {gold}</p>
          </div>
          <div className="column is-4">
            <p className="subtitle is-2">Recuits: {recruits.length}</p>
          </div>
        </div>

      </div>
      {this.modalSwitch()}
      <div className="hero-body is-fullheight has-text-centered">
        <button onClick={() => this.toggleModal('Dungeon Map')} style={{height: '15vh', width: '45vw', margin: 'auto', marginBottom: '2vw'}} className="button is-large is-fullwidth is-outlined is-warning">Travel</button>
        <div className="columns is-multiline">
          {this.renderTownMenuButton('Recruitment Centre')}
          {this.renderTownMenuButton('Library')}
          <button disabled style={buttonStyle} className="column is-6 button is-large is-success is-fullwidth is-outlined is-inverted ">Training (WIP)</button>
          <button disabled style={buttonStyle} className="column is-6 button is-large is-success is-fullwidth is-outlined is-inverted ">Store (WIP)</button>
          {/* {this.renderTownMenuButton('Training Centre')}
          {this.renderTownMenuButton('Weapon Store')} */}
          <Link to="/" style={buttonStyle} className="button is-large is-fullwidth is-danger is-outlined is-inverted" onClick={() => this.props.dispatch(logoutUser())}>Logout</Link>
          <div style={buttonStyle} disabled className="button is-large is-fullwidth is-primary is-outlined is-inverted">Profile (WIP)</div>
        </div>
      </div>
    </div>
  }
}

const mapStateToProps = ({gold, recruits, spellBook}) => {
  return {
    gold, recruits, spellBook
  }
}

export default connect(mapStateToProps)(Town)
