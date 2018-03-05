import {Paladin} from '../../../../client/components/classes/Paladin'
import React from 'react'
import {shallow, mount} from 'enzyme'
import {Provider} from 'react-redux'
// import store from '../../../../client/store'
import configureStore from  'redux-mock-store'

const middleware = []
const mockStore = configureStore(middleware)

jest.mock('../../../../client/utils/localstorage', () => ({
  get: () => null,
  set: () => null
}))

const member = {
  id: 1,
  isAlive: true,
  name: 'Jeff',
  power: 10,
  speed: 5,
  initHp: 100,
  hp: 60,
  weapon_effect: null
}

const boss = {
  bossTarget: member
}

const dispatch = jest.fn()

test('Paladin attack success', () => {
  const store = mockStore()
  Paladin.prototype.render = function () {
    return <div></div>
  }

  const wrapper = shallow(<Paladin
    store={store}
    member={member}
    boss={boss}
    started={true}
    dispatch={store.dispatch}
  />)
  wrapper.instance().finishCast()

  const actions = store.getActions()

  expect(actions[0]).toEqual({
    type: 'PHYSICAL_ATTACK_BOSS',
    power: 10
  })

  expect(actions[1]).toEqual({
    type: 'BOSS_CHANGE_TARGET',
    target: member
  })

  expect(actions[2]).toEqual({
    type: 'HEAL_FRIENDLY_TARGET',
    target: member,
    power: 10
  })
})
