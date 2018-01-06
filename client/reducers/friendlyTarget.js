
export default function (state = null, action) {
  switch(action.type) {
    case 'SELECT_FRIENDLY_TARGET':
      return action.target
    default:
      return state
  }
}
