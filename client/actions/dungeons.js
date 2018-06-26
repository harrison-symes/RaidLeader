import request from '../utils/api'
import bosses from '../utils/bosses/bosses'

import dungeonInfo from '../utils/dungeonInfo'

export function receiveDungeonsAction (dungeons) {
  dungeons.push(dungeonInfo('The Test', false))
  return {
    type: "RECEIVE_DUNGEONS",
    dungeons: dungeons.map(dungeon => {
      // dungeon = dungeonInfo(dungeon.name, dungeon.isCompleted)
      let newDungeon = dungeonInfo(dungeon.name, dungeon.isCompleted)
      newDungeon.bosses = newDungeon.bosses.map(boss => bosses(boss))
      newDungeon.type = 'Dungeon'
      newDungeon.id = dungeon.id
      return newDungeon
    })
  }
}

export function getDungeons () {
  return dispatch => {
    request('get', 'dungeons')
    .then(res => dispatch(receiveDungeonsAction(res.body)))
    .catch(err => console.log({err}))
  }
}

export function completeDungeonAction(dungeon) {
  return {
    type: "DUNGEON_COMPLETE",
    dungeon
  }
}

export function completeDungeon (dungeon) {
  return dispatch => {
    request('post', 'dungeons/complete', {dungeon_id: dungeon.id})
      .then(res => dispatch(completeDungeonAction(dungeon)))
  }
}
