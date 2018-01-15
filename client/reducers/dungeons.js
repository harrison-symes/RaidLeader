export default function (state = [], action) {
  let newState = [...state]
  switch(action.type) {
    case 'RECEIVE_DUNGEONS':
      return action.dungeons
    case 'DUNGEON_COMPLETE':
      let dungeon = newState.find(dungeon => dungeon.id == action.dungeon.id)
      dungeon.isCompleted = true
      return newState
    default: return state
  }
}
