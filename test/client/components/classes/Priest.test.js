import {Priest} from '../../../../client/components/classes/Priest'
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
  speed: 10,
  weapon_effect: null,
}

const party = [
  member,
  {
    ...member,
    id: 2,
    hp: 91
  },
  {
    ...member,
    id: 3,
    hp: 20
  }
]

test('Priest heal basic success', () => {
  const store = mockStore()
  Priest.prototype.render = () => <div></div>
  const target = party[2]

  const wrapper = shallow(<Priest
    member={clone(member)}
    party={clone(party)}
    started={true}
    dispatch={store.dispatch}
  />)
  wrapper.instance().finishCast(target)

  const actions = store.getActions()

  expect(actions).toHaveLength(1)

  expect(actions[0]).toEqual({
    type: 'HEAL_FRIENDLY_TARGET',
    target: target,
    power: 10
  })
})

test('Priest partial overheal', () => {
  const store = mockStore()
  Priest.prototype.render = () => <div></div>

  const target = party[1]

  const wrapper = shallow(<Priest
    member={clone(member)}
    party={party}
    started={true}
    dispatch={store.dispatch}
  />)
  wrapper.instance().finishCast(target)

  const actions = store.getActions()

  expect(actions).toHaveLength(2)

  expect(actions[0]).toEqual({
    type: 'PHYSICAL_ATTACK_BOSS',
    power: 2
  })

  expect(actions[1]).toEqual({
    type: 'HEAL_FRIENDLY_TARGET',
    power: 10,
    target
  })

})

test('Priest full overheal', () => {
  const store = mockStore()
  Priest.prototype.render = () => <div></div>

  const wrapper = shallow(<Priest
    member={clone(member)}
    party={party}
    started={true}
    dispatch={store.dispatch}
  />)
  wrapper.instance().finishCast(member)

  const actions = store.getActions()

  expect(actions).toHaveLength(2)

  expect(actions[0]).toEqual({
    type: 'PHYSICAL_ATTACK_BOSS',
    power: 20
  })

  expect(actions[1]).toEqual({
    type: 'HEAL_FRIENDLY_TARGET',
    power: 10,
    target: member
  })

})

test('Priest curePoison weapon', () => {
  const store = mockStore()
  Priest.prototype.render = () => <div></div>

  const target = party[2]

  const fakeMember = {
    ...member,
    weapon_effect: 'curePoison'
  }

  const wrapper = shallow(<Priest
    member={fakeMember}
    party={party}
    started={true}
    dispatch={store.dispatch}
  />)
  wrapper.instance().finishCast(target)

  const actions = store.getActions()

  expect(actions).toHaveLength(2)

  expect(actions[0]).toEqual({
    type: 'REMOVE_EFFECT_FROM_TARGET',
    target,
    effect: {name: 'Poison'}
  })
})

test('Priest attack not alive', () => {
  const store = mockStore()
  Priest.prototype.render = () => <div></div>

  const fakeMember = {
    ...member,
    isAlive: false
  }

  const wrapper = shallow(<Priest
    member={fakeMember}
    party={party}
    started={true}
    dispatch={store.dispatch}
  />)

  wrapper.instance().finishCast()

  const actions = store.getActions()

  expect(actions).toHaveLength(0)
})

test('Priest attack not started', () => {
  const store = mockStore()
  Priest.prototype.render = () => <div></div>
  const wrapper = shallow(<Priest
    member={member}
    party={party}
    started={false}
    dispatch={store.dispatch}
  />)

  wrapper.instance().finishCast()

  const actions = store.getActions()

  expect(actions).toHaveLength(0)
})

test('Priest startFighting', () => {
  const store = mockStore()
  Priest.prototype.render = () =>  <div></div>
  Priest.prototype.startCast = () => ({})

  const wrapper = shallow(<Priest
    member={member}
    party={party}
    started={true}
    dispatch={store.dispatch}
  />)

  wrapper.instance().startFighting()

  const actions = store.getActions()

  expect(actions).toHaveLength(1)

  expect(actions[0]).toEqual({
    type: 'PRIEST_START_BUFF',
    target: member
  })
})

test('Priest findTarget', () => {
  const store = mockStore()
  Priest.prototype.render = () =>  <div></div>
  Priest.prototype.startCast = () => ({})

  const mockCall = jest.fn()

  Priest.prototype.completeCast = mockCall

  const wrapper = shallow(<Priest
    member={member}
    party={party}
    started={true}
    dispatch={store.dispatch}
  />)


  wrapper.instance().findTarget()
  expect(mockCall.mock.calls).toHaveLength(1)
  expect(mockCall.mock.calls[0][0]).toEqual(party[2])

  const actions = store.getActions()

  expect(actions).toHaveLength(0)
})

test('Priest findTarget not started', () => {
  const store = mockStore()
  Priest.prototype.render = () =>  <div></div>
  Priest.prototype.startCast = () => ({})

  const mockCall = jest.fn()

  Priest.prototype.completeCast = mockCall

  const wrapper = shallow(<Priest
    member={member}
    party={party}
    started={false}
    dispatch={store.dispatch}
  />)


  wrapper.instance().findTarget()
  expect(mockCall.mock.calls).toHaveLength(0)

  const actions = store.getActions()

  expect(actions).toHaveLength(0)
})

test('Priest findTarget secondary test', () => {
  const store = mockStore()
  Priest.prototype.render = () =>  <div></div>
  Priest.prototype.startCast = () => ({})

  const fakeParty = [
    {...member},
    {
      ...member,
      id: 2,
      hp: 88
    },
    {
      ...member,
      id: 3,
      hp: 89
    }
  ]

  const mockCall = jest.fn()

  Priest.prototype.completeCast = mockCall

  const wrapper = shallow(<Priest
    member={member}
    party={fakeParty}
    started={true}
    dispatch={store.dispatch}
  />)

  wrapper.instance().findTarget()
  expect(mockCall.mock.calls).toHaveLength(1)
  expect(mockCall.mock.calls[0][0]).toEqual(fakeParty[1])

  const actions = store.getActions()

  expect(actions).toHaveLength(0)
})

test('Priest findTarget overheal', () => {
  const store = mockStore()
  Priest.prototype.render = () =>  <div></div>
  Priest.prototype.startCast = () => ({})

  const fakeParty = [
    {...member},
    {
      ...member,
      id: 2,
    },
    {
      ...member,
      id: 3,
    }
  ]

  const mockCall = jest.fn()

  Priest.prototype.completeCast = mockCall

  const wrapper = shallow(<Priest
    member={member}
    party={fakeParty}
    started={true}
    dispatch={store.dispatch}
  />)

  wrapper.instance().findTarget()
  expect(mockCall.mock.calls).toHaveLength(1)
  expect(mockCall.mock.calls[0][0]).toEqual(null)

  const actions = store.getActions()

  expect(actions).toHaveLength(0)
})
