import request from '../utils/api'
import spellBook from '../utils/spells'

import {earnGold} from './gold'

export function receiveSpellsAction (spells) {
  return {
    type: "RECEIVE_SPELLS",
    spells: spells.map(spell => spellBook[spell.name])
  }
}

export function getSpells () {
  return dispatch => {
    request('get', 'spells')
    .then(res => dispatch(receiveSpellsAction(res.body)))
    .catch(err => console.log({err}))
  }
}

export function addSpellAction (spell) {
  return {
    type: 'ADD_SPELL',
    spell: spellBook[spell.name]
  }
}

export function addSpell (spell, cb) {
  return dispatch => {
    request('post', 'spells', spell)
      .then(res => {
        dispatch(addSpellAction(spell))
        if (cb) cb(true)
      })
  }
}

export function deleteSpellAction (name) {
  return {
    type: 'DELETE_SPELL',
    name
  }
}

export function sellSpell (name, cb) {
  return dispatch => {
    request('delete', 'spells', {name})
      .then(res => {
        dispatch(deleteSpellAction(name))
        if (cb) cb(true)
      })
  }
}
