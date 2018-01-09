import {combineReducers} from 'redux'

import auth from './auth'
import boss from './boss'
import player from './player'
import party from './party'
import started from './started'
import selectedSpell from './selectedSpell'
import friendlyTarget from './friendlyTarget'
import recruits from './recruits'

export default combineReducers({
  auth,
  boss,
  player,
  party,
  started,
  selectedSpell,
  friendlyTarget,
  recruits
})
