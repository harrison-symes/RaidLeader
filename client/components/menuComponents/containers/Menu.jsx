import {connect} from 'react-redux'

import Menu from '../Menu'

import {getRecruits} from '../../../actions/recruits'
import {getSpells} from '../../../actions/spells'
import {getDungeons} from '../../../actions/dungeons'
import {getPlayerGold} from '../../../actions/gold'
import {getWeapons} from '../../../actions/weapons'
import {getExperience} from '../../../actions/experience'
import {getGems} from '../../../actions/gems'
import {getTraits} from '../../../actions/traits'

const weaponMod = (recruit, weapon) => {
  recruit.initHp += recruit.initHp * weapon.hp
  recruit.hp += recruit.hp * weapon.hp
  recruit.initPower += recruit.initPower * weapon.power
  recruit.power += recruit.power * weapon.power
  recruit.initSpeed += weapon.speed
  recruit.speed += recruit.speed * weapon.speed
  recruit.weapon_name = weapon.name
  recruit.weapon_level = weapon.level
  recruit.weapon_effect = weapon.bonusEffect
  return recruit
}

const readyRecruits = (recruits, weapons) => {
  return recruits.map(recruit => {
    let weapon = weapons.find(wep => wep.id == recruit.weapon_id)
    if (weapon) recruit = weaponMod(recruit, weapon)
    else recruit.weapon_name = null

    return recruit
  })
}

const mapStateToProps = ({
  auth,
  playerParty,
  playerSpells,
  location,
  boss,
  gold,
  weapons,
  recruits,
  playerWeapon
}) => ({
  playerParty,
  playerSpells,
  currentLocation: location,
  boss,
  gold,
  weapons,
  recruits,
  playerWeapon,
  auth
})

const mapDispatchToProps = (dispatch, props) => ({
  getAll: (isAuthenticated) => {
    if (isAuthenticated) {
      dispatch(getRecruits())
      dispatch(getSpells())
      dispatch(getDungeons())
      dispatch(getPlayerGold())
      dispatch(getWeapons())
      dispatch(getExperience())
      dispatch(getGems())
      dispatch(getTraits())
    } else dispatch({type: 'RECEIVE_RECRUITS', recruits: []})
  },
  loadGame:  ({playerParty, playerSpells, playerWeapon, name, weapons}) => (
    dispatch({
      type: 'LOAD_GAME',
      playerParty: readyRecruits(playerParty, weapons),
      playerSpells,
      playerWeapon,
      name
    })
  ),
  travelToTown: () => dispatch({type: 'TRAVEL_TO_TOWN'})
})

export default connect(mapStateToProps, mapDispatchToProps)(Menu)
