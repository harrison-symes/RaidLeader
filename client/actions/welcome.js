import request from '../utils/api'
import {addRecruitAction} from './recruits'
import {addSpellAction} from './spells'
import weaponSwitch from '../utils/weaponSwitch'

export function getStarted (recruit) {
  return dispatch => {
    request('post', 'player/getstarted', recruit)
      .then(res => {
        const {recruit, spell, weapon} = res.body
        dispatch(addRecruitAction(recruit))
        dispatch(addSpellAction(spell))
        dispatch({type: 'ADD_WEAPON', weapon: weaponSwitch[weapon.name](weapon.level, weapon.id)})
        dispatch({type: 'GET_STARTED'})
      })
  }
}
