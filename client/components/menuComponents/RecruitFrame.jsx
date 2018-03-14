import React from 'react'
import {connect} from 'react-redux'

import RecruitModal from './RecruitModal'
import {ClassIcon, WeaponAvailableIcon, LevelIcon, ZodiacIcon} from '../icons/StatIcons'

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
    let availableWeapons = weapons.filter(other => {
      if (other == weapon) return false
      return other.class == recruit.heroClass && other.level <= recruit.level && !recruits.find(rec => rec.weapon_id == other.id)
    })
    let dup = availableWeapons.reduce((obj, weapon) => {
      obj[weapon.name] = weapon
      return obj
    }, {})
    availableWeapons=Object.keys(dup).map(key => dup[key])
    return showMore
      ? <RecruitModal recruit={recruit} close={back} />
      : <tbody className="tbody box has-text-centered">
        <tr className="title is-4 " style={{backgroundColor: 'grey', backgroundImage: "url()"}}>{recruit.name}</tr>
        <tr>
          <td className="subtitle is-4"style={{backgroundColor: 'grey', backgroundImage: "url()"}}>
            <ClassIcon heroClass={recruit.heroClass} />
            <ZodiacIcon zodiac={recruit.zodiac} />
            <span className="is-pulled-right">
              <LevelIcon level={recruit.level} />
              <WeaponAvailableIcon amount={availableWeapons.length} hasWeapon={weapon} />
            </span>
          </td>
        </tr>
      <tr>
        <td className="level">
          {inParty && <button className="Table-Button button is-fullwidth" onClick={()=>removeRecruit(recruit)}>Remove</button>}
          <button onClick={() => selectRecruit(recruit)} className="Table-Button  button is-fullwidth">Details</button>
          {playerParty.length < currentLocation.max_party && !inParty && <button className="Table-Button button is-fullwidth" onClick={() => addRecruit(recruit)}>Add</button>}
        </td>
      </tr>
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
