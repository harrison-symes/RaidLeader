import request from '../utils/api'
import spellBook from '../utils/spells'

export function receiveSpellsAction (spells) {
  return {
    type: "RECEIVE_Spells",
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
