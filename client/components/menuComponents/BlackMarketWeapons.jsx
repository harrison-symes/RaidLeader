import React, {Component} from 'react'
import {connect} from 'react-redux'

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
      console.log({key, solved});
      return {
        weapon: solved[key],
        quantity: weapons.filter(weapon => weapon.name == key).length,
        equipped: weapons.filter(weapon => weapon.name == key).filter(weapon => recruits.find(recruit => recruit.weapon_id == weapon.id)).length
      }
    })
  }
  render() {
    {this.solveWeaponDuplicates()}
    return <div className="has-text-centered">

      <span className="title is-3">Sell Weapons</span>
    </div>
  }
}

const mapStateToProps = ({weapons, recruits}) => ({weapons, recruits})


export default connect(mapStateToProps)(BlackMarketWeapons)
