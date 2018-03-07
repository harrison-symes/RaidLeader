import {Rogue} from '../../../../client/components/classes/Rogue'
import React from 'react'
import {shallow, mount} from 'enzyme'
import {Provider} from 'react-redux'
import clone from 'clone'
import configureStore from  'redux-mock-store'

const mockStore = configureStore([])

const member = {
  id: 1,
  initHp: 100,
  hp: 100,
  isAlive: true,
  power: 10,
  weapon_effect: null
}

test('Rogue attack basic success', () => {
  const store = mockStore()
  Rogue.prototype.render = () => <div></div>

  const wrapper = shallow(<Rogue
    member={clone(member)}
    started={true}
    dispatch={store.dispatch}
  />)
  wrapper.instance().finishCast()

  const actions = store.getActions()

  expect(actions).toHaveLength(1)

  const action = actions[0]

  expect(action.type == 'PHYSICAL_ATTACK_BOSS' || action.type == 'CRITICAL_ATTACK_BOSS').toBeTruthy()
  expect(action.power).toBe(10)
})

test('Rogue crit testing', () => {
  const store = mockStore()
  Rogue.prototype.render = () => <div></div>

  const fakeMember = {
    ...member,
    hp: 10,
  }

  const wrapper = shallow(<Rogue
    member={fakeMember}
    started={true}
    dispatch={store.dispatch}
  />)

  for (let i = 0; i < 1000; i++) wrapper.instance().finishCast()

  const actions = store.getActions()

  expect(actions).toHaveLength(1000)

  const critCount = actions.filter(action => action.type == 'CRITICAL_ATTACK_BOSS').length

  expect(critCount > 0).toBeTruthy()
  expect(critCount < 1000).toBeTruthy()
})

test('Rogue attack not alive', () => {
  const store = mockStore()
  Rogue.prototype.render = () => <div></div>

  const fakeMember = {
    ...member,
    isAlive: false
  }

  const wrapper = shallow(<Rogue
    member={fakeMember}
    started={true}
    dispatch={store.dispatch}
  />)

  wrapper.instance().finishCast()

  const actions = store.getActions()

  expect(actions).toHaveLength(0)
})

test('Rogue attack not started', () => {
  const store = mockStore()
  Rogue.prototype.render = () => <div></div>

  const wrapper = shallow(<Rogue
    member={clone(member)}
    started={false}
    dispatch={store.dispatch}
  />)

  wrapper.instance().finishCast()

  const actions = store.getActions()

  expect(actions).toHaveLength(0)
})

test('Rogue startFighting', () => {
  const store = mockStore()
  Rogue.prototype.render = () =>  <div></div>
  Rogue.prototype.startCast = () => ({})

  const wrapper = shallow(<Rogue
    member={clone(member)}
    started={true}
    dispatch={store.dispatch}
  />)

  wrapper.instance().startFighting()

  const actions = store.getActions()

  expect(actions).toHaveLength(1)

  expect(actions[0]).toEqual({
    type: 'ROGUE_START_BUFF',
  })
})
