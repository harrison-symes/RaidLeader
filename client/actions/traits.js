import request from '../utils/api'
import {getAllTraits} from '../utils/traits'

const allTraits = getAllTraits()

export function receiveTraits(traits) {
  return {
    type: 'RECEIVE_TRAITS',
    traits: traits.map(trait => allTraits.find(allTrait => allTrait.name == trait.name))
  }
}

export function getTraits() {
  return dispatch => {
    request('get', 'player/traits')
      .then(res => dispatch(receiveTraits(res.body)))
  }
}

export function addTraitAction(trait) {
  return {
    type: 'ADD_TRAIT',
    trait: allTraits.find(allTrait => allTrait.name == trait.name)
  }
}

export function addTrait(trait) {
  return dispatch => {
    request('post', 'player/traits', {name: trait.name})
      .then(res => dispatch(addTraitAction(trait)))
  }
}
