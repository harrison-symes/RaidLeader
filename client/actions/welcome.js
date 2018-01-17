import request from '../utils/api'
import {addRecruitAction} from './recruits'
import {addSpellAction} from './spells'

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
