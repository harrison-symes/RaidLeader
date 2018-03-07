import {Paladin} from '../../../../client/components/classes/Paladin'
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

test('Paladin attack basic success', () => {
  const store = mockStore()
  Paladin.prototype.render = function () {
    return <div></div>
  }

  const wrapper = shallow(<Paladin
    member={clone(member)}
    boss={clone(boss)}
    started={true}
    dispatch={store.dispatch}
  />)
  wrapper.instance().finishCast()

  const actions = store.getActions()

  expect(actions).toHaveLength(3)

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

test('Paladin attack not boss target', () => {
  const store = mockStore()
  Paladin.prototype.render = function () {
    return <div></div>
  }

  const fakeBoss = {
    ...boss,
    bossTarget: null
  }

  const wrapper = shallow(<Paladin
    member={clone(member)}
    boss={fakeBoss}
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
    type: 'BOSS_CHANGE_TARGET',
    target: member
  })

})

test('Paladin attack with noTaunt (boss target)', () => {
  const store = mockStore()
  Paladin.prototype.render = function () {
    return <div></div>
  }

  const fakeMember = {
    ...member,
    weapon_effect: 'noTaunt'
  }

  const wrapper = shallow(<Paladin
    member={fakeMember}
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
    type: 'HEAL_FRIENDLY_TARGET',
    target: fakeMember,
    power: 10
  })

})

test('Paladin attack with noTaunt (boss target)', () => {
  const store = mockStore()
  Paladin.prototype.render = function () {
    return <div></div>
  }

  const fakeMember = {
    ...member,
    weapon_effect: 'noTaunt'
  }

  const fakeBoss = {
    ...boss,
    bossTarget: null
  }

  const wrapper = shallow(<Paladin
    member={fakeMember}
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
    type: 'HEAL_FRIENDLY_TARGET',
    target: fakeMember,
    power: 10
  })

})

test('Paladin dead finishCast', () => {
  const store = mockStore()
  Paladin.prototype.render = function () {
    return <div></div>
  }

  const fakeMember = {
    ...member,
    isAlive: false
  }
  const wrapper = shallow(<Paladin
    member={fakeMember}
    started={true}
    dispatch={store.dispatch}
  />)

  wrapper.instance().finishCast()
  const actions = store.getActions()

  expect(actions).toHaveLength(0)
})

test('Paladin dead finishCast', () => {
  const store = mockStore()
  Paladin.prototype.render = function () {
    return <div></div>
  }

  const fakeMember = {
    ...member,
    isAlive: false
  }
  const wrapper = shallow(<Paladin
    member={fakeMember}
    started={true}
    dispatch={store.dispatch}
  />)

  wrapper.instance().finishCast()
  const actions = store.getActions()

  expect(actions).toHaveLength(0)
})

test('Paladin startFighting', () => {
  const store = mockStore()
  Paladin.prototype.render = function () {
    return <div></div>
  }

  const fakeMember = {
    ...member
  }
  const wrapper = shallow(<Paladin
    member={fakeMember}
    started={true}
    dispatch={store.dispatch}
  />)

  wrapper.instance().startFighting()
  const actions = store.getActions()

  expect(actions).toHaveLength(1)

  expect(actions[0]).toEqual({
    type: 'PALADIN_START_BUFF',
    target: fakeMember
  })
})
