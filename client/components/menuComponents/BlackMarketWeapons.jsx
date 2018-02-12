import React, {Component} from 'react'
import {connect} from 'react-redux'

import {QuantityIcon, WeaponEquippedByIcon, ClassIcon, HealthIcon, PowerIcon, SpeedIcon, ManaIcon, ManaRegenIcon, GoldIcon} from '../icons/StatIcons'

class BlackMarketWeapons extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: null
    }
  }
  selectWeapon(selected) {
    if (this.state.selected == selected) selected = null
    this.setState({selected})
  }
  solveWeaponDuplicates() {
    const {weapons, recruits} = this.props
    let solved = weapons.reduce((obj, weapon) => {
      obj[weapon.name] = weapon
      return obj
    }, {})
    return Object.keys(solved).map(key => {
      console.log({key, solved})
      return {
        weapon: solved[key],
        quantity: weapons.filter(weapon => weapon.name == key).length,
        equipped: weapons.filter(weapon => weapon.name == key).filter(weapon => recruits.find(recruit => recruit.weapon_id == weapon.id)).length,
        equippedBy: recruits.filter(recruit => recruit.weapon_id
          ? weapons.find(weapon => weapon.name == key && weapon.id == recruit.weapon_id)
          : false)
      }
    })
  }
  render() {
    console.log((this.solveWeaponDuplicates()));
    // {this.solveWeaponDuplicates()}
    const weapons = this.solveWeaponDuplicates()
    const {selected} = this.state
    return <div className="has-text-centered">
      <span className="title is-3">Sell Weapons</span>
      <hr />
      <div className="has-text centered section">
        {weapons.map(({weapon, equippedBy, quantity}, i) => <div className='box'>
          <span className="subtitle is-3">{weapon.name}</span>
          <hr />
          <div className="columns">
            <span className="column is-4">
              <span className="is-pulled-left subtitle is-3">
                <i className={`icon ra ra-fw ${weapon.icon}`} />
                <ClassIcon heroClass={weapon.class} />
              </span>
            </span>
            <span className="column is-4">
              <button onClick={()=>this.selectWeapon(weapon)} className={`button Info-Button ${selected == weapon ? 'is-warning is-focus' : 'is-info'} `}>{selected == weapon ? 'Hide' : 'Details'}</button>
            </span>
            <span className=" column is-4">
              <span className="is-pulled-right subtitle is-4">
                {weapon.class != 'Player' && <span>
                  <WeaponEquippedByIcon equippedBy={equippedBy} />
                  &nbsp;
                </span>}
                <QuantityIcon quantity={quantity} />
              </span>
            </span>
          </div>
          {selected == weapon && <div>
            {weapon.class == 'Player'
              ? <div className="columns is-multiline">
                <div className="column is-4"><span className="subtitle is-4"><HealthIcon value={weapon.hp} /></span></div>
                <div className="column is-4"><span className="subtitle is-4"><ManaIcon value={weapon.mana} /></span></div>
                <div className="column is-4"><span className="subtitle is-4"><ManaRegenIcon value={weapon.manaRegen} /></span></div>
              </div>
              : <div className="columns is-multiline">
                <div className="column is-4"><span className="subtitle is-4"><HealthIcon value={`${weapon.hp > 0 ? '+' : ''}${weapon.hp * 100}%`} /></span></div>
                <div className="column is-4"><span className="subtitle is-4"><PowerIcon value={`${weapon.power > 0 ? '+' : ''}${weapon.power * 100}%`} /></span></div>
                <div className="column is-4"><span className="subtitle is-4"><SpeedIcon value={`${weapon.speed > 0 ? '+' : ''}${weapon.speed * 100}%`} /></span></div>
              </div>
            }
            {weapon.bonusEffect && <div className="content is-large box">{weapon.effectDescription}</div>}
            <button className="button is-success is-outlined">Sell &nbsp; <GoldIcon value={`+${weapon.value || 200}`} /></button>
          </div>}
        </div>)}
      </div>
    </div>
  }
}

const mapStateToProps = ({weapons, recruits}) => ({weapons, recruits})


export default connect(mapStateToProps)(BlackMarketWeapons)
