export default function (state = [], action) {
  let newState = [...state]
  switch(action.type) {
    case 'RECEIVE_TRAITS': return action.traits
    case 'ADD_TRAIT': return [...state, action.trait]
    default: return state
  }
}
