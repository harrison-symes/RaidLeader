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
import gold from './gold'
import weapons from './weapons'
import showWelcome from './showWelcome'
import playerWeapon from './playerWeapon'
import bossCount from './bossCount'
import version from './version'
import experience from './experience'
import gems from './gems'
import traits from './traits'

export default combineReducers({
  auth,
  showWelcome,
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
  location,
  gold,
  weapons,
  playerWeapon,
  bossCount,
  version,
  experience,
  gems,
  traits
})
