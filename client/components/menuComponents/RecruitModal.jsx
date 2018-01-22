import React, {Component} from 'react'
import {connect} from 'react-redux'

import {recruitEquipWeapon} from '../../actions/weapons'

const startingBuff = heroClass => {
  switch(heroClass) {
    case 'Paladin': return 'The Paladin gains (+level) HP for each other Party Member'
    case 'Priest': return "The Priest increases each Party Member's max HP by (50%) of the Priest's own max HP"
    case 'Rogue': return "The Rogue damages the Boss equal to (5%) of the Boss' current HP"
    case 'Warrior': return "The Warrior increases the Power of each other Party Member (Power gained = Party Member's Level)"
    case 'Warlock': return "The Warlock removes armor from the Boss (Armor removed is = to Warlock's Power)"
    case 'Mage': return "The Mage increases the Player's Mana by (20%)"
    case 'Monk': return "The Monk gains (1) speed for each other Party Member"
    default: return null
  }
}

const classTraits = heroClass => {
  switch(heroClass) {
    case 'Paladin': return "The Paladin's attacks heal the Paladin for (50%) of the Damage dealt. These attacks also force the Boss to target the Paladin"
    case 'Mage': return "The Mage deals (100%) more damage while the Player is below (30%) Mana"
    case 'Warrior': return "The Warrior's attacks deal Critical Damage while the Boss is below (25%) HP. (Critical Damage: Deals (100%) bonus Damage and ignores Armor)"
    case 'Priest': return "The Priest heals a Damaged Party Member instead of Attacking the Boss. (If no Party Member is Damaged, the Priest will attack the Boss instead)"
    case 'Rogue': return "All attacks have a (20%) chance to deal Critical Damage (Critical Damage: Deals (100%) bonus Damage and ignores Armor)"
    case 'Monk': return "Whenever the Monk attacks, all Party Members are healed for (100%) of the damage Dealt"
    case 'Warlock': return "Whenever the Warlock attacks, all Party Members take Damage (Damage = Party Member's own Level)"
    default: return null
  }
}

class RecruitModal extends Component {
  constructor(props) {
    super(props)
  }
  equip(id) {
    const {recruit} = this.props
    this.props.dispatch(recruitEquipWeapon(recruit, id))
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
          <button onClick={() => this.equip(null)} className="delete" aria-label="close"></button>
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
        <div className="">
          {availableWeapons.map((weapon, i) => <div onClick={() => this.equip(weapon.id)} key={`available-weapon-${i}`} className="box">
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
          <div className="has-text-centered box">
            <p className="title is-4">Starting Buff</p>
            <p className="subtitle is-4">{startingBuff(recruit.heroClass)}</p>
          </div>
          <hr />
          <div className="has-text-centered box">
            <p className="title is-4">Class Traits:</p>
            <p className="subtitle is-4">{classTraits(recruit.heroClass)}</p>
          </div>
          <hr />
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
