export default function (state = [], action) {
  let newState = [...state]
  switch(action.type) {
    case 'ADD_SPELL_TO_BAR':
      newState.splice(action.idx, 0, action.spell)
      return newState
    case 'REMOVE_SPELL_FROM_BAR':
      return newState.filter(spell => spell != action.spell)
    case 'SHIFT_SPELL_INDEX':
      newState = newState.filter(spell => spell != action.spell)
      newState.splice(action.idx, 0, action.spell)
      return newState
    case 'REPLACE_SPELL_IN_BAR':
      newState = newState.filter(spell => spell != action.spell)
      newState.splice(action.idx, 1, action.spell)
    default: return state
  }
}
