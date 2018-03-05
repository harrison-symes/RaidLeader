import {Warrior} from '../../../../client/components/classes/Warrior'
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
  initHp: 100,
  hp: 100,
  bossTarget: member
}

test('Warrior attack basic success', () => {
  const store = mockStore()
  Warrior.prototype.render = () => <div></div>

  const wrapper = shallow(<Warrior
    member={clone(member)}
    boss={boss}
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

test('Warrior attack taunt weapon', () => {
  const store = mockStore()
  Warrior.prototype.render = () => <div></div>

  const fakeMember = {
    ...member,
    weapon_effect: 'taunt'
  }

  const wrapper = shallow(<Warrior
    member={fakeMember}
    boss={boss}
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

test('Warrior attack low boss health', () => {
  const store = mockStore()
  Warrior.prototype.render = () => <div></div>

  const fakeBoss = {
    ...boss,
    hp: 24
  }

  const wrapper = shallow(<Warrior
    member={clone(member)}
    boss={fakeBoss}
    started={true}
    dispatch={store.dispatch}
  />)

  wrapper.instance().finishCast()

  const actions = store.getActions()

  expect(actions).toHaveLength(1)

  expect(actions[0]).toEqual({
    type: 'CRITICAL_ATTACK_BOSS',
    power: 10
  })
})

test('Warrior attack not alive', () => {
  const store = mockStore()
  Warrior.prototype.render = () => <div></div>

  const fakeMember = {
    ...member,
    isAlive: false
  }

  const wrapper = shallow(<Warrior
    member={fakeMember}
    boss={boss}
    started={true}
    dispatch={store.dispatch}
  />)

  wrapper.instance().finishCast()

  const actions = store.getActions()

  expect(actions).toHaveLength(0)
})

test('Warrior startFighting', () => {
  const store = mockStore()
  Warrior.prototype.render = () =>  <div></div>
  Warrior.prototype.startCast = () => ({})

  const wrapper = shallow(<Warrior
    member={member}
    started={true}
    dispatch={store.dispatch}
  />)

  wrapper.instance().startFighting()

  const actions = store.getActions()

  expect(actions).toHaveLength(1)

  expect(actions[0]).toEqual({
    type: 'WARRIOR_START_BUFF',
    target: member
  })
})
