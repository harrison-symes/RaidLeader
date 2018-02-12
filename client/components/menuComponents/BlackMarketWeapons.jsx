import React, {Component} from 'react'
import {connect} from 'react-redux'

import {QuantityIcon, WeaponEquippedByIcon} from '../icons/StatIcons'

class BlackMarketWeapons extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
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
    return <div className="has-text-centered">
      <span className="title is-3">Sell Weapons</span>
      <hr />
      <div className="has-text centered section">
        {weapons.map(({weapon, equippedBy, quantity}, i) => <div className='box'>
          <span className="subtitle is-3">{weapon.name}</span>
          <hr />
          <div className="columns">
            <span className="column is-8">
              <i className={`is-pulled-left subtitle is-3 icon ra ra-lg ${weapon.icon}`} />
            </span>
            <span className="is-pulled right column is-4">
              <span className="subtitle is-4">
                <QuantityIcon quantity={quantity} />
                {equippedBy.length > 0 &&
                  <WeaponEquippedByIcon equippedBy={equippedBy} />
                }
              </span>
            </span>
          </div>
        </div>)}
      </div>
    </div>
  }
}

const mapStateToProps = ({weapons, recruits}) => ({weapons, recruits})


export default connect(mapStateToProps)(BlackMarketWeapons)
