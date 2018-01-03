import {combineReducers} from 'redux'

import auth from './auth'
import boss from './boss'
import player from './player'
import party from './party'
import started from './started'

export default combineReducers({
  auth,
  boss,
  player,
  party,
  started
})
