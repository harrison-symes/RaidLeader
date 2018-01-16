export default function (state = false, action) {
  switch(action.type) {
    case 'RECEIVE_RECRUITS': return action.recruits.length == 0
    default: return state
  }
}
