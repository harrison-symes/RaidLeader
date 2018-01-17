import request from '../utils/api'
import {addRecruitAction} from './recruits'

export function addSpellAction (spell) {
  return {
    type: 'ADD_SPELL',
    spell
  }
}

export function getStarted (paladinName) {
  return dispatch => {
    request('post', 'player/getstarted', {paladinName})
      .then(res => {
        dispatch(addRecruitAction(res.recruit))
        dispatch(addSpellAction(res.spell))
        dispatch({type: 'GET_STARTED'})
      })
  }
}
