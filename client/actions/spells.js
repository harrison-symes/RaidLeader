import request from '../utils/api'
import spellBook from '../utils/spells'

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
  console.log({spell});
  return {
    type: 'ADD_SPELL',
    spell: spellBook[spell.name]
  }
}

export function addSpell (spell) {
  return dispatch => {
    request('post', 'spells', spell)
      .then(res => dispatch(addSpellAction(spell)))
  }
}
