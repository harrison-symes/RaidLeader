export default function (state = [], action) {
  switch(action.type) {
    case 'LOGOUT': return []
    case 'RECEIVE_SPELLS':
      return action.spells
    case 'ADD_SPELL':
      return [...state, action.spell]
    default: return state
  }
}
