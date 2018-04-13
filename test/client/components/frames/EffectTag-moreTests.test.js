import {EffectTag} from '../../../../client/components/frames/EffectTag'

import React from 'react'
import {shallow, mount} from 'enzyme'
import {Provider} from 'react-redux'
import clone from 'clone'
import configureStore from  'redux-mock-store'

const mockStore = configureStore([])

test('effectTag startEffect)', () => {
  //arrange

  const effect = {
    name: 'Test',
    icon: 'fake-icon',
    duration: 15
  }

  const newEffect = {
    ...effect
  }

  const fakeState = {
    remaining: 30,
  }

  EffectTag.prototype.render = () => <div></div>

  const wrapper = shallow(<EffectTag effect={effect} />)

  wrapper.instance().state = fakeState

  const mockSetState = jest.fn()
  wrapper.instance().setState = mockSetState

  const mockStartSecond = jest.fn()
  wrapper.instance().startSecond = mockStartSecond

  //act
  wrapper.instance().startEffect()

  //assert
  expect(wrapper.state()).toEqual(fakeState)

  expect(mockSetState.mock.calls).  toHaveLength(1)
  expect(mockSetState.mock.calls[0][0]).toEqual({
    currentDuration: 0,
    remaining: 15,
    ticks: 0
  })

  expect(mockStartSecond.mock.calls).toHaveLength(1)
})

test('effectTag startEffect', (done) => {
  //arrange
  const mockStartSecond = jest.fn()
  const mockSetState = jest.fn()

  const effect = {
    name: 'Test',
    icon: 'fake-icon',
    duration: 15
  }

  const party = [
    {id: 1, name: 'Jeff', effects: [effect]}
  ]

  EffectTag.prototype.render = () => <div></div>

  const wrapper = shallow(<EffectTag effect={effect} party={party} target={party[0]}/>)

  const mockTickSecond = jest.fn()

  wrapper.instance().tickSecond = mockTickSecond

  //act
  wrapper.instance().startSecond()
  setTimeout(() => {
    expect(mockTickSecond.mock.calls).toHaveLength(1)
    done()
  }, 1000)

})

test('effectTag startEffect (effect deleted)', (done) => {
  //arrange
  const mockStartSecond = jest.fn()
  const mockSetState = jest.fn()

  const effect = {
    name: 'Test',
    icon: 'fake-icon',
    duration: 15
  }

  const party = [
    {id: 1, name: 'Jeff', effects: []}
  ]

  EffectTag.prototype.render = () => <div></div>

  const wrapper = shallow(<EffectTag effect={effect} party={party} target={party[0]}/>)

  const mockTickSecond = jest.fn()

  wrapper.instance().tickSecond = mockTickSecond

  //act
  wrapper.instance().startSecond()
  setTimeout(() => {
    expect(mockTickSecond.mock.calls).toHaveLength(0)
    done()
  }, 1000)

})

test('effectTag tickSecond (success no tick)', () => {
  //arrange
  const store = mockStore()

  const state = {
    remaining: 15,
    ticks: 0
  }

  const effect = {
    name: 'Test',
    icon: 'fake-icon',
    duration: 15,
    tickRate: 3
  }

  const party = [
    {id: 1, name: 'Jeff', effects: [effect], isAlive: true}
  ]

  EffectTag.prototype.render = () => <div></div>

  const wrapper = shallow(<EffectTag
    effect={effect}
    party={party}
    target={party[0]}
    dispatch={store.dispatch}
    started={true}
  />)

  const mockStartSecond = jest.fn()
  wrapper.instance().startSecond = mockStartSecond

  const mockSetState = jest.fn()
  wrapper.instance().setState = mockSetState

  //act
  wrapper.instance().tickSecond()

  expect(mockSetState.mock.calls).toHaveLength(1)
  expect(mockSetState.mock.calls[0][0]).toEqual({
    remaining: state.remaining - 1,
    ticks: state.ticks + 1
  })

  expect(mockStartSecond.mock.calls).toHaveLength(1)

  const actions = store.getActions()

  expect(actions).toHaveLength(0)
})

