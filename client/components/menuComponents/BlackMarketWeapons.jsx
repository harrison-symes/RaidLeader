import React, {Component} from 'react'
import {connect} from 'react-redux'

class BlackMarketWeapons extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  solveWeaponDuplicates() {
    const {weapons} = this.props
    let solved = weapons.reduce((obj, weapon) => {
      obj[weapon.name] = weapon
      return obj
    }, {})
    solved = Object.keys(solved).map(key => {
      console.log({key, solved});
      return {
        weapon: solved[key],
        quantity: weapons.filter(weapon => weapon.name == key).length
      }
    })
    console.log({solved});
  }
  render() {
    {this.solveWeaponDuplicates()}
    return <div className="has-text-centered">

      <span className="title is-3">Sell Weapons</span>
    </div>
  }
}

const mapStateToProps = ({weapons}) => ({weapons})


export default connect(mapStateToProps)(BlackMarketWeapons)
