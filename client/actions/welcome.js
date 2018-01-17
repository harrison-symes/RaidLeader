import request from '../utils/api'
import {addRecruitAction} from './recruits'

export function addSpellAction (spell) {
  return {
    type: 'ADD_SPELL',
    spell
  }
}

export function getStarted (recruit) {
  return dispatch => {
    request('post', 'player/getstarted', recruit)
      .then(res => {
        dispatch(addRecruitAction(res.body.recruit))
        dispatch(addSpellAction(res.body.spell))
        dispatch({type: 'GET_STARTED'})
      })
  }
}
