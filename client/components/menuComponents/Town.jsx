import React, {Component} from 'react'
import {connect} from 'react-redux'

import RecruitmentCentre from './RecruitmentCentre'
import SecondHand from './SecondHand'
import TrainingCentre from './TrainingCentre'
import WeaponStore from './WeaponStore'

const buttonStyle = {height: '15vh', width: '45vw', margin: '1vw'}

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
      case 'Second Hand': return <SecondHand close={close} />
      case 'Training Centre': return <TrainingCentre close={close} />
      case 'Weapon Store': return <WeaponStore close={close} />
      default: return null
    }
  }
  renderTownMenuButton (name) {
    return <button onClick={() => this.toggleModal(name)} style={buttonStyle} className="column is-6 button is-large is-success is-fullwidth is-outlined is-inverted ">{name}</button>
  }
  render() {
    const {gold} = this.props
    const {showRecruitmentModal} = this.state
    return <div style={{height: '80vh'}} className="hero is-bold is-info">
      {/* <div className="hero-head has-text-centered">
      </div> */}
      <p className="title is-1">Town</p>
      {this.modalSwitch()}
      <div style={{height: '20vh'}} className="hero-body has-text-centered">
        <div className="columns is-multiline">
          {this.renderTownMenuButton('Recruitment Centre')}
          {this.renderTownMenuButton('Training Centre')}
          {this.renderTownMenuButton('Weapon Store')}
          {this.renderTownMenuButton('Second Hand')}
          <div style={buttonStyle} className="button is-large is-fullwidth is-danger is-outlined is-inverted">Logout</div>
          <div style={buttonStyle} className="button is-large is-fullwidth is-primary is-outlined is-inverted">Profile</div>
        </div>
      </div>
    </div>
  }
}

const mapStateToProps = ({gold}) => {
  return {
    gold
  }
}

export default connect(mapStateToProps)(Town)
