import {Warlock} from '../../../../client/components/classes/Warlock'
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

test('Warlock attack basic success', () => {
  const store = mockStore()
  Warlock.prototype.render = () => <div></div>

  const wrapper = shallow(<Warlock
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
    type: 'PERCENT_DAMAGE_ALL_FRIENDLY',
    percentage: 0.05
  })
})

test('Warlock attack not alive', () => {
  const store = mockStore()
  Warlock.prototype.render = () => <div></div>

  const fakeMember = {
    ...member,
    isAlive: false
  }

  const wrapper = shallow(<Warlock
    member={fakeMember}
    started={true}
    dispatch={store.dispatch}
  />)

  wrapper.instance().finishCast()

  const actions = store.getActions()

  expect(actions).toHaveLength(0)
})

test('Warlock attack not started', () => {
  const store = mockStore()
  Warlock.prototype.render = () => <div></div>

  const wrapper = shallow(<Warlock
    member={member}
    started={false}
    dispatch={store.dispatch}
  />)

  wrapper.instance().finishCast()

  const actions = store.getActions()

  expect(actions).toHaveLength(0)
})

test('Warlock startFighting', () => {
  const store = mockStore()
  Warlock.prototype.render = () =>  <div></div>
  Warlock.prototype.startCast = () => ({})

  const wrapper = shallow(<Warlock
    member={member}
    started={true}
    dispatch={store.dispatch}
  />)

  wrapper.instance().startFighting()

  const actions = store.getActions()

  expect(actions).toHaveLength(1)

  expect(actions[0]).toEqual({
    type: 'WARLOCK_START_BUFF',
    power: 30
  })
})
