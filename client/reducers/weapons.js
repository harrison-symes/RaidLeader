export default function (state = [], action) {
  let newState = [...state]
  switch(action.type) {
    case 'LOGOUT': return []
    case 'RECEIVE_WEAPONS':
      return action.weapons
    case 'ADD_WEAPON':
      return [...state, action.weapon]
    default: return state
  }
}
