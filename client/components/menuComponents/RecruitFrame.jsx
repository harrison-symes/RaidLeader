import React from 'react'
import {connect} from 'react-redux'

import RecruitModal from './RecruitModal'
import {ClassIcon, WeaponAvailableIcon} from '../icons/StatIcons'

class RecruitFrame extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showMore: false
    }
    this.toggleShow = this.toggleShow.bind(this)
  }
  toggleShow() {
    this.setState({showMore: !this.state.showMore})
  }
  render() {
    const {recruit, playerParty, currentLocation, addRecruit, removeRecruit, inParty, showMore, selectRecruit, back, weapons, recruits} = this.props

    let weapon
    if (recruit.weapon_id) weapon = weapons.find(weapon => weapon.id == recruit.weapon_id)
    const availableWeapons = weapons.filter(other => {
      if (other == weapon) return false
      return other.class == recruit.heroClass && other.level <= recruit.level && !recruits.find(rec => rec.weapon_id == other.id)
    })
    console.log({availableWeapons});

    return showMore
      ? <RecruitModal recruit={recruit} close={back} />
      : <tbody className="tbody box">
      <p className="subtitle is-4">
        {recruit.name}
        &nbsp;
        <ClassIcon heroClass={recruit.heroClass} />
        &nbsp; (Level {recruit.level})
        {availableWeapons.length > 0 && <WeaponAvailableIcon amount={availableWeapons.length} hasWeapon={!!weapon} />}
      </p>
      <div className="level">
        {inParty && <button className="Table-Button button is-fullwidth" onClick={()=>removeRecruit(recruit)}>Remove</button>}
        <button onClick={() => selectRecruit(recruit)} className="Table-Button  button is-fullwidth">Details</button>
        {playerParty.length < currentLocation.max_party && !inParty && <button className="Table-Button button is-fullwidth" onClick={() => addRecruit(recruit)}>Add</button>}
      </div>
    </tbody>
  }
}

const mapStateToProps = ({playerParty, location, recruits, weapons}) => ({
  playerParty,
  currentLocation: location,
  recruits,
  weapons
})

export default connect(mapStateToProps)(RecruitFrame)
