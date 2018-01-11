export default function (state = {name: 'HOME'}, action) {
  let newState = {...state}
  switch (action.type) {
    case 'TRAVEL_TO_DUNGEON':
      return action.dungeon
    default: return state
  }
}
