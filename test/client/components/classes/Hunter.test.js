import {Hunter} from '../../../../client/components/classes/Hunter'
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

test('Hunter attack basic success', () => {
  const store = mockStore()
  Hunter.prototype.render = () => <div></div>

  const wrapper = shallow(<Hunter
    member={clone(member)}
    started={true}
    dispatch={store.dispatch}
  />)
  wrapper.instance().finishCast()

  const actions = store.getActions()

  expect(actions).toHaveLength(1)

  expect(actions[0]).toEqual({
    type: 'PHYSICAL_ATTACK_BOSS',
    power: 10
  })

})

test('Hunter attack low health', () => {
  const store = mockStore()
  Hunter.prototype.render = () => <div></div>

  const fakeMember = {
    ...member,
    hp: 10,
  }

  const wrapper = shallow(<Hunter
    member={fakeMember}
    started={true}
    dispatch={store.dispatch}
  />)
  wrapper.instance().finishCast()

  const actions = store.getActions()

  expect(actions).toHaveLength(2)

  expect(actions[0]).toEqual({
    type: 'CRITICAL_ATTACK_BOSS',
    power: 10
  })

  expect(actions[1]).toEqual({
    type: 'PERCENT_HEAL_FRIENDLY_TARGET',
    target: fakeMember,
    percentage: 0.1
  })

})

test('Hunter taunt weapon', () => {
  const store = mockStore()
  Hunter.prototype.render = () => <div></div>

  const fakeMember = {
    ...member,
    weapon_effect: 'taunt'
  }

  const wrapper = shallow(<Hunter
    member={fakeMember}
    started={true}
    dispatch={store.dispatch}
  />)
  wrapper.instance().finishCast()

  const actions = store.getActions()

  expect(actions).toHaveLength(2)



  expect(actions[0]).toEqual({
    type: 'BOSS_CHANGE_TARGET',
    target: fakeMember
  })
  expect(actions[1]).toEqual({
    type: 'PHYSICAL_ATTACK_BOSS',
    power: 10
  })

})

test('Hunter attack not alive', () => {
  const store = mockStore()
  Hunter.prototype.render = () => <div></div>

  const fakeMember = {
    ...member,
    isAlive: false
  }

  const wrapper = shallow(<Hunter
    member={fakeMember}
    started={true}
    dispatch={store.dispatch}
  />)

  wrapper.instance().finishCast()

  const actions = store.getActions()

  expect(actions).toHaveLength(0)
})

test('Hunter attack not started', () => {
  const store = mockStore()
  Hunter.prototype.render = () => <div></div>

  const wrapper = shallow(<Hunter
    member={clone(member)}
    started={false}
    dispatch={store.dispatch}
  />)

  wrapper.instance().finishCast()

  const actions = store.getActions()

  expect(actions).toHaveLength(0)
})

test('Hunter startFighting', () => {
  const store = mockStore()
  Hunter.prototype.render = () =>  <div></div>
  Hunter.prototype.startCast = () => ({})

  const wrapper = shallow(<Hunter
    member={clone(member)}
    started={true}
    dispatch={store.dispatch}
  />)

  wrapper.instance().startFighting()

  const actions = store.getActions()

  expect(actions).toHaveLength(1)

  expect(actions[0]).toEqual({
    type: 'HUNTER_START_BUFF',
    target: member
  })
})
