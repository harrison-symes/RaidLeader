import React, {Component} from 'react'
import {connect} from 'react-redux'

import {recruitEquipWeapon} from '../../actions/weapons'

class RecruitModal extends Component {
  constructor(props) {
    super(props)
  }
  equip(weapon) {
    const {recruit} = this.props
    this.props.dispatch(recruitEquipWeapon(recruit, weapon))
  }
  renderWeaponFrame() {
    const {recruit, weapons, recruits} = this.props
    let weapon
    if (recruit.weapon_id) weapon = weapons.find(weapon => weapon.id == recruit.weapon_id)
    const availableWeapons = weapons.filter(other => {
      if (other == weapon) return false
      return other.class == recruit.heroClass && other.level <= recruit.level && !recruits.find(rec => rec.weapon_id == other.id)
    })
    return <div>
      {weapon
        ? <div className="box">
          <p className="title is-3">Weapon: {weapon.name} ({weapon.level})</p>
          <hr />
          <p className="subtitle is-5">{weapon.description}</p>
          <div className="columns is-multiline">
            {weapon.hp != 0 && <div className="column subtitle is-4">Health: {weapon.hp}</div>}
            {weapon.power != 0 && <div className="column subtitle is-4">Power: {weapon.power}</div>}
            {weapon.speed !== 0 && <div className="column subtitle is-4">Speed: {weapon.speed}</div>}
            {weapon.bonusEffect && <div className="subtitle is-3">Bonus: {weapon.bonusEffect}</div>}
          </div>
        </div>
        : <p className="subtitle is-2">{recruit.name} has no Weapon</p>
      }
      <hr />
      {availableWeapons.length != 0 && <div>
        <p className="title is-4">Avaiable Weapons</p>
        <div className="columns">
          {availableWeapons.map((weapon, i) => <div onClick={() => this.equip(weapon)} key={`available-weapon-${i}`}className="column is-6 box">
            <p className="title is-4">{weapon.name} ({weapon.level})</p>
            <ul className="">
              {weapon.hp != 0 && <li className="subtitle is-4">Health: {weapon.hp}</li>}
              {weapon.power != 0 && <li className="subtitle is-4">Power: {weapon.power}</li>}
              {weapon.speed != 0 && <li className="subtitle is-4">Speed: {weapon.speed}</li>}
            </ul>
            {weapon.bonusEffect && <p className="subtitle is-6">{weapon.bonusEffect}</p>}
          </div>)}
        </div>
      </div>}
    </div>
  }
  render() {
    const {recruit, close, weapons} = this.props
    return <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title is-1">{recruit.name} the {recruit.heroClass} (Level {recruit.level})</p>
          <button onClick={close} className="delete" aria-label="close"></button>
        </header>
        <section className="modal-card-body">
          <div className="title is-4">Stats</div>
          <hr />
          <div className="columns">
            <div className="column is-4"><p className="subtitle is-4">Health: {recruit.hp}</p></div>
            <div className="column is-4"><p className="subtitle is-4">Power: {recruit.power}</p></div>
            <div className="column is-4"><p className="subtitle is-4">Speed: {recruit.speed}</p></div>
          </div>
          <hr />
          {this.renderWeaponFrame()}
        </section>
        <footer className="modal-card-foot">
          <button onClick={close} className="button is-large is-info is-outlined is-fullwidth">Close</button>
        </footer>
      </div>
    </div>
  }
}

const mapStateToProps = ({playerParty, weapons, recruits}) => {
  console.log({weapons})
  return {
    playerParty,
    weapons,
    recruits
  }
}


export default connect(mapStateToProps)(RecruitModal)
