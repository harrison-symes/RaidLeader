import request from '../utils/api'

export function receiveTraits(traits) {
  return {
    type: 'RECEIVE_TRAITS',
    traits
  }
}

export function getTraits() {
  return dispatch => {
    request('get', 'player/traits')
      .then(res => disptch(receiveTraits(res.body)))
  }
}

export function addTraitAction(trait) {
  return {
    type: 'ADD_TRAIT',
    trait
  }
}

export function addTrait(name) {
  return dispatch => {
    request('post', 'player/traits', {name})
      .then(res => dispatch(addTraitAction(res.body)))
  }
}
