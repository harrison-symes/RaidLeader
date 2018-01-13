import {set, get} from '../utils/localstorage'

const town = {
  name: 'Town',
  type: 'Town'
}

let initialState = JSON.parse(get('location'))

export default function (state = initialState || town, action) {
  let newState = {...state}
  switch (action.type) {
    case 'RETURN_TO_MENU':
      let boss = newState.bosses.find(dungeonBoss => dungeonBoss.name == action.boss.name)
      boss.isDefeated = true
      return newState
    case 'TRAVEL_TO_DUNGEON':
      action.dungeon.bosses.map(boss => {
        boss.isDefeated = null
        return boss
      })
      set('location', JSON.stringify(action.dungeon))
      return action.dungeon
    case 'TRAVEL_TO_TOWN':
      set('location', JSON.stringify(town))
      return town
    default: return state
  }
}
