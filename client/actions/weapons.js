import request from '../utils/api'

export function receiveWeapons(weapons) {
  console.log({weapons});
  return {
    type: 'RECEIVE_WEAPONS',
    weapons
  }
}

export function getWeapons () {
  return dispatch => {
    request('get', 'player/weapons')
      .then(res => dispatch(receiveWeapons(res.body)))
  }
}

export function addWeaponAction (weapon) {
  return {
    type: 'ADD_WEAPON',
    weapon
  }
}

export function addWeapon (weapon) {
  return dispatch => {
    request('post', 'player/weapon', weapon)
      .then(res => dispatch(addWeaponAction(weapons)))
  }
}
