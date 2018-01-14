import request from '../utils/api'

export function receivePlayerGold (gold) {
  return {
    type: 'RECEIVE_PLAYER_GOLD',
    gold
  }
}

export function getPlayerGold() {
  return dispatch => {
    request('get', 'player/gold')
      .then(res => dispatch(receivePlayerGold(res.body)))
  }
}

export function earnGoldAction (gold) {
  return {
    type: 'EARN_GOLD_REWARD',
    gold
  }
}

export function earnGold (gold) {
  return dispatch => {
    console.log({gold});
    dispatch(earnGoldAction(gold))
    request('put', 'player/gold', {gold})
  }
}