// test('effectTag tickSecond (success tick)', () => {
//   //arrange
//   const store = mockStore()
//
//   const state = {
//     remaining: 3,
//     ticks: 5
//   }
//
//   const effect = {
//     name: 'Test',
//     icon: 'fake-icon',
//     duration: 15,
//     tickRate: 3,
//     type: 'FAKE_TYPE'
//   }
//
//   const party = [
//     {id: 1, name: 'Jeff', effects: [effect], isAlive: true}
//   ]
//
//   EffectTag.prototype.render = () => <div></div>
//
//   const wrapper = shallow(<EffectTag
//     effect={effect}
//     party={party}
//     target={party[0]}
//     dispatch={store.dispatch}
//     started={true}
//   />)
//
//   wrapper.instance().state = state
//
//   const mockStartSecond = jest.fn()
//   wrapper.instance().startSecond = mockStartSecond
//
//   const mockSetState = jest.fn()
//   wrapper.instance().setState = mockSetState
//
//   //act
//   wrapper.instance().tickSecond()
//
//   expect(mockSetState.mock.calls).toHaveLength(1)
//   expect(mockSetState.mock.calls[0][0]).toEqual({
//     ticks: 6,
//     remaining: state.remaining - 1
//   })
//
//   expect(mockStartSecond.mock.calls).toHaveLength(1)
//
//   const actions = store.getActions()
//   expect(actions[0]).toEqual({
//     type: effect.type,
//     power: effect.power,
//     percentage: effect.percentage,
//     target: party[0]
//   })
// })

test('effectTag tickSecond (success tick, 0s remaining)', () => {
  //arrange
  const store = mockStore()

  const state = {
    remaining: 1,
    ticks: 3
  }

  const effect = {
    name: 'Test',
    icon: 'fake-icon',
    duration: 15,
    tickRate: 3,
    type: 'FAKE_TYPE'
  }

  const party = [
    {id: 1, name: 'Jeff', effects: [effect], isAlive: true}
  ]

  EffectTag.prototype.render = () => <div></div>

  const wrapper = shallow(<EffectTag
    effect={effect}
    party={party}
    target={party[0]}
    dispatch={store.dispatch}
    started={true}
  />)

  wrapper.instance().state = state

  const mockStartSecond = jest.fn()
  wrapper.instance().startSecond = mockStartSecond

  const mockSetState = jest.fn()
  wrapper.instance().setState = mockSetState

  //act
  wrapper.instance().tickSecond()

  expect(mockSetState.mock.calls).toHaveLength(0)

  expect(mockStartSecond.mock.calls).toHaveLength(0)

  const actions = store.getActions()
  expect(actions).toHaveLength(1)
  // expect(actions[0]).toEqual({
  //   type: effect.type,
  //   power: effect.power,
  //   percentage: effect.percentage,
  //   target: party[0]
  // })
  expect(actions[0]).toEqual({
    type: 'REMOVE_EFFECT_FROM_TARGET',
    target: party[0],
    effect
  })
})

test('effectTag tickSecond (no tick, 0s remaining)', () => {
  //arrange
  const store = mockStore()

  const state = {
    remaining: 1,
    ticks: 0
  }

  const effect = {
    name: 'Test',
    icon: 'fake-icon',
    duration: 15,
    tickRate: 3,
    type: 'FAKE_TYPE'
  }

  const party = [
    {id: 1, name: 'Jeff', effects: [effect], isAlive: true}
  ]

  EffectTag.prototype.render = () => <div></div>

  const wrapper = shallow(<EffectTag
    effect={effect}
    party={party}
    target={party[0]}
    dispatch={store.dispatch}
    started={true}
  />)

  wrapper.instance().state = state

  const mockStartSecond = jest.fn()
  wrapper.instance().startSecond = mockStartSecond

  const mockSetState = jest.fn()
  wrapper.instance().setState = mockSetState

  //act
  wrapper.instance().tickSecond()

  expect(mockSetState.mock.calls).toHaveLength(0)

  expect(mockStartSecond.mock.calls).toHaveLength(0)

  const actions = store.getActions()
  expect(actions).toHaveLength(1)

  expect(actions[0]).toEqual({
    type: 'REMOVE_EFFECT_FROM_TARGET',
    target: party[0],
    effect
  })
})

