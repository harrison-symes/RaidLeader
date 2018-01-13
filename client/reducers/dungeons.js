export default function (state = [], action) {
  let newState = [...state]
  switch(action.type) {
    
    case 'RECEIVE_DUNGEONS':
      return action.dungeons
    default: return state
  }
}
