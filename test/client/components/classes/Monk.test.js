import {Monk} from '../../../../client/components/classes/Monk'
import React from 'react'
import {shallow, mount} from 'enzyme'
import {Provider} from 'react-redux'
import clone from 'clone'
import configureStore from  'redux-mock-store'

const mockStore = configureStore([])

const member = {
  id: 1,
  isAlive: true,
  power: 10,
  weapon_effect: null
}

const boss = {
  bossTarget: member
}

test('Monk attack basic success', () => {
  const store = mockStore()
  Monk.prototype.render = function () {
    return <div></div>
  }

  const wrapper = shallow(<Monk
    member={clone(member)}
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

test('Monk attack while dead', () => {
  const store = mockStore()
  Monk.prototype.render = function () {
    return <div></div>
  }

  const fakeMember = {
    ...member,
    isAlive: false
  }

  const wrapper = shallow(<Monk
    member={fakeMember}
    started={true}
    dispatch={store.dispatch}
  />)
  wrapper.instance().finishCast()

  const actions = store.getActions()

  expect(actions).toHaveLength(0)
})

test('Monk attack taunt basic success', () => {
  const store = mockStore()
  Monk.prototype.render = function () {
    return <div></div>
  }

  const fakeMember = {
    ...member,
    weapon_effect: 'taunt'
  }

  const wrapper = shallow(<Monk
    member={fakeMember}
    started={true}
    dispatch={store.dispatch}
  />)
  wrapper.instance().finishCast()

  const actions = store.getActions()

  expect(actions).toHaveLength(3)

  expect(actions[0]).toEqual({
    type: 'BOSS_CHANGE_TARGET',
    target: fakeMember
  })
  expect(actions[1]).toEqual({
    type: 'PHYSICAL_ATTACK_BOSS',
    power: 10
  })
  expect(actions[2]).toEqual({
    type: 'PERCENT_HEAL_ALL_FRIENDLY',
    percentage: 0.1
  })
})

test('Monk startFighting', () => {
  const store = mockStore()
  Monk.prototype.render = function () {
    return <div></div>
  }

  const wrapper = shallow(<Monk
    member={clone(member)}
    started={true}
    dispatch={store.dispatch}
  />)
  wrapper.instance().startFighting()

  const actions = store.getActions()



  expect(actions).toHaveLength(1)

  expect(actions[0]).toEqual({
    type: 'MONK_START_BUFF',
    target: member
  })
})
