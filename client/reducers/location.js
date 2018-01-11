import {set, get} from '../utils/localstorage'

const town = {
  name: 'Town',
  type: 'Town'
}

let initialState = JSON.parse(get('location'))
console.log({initialState});

export default function (state = get('location') || town, action) {
  let newState = {...state}
  switch (action.type) {
    case 'TRAVEL_TO_DUNGEON':
      action.dungeon.bosses.map(boss => {
        boss.isDefeated = null
        return boss
      })
      set('location', JSON.stringify(action.dungeon))
      return action.dungeon
    default: return state
  }
}
