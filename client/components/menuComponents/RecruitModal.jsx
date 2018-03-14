import React, {Component} from 'react'
import {connect} from 'react-redux'

import {recruitEquipWeapon} from '../../actions/weapons'
import {startingBuff, classTraits} from '../../utils/classText'
import {HealthIcon, PowerIcon, SpeedIcon, ZodiacIcon, LevelIcon} from '../icons/StatIcons'


class RecruitModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      weaponFrame: false
    }
    this.toggleWeaponFrame = this.toggleWeaponFrame.bind(this)
  }
  equip(id) {
    const {recruit} = this.props
    this.props.dispatch(recruitEquipWeapon(recruit, id))
    this.setState({weaponFrame: false})
  }
  toggleWeaponFrame() {
    this.setState({weaponFrame: !this.state.weaponFrame})
  }
  renderWeaponFrame() {
    const {recruit, weapons, recruits} = this.props
    let weapon
    if (recruit.weapon_id) weapon = weapons.find(weapon => weapon.id == recruit.weapon_id)
    const availableWeapons = weapons.filter(other => {
      if (other == weapon) return false
      return other.class == recruit.heroClass && other.level <= recruit.level && !recruits.find(rec => rec.weapon_id == other.id)
    })
    return <div className="">
      <div className="box">
        {weapon
          ? <div className="">
            <p className="title is-3">Equipped: {weapon.name}</p>
            <button onClick={() => this.equip(null)} className="delete" aria-label="close"></button>
            <p className="subtitle is-5">{weapon.description}</p>
            <div className="columns is-multiline">
              {weapon.hp != 0 && <div className="column subtitle is-4"><HealthIcon value={`${weapon.hp > 0 ? "+": ""}${weapon.hp * 100}%`}/></div>}
              {weapon.power != 0 && <div className="column subtitle is-4"><PowerIcon value={`${weapon.power > 0 ? "+": ""}${weapon.power * 100}%`} /></div>}
              {weapon.speed !== 0 && <div className="column subtitle is-4"><SpeedIcon value={`${weapon.speed > 0 ? "+": ""}${weapon.speed * 100}%`}/> </div>}
            </div>
            {weapon.bonusEffect && <div className="content is-large box">Bonus: {weapon.effectDescription}</div>}
          </div>
          : <p className="subtitle is-2">{recruit.name} has no Weapon</p>
        }
        {availableWeapons.length != 0 && <button className="button is-large is-info" onClick={this.toggleWeaponFrame}>{this.state.weaponFrame ? "Close":weapon ? 'Change Weapon' :"Equip A Weapon"}</button>}
      </div>
      <hr />
      {this.state.weaponFrame && this.weaponFrame()}
    </div>
  }
  weaponFrame() {
    let {recruit, weapons, recruits} = this.props
    let weapon
    if (recruit.weapon_id) weapon = weapons.find(weapon => weapon.id == recruit.weapon_id)
    let availableWeapons = weapons.filter(other => {
      if (other == weapon) return false
      return other.class == recruit.heroClass && other.level <= recruit.level && !recruits.find(rec => rec.weapon_id == other.id)
    })
    let dup = availableWeapons.reduce((obj, weapon) => {
      obj[weapon.name] = weapon
      return obj
    }, {})
    availableWeapons=Object.keys(dup).map(key => dup[key])
    return <div>
      <p className="title is-4">Avaiable Weapon{availableWeapons.length > 1 ? 's' : ''}</p>
      <div className="">
        {availableWeapons.map((weapon, i) => <div key={`available-weapon-${i}`} className="box">
          <p className="title is-4">{weapon.name}</p>
          <ul className="">
            {weapon.hp != 0 && <li className="subtitle is-4"><HealthIcon value={`${weapon.hp > 0 ? "+": ""}${weapon.hp * 100}%`}/></li>}
            {weapon.power != 0 && <li className="subtitle is-4"><PowerIcon value={`${weapon.power > 0 ? "+": ""}${weapon.power * 100}%`}/></li>}
            {weapon.speed != 0 && <li className="subtitle is-4"><SpeedIcon value={`${weapon.speed > 0 ? "+": ""} ${weapon.speed * 100}%`} /></li>}
          </ul>
          {weapon.bonusEffect && <p className="content is-large box">{weapon.effectDescription}</p>}
          <button className="button Info-Button is-success" onClick={() => this.equip(weapon.id)}>Equip</button>
        </div>)}
      </div>
    </div>
  }
  render() {
    const {recruit, close, weapons} = this.props
    return <div className="Modal modal is-active">
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title is-1">{recruit.name} the {recruit.heroClass} <LevelIcon level={recruit.level} /></p>
          <button onClick={close} className="delete" aria-label="close"></button>
        </header>
        <section className="modal-card-body">
          <div className="box">
            <div className="title is-4">Stats</div>
            <div className="columns box">
              <div className="column is-4"><p className="subtitle is-4"><HealthIcon value={recruit.hp}/></p></div>
              <div className="column is-4"><p className="subtitle is-4"><PowerIcon value={recruit.power} /></p></div>
              <div className="column is-4"><p className="subtitle is-4"><SpeedIcon value={recruit.speed} /></p></div>
            </div>
            <span className="subtitle is-1"><ZodiacIcon zodiac={recruit.zodiac} isLarge={true}/></span>
            <hr />
            {this.renderWeaponFrame()}
            {!this.state.weaponFrame
              && <div className="columns">
                <div className="column has-text-centered">
                  <p className="title is-4">Starting Buff</p>
                  <p className="content is-large">{startingBuff(recruit.heroClass)}</p>
                </div>
                <hr />
                <div className="column has-text-centered">
                  <p className="title is-4">Class Traits:</p>
                  <p className="content is-large">{classTraits(recruit.heroClass)}</p>
                </div>
              </div>            }
          </div>
        </section>
        <footer className="modal-card-foot">
          <button onClick={close} className="button is-large is-info is-outlined is-fullwidth">Close</button>
        </footer>
      </div>
    </div>
  }
}

const mapStateToProps = ({playerParty, weapons, recruits}) => {
  return {
    playerParty,
    weapons,
    recruits
  }
}


export default connect(mapStateToProps)(RecruitModal)
