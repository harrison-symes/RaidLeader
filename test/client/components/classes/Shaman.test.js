import {Shaman} from '../../../../client/components/classes/Shaman'
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

const party = [
  member,
  {
    ...member,
    id: 2,
    hp: 50
  },
  {
    ...member,
    id: 3,
    hp: 20
  }
]

jest.mock('../../../../client/utils/effectConstructors', () => ({
  renewConstructor: () => ({
    name: 'Renew'
  })
}))

test('Shaman attack basic success', () => {
  const store = mockStore()
  Shaman.prototype.render = () => <div></div>

  const wrapper = shallow(<Shaman
    member={clone(member)}
    party={party}
    started={true}
    dispatch={store.dispatch}
  />)
  wrapper.instance().finishCast()

  const actions = store.getActions()

  expect(actions).toHaveLength(2)

  expect(actions[0]).toEqual({
    type: 'ADD_EFFECT_TO_TARGET',
    effect: {name: 'Renew'},
    target: party[2]
  })

  expect(actions[1]).toEqual({
    type: 'PHYSICAL_ATTACK_BOSS',
    power: 10
  })

})

test('Shaman attack renew logic test', () => {
  const store = mockStore()
  Shaman.prototype.render = () => <div></div>

  const fakeParty = clone(party)
  const fakeMember = {
    id: 1,
    initHp: 100,
    hp: 1,
    isAlive: true,
    power: 10,
    weapon_effect: null
  }
  fakeParty[0] = fakeMember

  const wrapper = shallow(<Shaman
    member={fakeMember}
    party={fakeParty}
    started={true}
    dispatch={store.dispatch}
  />)
  wrapper.instance().finishCast()

  const actions = store.getActions()

  expect(actions).toHaveLength(2)

  expect(actions[0]).toEqual({
    type: 'ADD_EFFECT_TO_TARGET',
    effect: {name: 'Renew'},
    target: fakeMember
  })

  expect(actions[1]).toEqual({
    type: 'PHYSICAL_ATTACK_BOSS',
    power: 10
  })

})

test('Shaman curePoison test', () => {
  const store = mockStore()
  Shaman.prototype.render = () => <div></div>

  const fakeParty = clone(party)
  const fakeMember = {
    id: 1,
    initHp: 100,
    hp: 1,
    isAlive: true,
    power: 10,
    weapon_effect: 'curePoison'
  }
  fakeParty[0] = fakeMember

  const wrapper = shallow(<Shaman
    member={fakeMember}
    party={fakeParty}
    started={true}
    dispatch={store.dispatch}
  />)
  wrapper.instance().finishCast()

  const actions = store.getActions()

  expect(actions).toHaveLength(3)
  expect(actions[0]).toEqual({
    type: 'REMOVE_EFFECT_FROM_TARGET',
    effect: {name: 'Poison'},
    target: fakeMember
  })

  expect(actions[1]).toEqual({
    type: 'ADD_EFFECT_TO_TARGET',
    effect: {name: 'Renew'},
    target: fakeMember
  })


  expect(actions[2]).toEqual({
    type: 'PHYSICAL_ATTACK_BOSS',
    power: 10
  })

})

test('Shaman attack not alive', () => {
  const store = mockStore()
  Shaman.prototype.render = () => <div></div>

  const fakeMember = {
    ...member,
    isAlive: false
  }

  const wrapper = shallow(<Shaman
    member={fakeMember}
    party={party}
    started={true}
    dispatch={store.dispatch}
  />)

  wrapper.instance().finishCast()

  const actions = store.getActions()

  expect(actions).toHaveLength(0)
})

test('Shaman startFighting', () => {
  const store = mockStore()
  Shaman.prototype.render = () =>  <div></div>
  Shaman.prototype.startCast = () => ({})

  const wrapper = shallow(<Shaman
    member={member}
    party={party}
    started={true}
    dispatch={store.dispatch}
  />)

  wrapper.instance().startFighting()

  const actions = store.getActions()

  expect(actions).toHaveLength(1)

  expect(actions[0]).toEqual({
    type: 'SHAMAN_START_BUFF'
  })
})
