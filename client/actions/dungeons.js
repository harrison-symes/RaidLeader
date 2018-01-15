import request from '../utils/api'
import bosses from '../utils/bosses/bosses'

export function receiveDungeonsAction (dungeons) {
  return {
    type: "RECEIVE_DUNGEONS",
    dungeons: dungeons.map(dungeon => {
      dungeon.bosses = dungeon.bosses.map(boss => bosses(boss.name)).filter(boss => boss)
      dungeon.type = 'Dungeon'
      return dungeon
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
  console.log({dungeon});
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
