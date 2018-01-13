import {combineReducers} from 'redux'

import auth from './auth'
import boss from './boss'
import player from './player'
import party from './party'
import started from './started'
import selectedSpell from './selectedSpell'
import friendlyTarget from './friendlyTarget'
import recruits from './recruits'
import playerParty from './playerParty'
import playerSpells from './playerSpells'
import spellBook from './spellBook'
import dungeons from './dungeons'
import location from './location'

export default combineReducers({
  auth,
  boss,
  player,
  party,
  started,
  selectedSpell,
  friendlyTarget,
  recruits,
  playerParty,
  playerSpells,
  spellBook,
  dungeons,
  location
})
