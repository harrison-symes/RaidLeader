export default function (state = [], action) {
  switch(action.type) {
    case 'RECEIVE_Spells':
      return action.spells
    default: return state
  }
}
