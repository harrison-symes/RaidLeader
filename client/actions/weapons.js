import request from '../utils/api'
import weaponSwitch from '../utils/weaponSwitch'

import {getPlayerGold} from './gold'

export function receiveWeapons(weapons) {
  return {
    type: 'RECEIVE_WEAPONS',
    weapons: weapons.map(({name, level, id}) => weaponSwitch[name](level, id))
  }
}

export function getWeapons (cb) {
  return dispatch => {
    request('get', 'player/weapons')
      .then(res => {
        dispatch(receiveWeapons(res.body))
        if (cb) cb(true)
      })
  }
}

export function addWeaponAction ({name, level}, id) {
  return {
    type: 'ADD_WEAPON',
    weapon: weaponSwitch[name](level, id)
  }
}

export function addWeapon (weapon) {
  return dispatch => {
    request('post', 'player/weapon', weapon)
      .then(res => dispatch(addWeaponAction(weapon, res.body)))
  }
}

export function recruitEquipWeaponAction (recruit, weapon_id) {
  return {
    type: 'RECRUIT_EQUIP_WEAPON',
    recruit,
    weapon_id
  }
}

export function recruitEquipWeapon (recruit, id) {
  return dispatch => {
    request('put', 'recruits/weapons', {id: recruit.id, weapon_id: id})
      .then(() => dispatch(recruitEquipWeaponAction(recruit, id)))
  }
}

export function sellWeapon (id, cb) {
  return dispatch => {
    request('delete', 'player/weapons', {id})
      .then(() => {
        dispatch(getWeapons(cb))
      })
  }
}
