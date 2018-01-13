import {set, get} from '../utils/localstorage'

const town = {
  name: 'Town',
  type: 'Town'
}

let initialState = JSON.parse(get('location'))

export default function (state = initialState || town, action) {
  let newState = {...state}
  switch (action.type) {
    case 'GAME_WON':
      let boss = newState.bosses.find(dungeonBoss => dungeonBoss.name == action.boss.name)
      boss.isDefeated = true
      set('location', JSON.stringify(newState))
      return newState
    case 'TRAVEL_TO_DUNGEON':
      action.dungeon.bosses.map(boss => {
        boss.isDefeated = false
        return boss
      })
      set('location', JSON.stringify(action.dungeon))
      return action.dungeon
    case 'TRAVEL_TO_TOWN':
      set('location', JSON.stringify(town))
      return town
    case 'GAME_LOST':
      set('location', JSON.stringify(town))
      return town
    default: return state
  }
}