test('effectTag tickSecond (effect removed)', () => {
  //arrange
  const store = mockStore()

  const state = {
    remaining: 1,
    ticks: 0
  }

  const effect = {
    name: 'Test',
    icon: 'fake-icon',
    duration: 15,
    tickRate: 3,
    type: 'FAKE_TYPE'
  }

  const party = [
    {id: 1, name: 'Jeff', effects: [], isAlive: true}
  ]

  EffectTag.prototype.render = () => <div></div>

  const wrapper = shallow(<EffectTag
    effect={effect}
    party={party}
    target={party[0]}
    dispatch={store.dispatch}
    started={true}
  />)

  wrapper.instance().state = state

  const mockStartSecond = jest.fn()
  wrapper.instance().startSecond = mockStartSecond

  const mockSetState = jest.fn()
  wrapper.instance().setState = mockSetState

  //act
  wrapper.instance().tickSecond()

  expect(mockSetState.mock.calls).toHaveLength(0)

  expect(mockStartSecond.mock.calls).toHaveLength(0)

  const actions = store.getActions()
  expect(actions).toHaveLength(0)

})

test('effectTag tickSecond (target dead)', () => {
  //arrange
  const store = mockStore()

  const state = {
    remaining: 1,
    ticks: 0
  }

  const effect = {
    name: 'Test',
    icon: 'fake-icon',
    duration: 15,
    tickRate: 3,
    type: 'FAKE_TYPE'
  }

  const party = [
    {id: 1, name: 'Jeff', effects: [effect], isAlive: false}
  ]

  EffectTag.prototype.render = () => <div></div>

  const wrapper = shallow(<EffectTag
    effect={effect}
    party={party}
    target={party[0]}
    dispatch={store.dispatch}
    started={true}
  />)

  wrapper.instance().state = state

  const mockStartSecond = jest.fn()
  wrapper.instance().startSecond = mockStartSecond

  const mockSetState = jest.fn()
  wrapper.instance().setState = mockSetState

  //act
  wrapper.instance().tickSecond()

  expect(mockSetState.mock.calls).toHaveLength(0)

  expect(mockStartSecond.mock.calls).toHaveLength(0)

  const actions = store.getActions()
  expect(actions).toHaveLength(1)

  expect(actions[0]).toEqual({
    type: 'REMOVE_EFFECT_FROM_TARGET',
    target: party[0],
    effect
  })

})

test('effectTag tickSecond (game ended)', () => {
  //arrange
  const store = mockStore()

  const state = {
    remaining: 1,
    ticks: 0
  }

  const effect = {
    name: 'Test',
    icon: 'fake-icon',
    duration: 15,
    tickRate: 3,
    type: 'FAKE_TYPE'
  }

  const party = [
    {id: 1, name: 'Jeff', effects: [effect], isAlive: true}
  ]

  EffectTag.prototype.render = () => <div></div>

  const wrapper = shallow(<EffectTag
    effect={effect}
    party={party}
    target={party[0]}
    dispatch={store.dispatch}
    started={false}
  />)

  wrapper.instance().state = state

  const mockStartSecond = jest.fn()
  wrapper.instance().startSecond = mockStartSecond

  const mockSetState = jest.fn()
  wrapper.instance().setState = mockSetState

  //act
  wrapper.instance().tickSecond()

  expect(mockSetState.mock.calls).toHaveLength(0)

  expect(mockStartSecond.mock.calls).toHaveLength(0)

  const actions = store.getActions()
  expect(actions).toHaveLength(1)

  expect(actions[0]).toEqual({
    type: 'REMOVE_EFFECT_FROM_TARGET',
    target: party[0],
    effect
  })

})

test('effectTag render', () => {
  //arrange
  const state = {
    remaining: 1
  }

  const effect = {
    name: 'Test',
    duration: 15,
    colour: 'purple'
  }

  const target = {id: 1, name: 'Jeff', effects: [effect], isAlive: true}

  const wrapper = shallow(<EffectTag
    effect={effect}
    target={target}
  />)

  wrapper.instance().state = state
})
