import {Monk} from '../../../../client/components/classes/Monk'
import React from 'react'
import {shallow, mount} from 'enzyme'
import {Provider} from 'react-redux'
import clone from 'clone'
import configureStore from  'redux-mock-store'

const mockStore = configureStore([])

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

test('Monk attack basic success', () => {
  const store = mockStore()
  Monk.prototype.render = function () {
    return <div></div>
  }

  const wrapper = shallow(<Monk
    store={store}
    member={clone(member)}
    boss={clone(boss)}
    started={true}
    dispatch={store.dispatch}
  />)
  wrapper.instance().finishCast()

  const actions = store.getActions()

  expect(actions).toHaveLength(2)

  expect(actions[0]).toEqual({
    type: 'PHYSICAL_ATTACK_BOSS',
    power: 10
  })
  expect(actions[1]).toEqual({
    type: 'PERCENT_HEAL_ALL_FRIENDLY',
    percentage: 0.1
  })
})
