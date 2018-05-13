import React, {Component} from 'react'
import {connect} from 'react-redux'

import {QuantityIcon, WeaponEquippedByIcon, ClassIcon, HealthIcon, PowerIcon, SpeedIcon, ManaIcon, ManaRegenIcon, GoldIcon} from '../icons/StatIcons'

import {sellWeapon, recruitEquipWeapon} from '../../actions/weapons'
import {earnGold} from '../../actions/gold'

class BlackMarketWeapons extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: null,
      equippedBy: [],
      isLoading: false
    }
    this.sellWeapon = this.sellWeapon.bind(this)
  }
  sellWeapon() {
    const {selected, equippedBy, isLoading} = this.state
    if (isLoading) return
    this.setState({isLoading: true})
    this.props.dispatch(sellWeapon(selected.id, success => {
      this.props.dispatch(earnGold(selected.value, success => {
        this.setState({isLoading: false})
      }))
    }))
  }
  unEquip(recruit) {
    this.props.dispatch(recruitEquipWeapon(recruit, null))
  }
  selectWeapon(selected, equippedBy = []) {
    if (this.state.selected == selected) selected = null
    this.setState({selected, equippedBy})
  }
  solveWeaponDuplicates() {
    const {weapons, recruits} = this.props
    let solved = weapons.reduce((obj, weapon) => {
      if (obj.hasOwnProperty(weapon.name)) {
        if (!recruits.find(recruit => recruit.weapon_id == weapon.id)) obj[weapon.name] = weapon
      } else obj[weapon.name] = weapon
      return obj
    }, {})
    return Object.keys(solved).map(key => {
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
    const sortedWeapons = this.solveWeaponDuplicates()
    const {selected} = this.state
    return <div className="has-text-centered">
      <span className="title is-3">Sell Weapons</span>
      <hr />
      <div className="has-text centered section">
        {sortedWeapons.map(({weapon, equippedBy, quantity}, i) => <div className='box'>
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
              <button onClick={()=>this.selectWeapon(weapon, equippedBy)} className={`button Info-Button ${selected == weapon ? 'is-warning is-focus' : 'is-info'} `}>{selected == weapon ? 'Hide' : 'Details'}</button>
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
            {(weapon.class == 'Player' && this.props.weapons.filter(weapon => weapon.class == 'Player').length < 2)
              ? <button disabled className="button is-danger">This is your last Player Weapon</button>
              : equippedBy.length == quantity
                ? <div>
                  <span className="title is-4">All copies of this Weapon are equipped</span>
                  <hr />
                  {equippedBy.map(recruit => <button onClick={()=>this.unEquip(recruit)} className="button is-fullwidth is-warning is-outlined">Unequip from {recruit.name}</button>)}
                </div>
                : <button onClick={this.sellWeapon} className="button is-warning is-outlined">Sell &nbsp; <GoldIcon value={`+${weapon.value}`} /></button>
            }
          </div>}
        </div>)}
      </div>
    </div>
  }
}

const mapStateToProps = ({weapons, recruits}) => ({weapons, recruits})


export default connect(mapStateToProps)(BlackMarketWeapons)
