import {EffectTag} from '../../../../client/components/frames/EffectTag'

import React from 'react'
import {shallow, mount} from 'enzyme'
import {Provider} from 'react-redux'
import clone from 'clone'
import configureStore from  'redux-mock-store'

const mockStore = configureStore([])

test('effectTag initial state', () => {

  const effect = {
    name: 'Test',
    icon: 'fake-icon',
    duration: 15
  }

  EffectTag.prototype.render = () => <div></div>

  const wrapper = shallow(<EffectTag effect={effect} />)

  expect(wrapper.state()).toEqual({
    currentDuration: 0,
    remaining: effect.duration,
    ticks: 0,
    interval: null
  })

})

test('effectTag componentDidMount', () => {

  const mockFunction = jest.fn()

  const effect = {
    name: 'Test',
    icon: 'fake-icon',
    duration: 15
  }

  EffectTag.prototype.render = () => <div></div>
  EffectTag.prototype.startEffect = () => mockFunction()

  const wrapper = mount(<EffectTag effect={effect} />)

  expect(mockFunction.mock.calls).toHaveLength(1)

})

test('effectTag receiveProps (new effect)', () => {

  const mockFunction = jest.fn()

  const effect = {
    name: 'Test',
    icon: 'fake-icon',
    duration: 15
  }

  const newEffect = {
    ...effect
  }

  const fakeState = {
    remaining: 15,
  }

  EffectTag.prototype.render = () => <div></div>
  EffectTag.prototype.setState = mockFunction

  const wrapper = shallow(<EffectTag effect={effect} />)

  wrapper.instance().state = fakeState

  wrapper.instance().componentWillReceiveProps({effect: newEffect})

  expect(wrapper.state()).toEqual(fakeState)
  expect(mockFunction.mock.calls).toHaveLength(1)
  expect(mockFunction.mock.calls[0][0]).toEqual({remaining: 30})

})

test('effectTag receiveProps (new effect over double)', () => {

  const mockFunction = jest.fn()

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
  EffectTag.prototype.setState = mockFunction

  const wrapper = shallow(<EffectTag effect={effect} />)

  wrapper.instance().state = fakeState

  wrapper.instance().componentWillReceiveProps({effect: newEffect})

  expect(wrapper.state()).toEqual(fakeState)
  expect(mockFunction.mock.calls).  toHaveLength(1)
  expect(mockFunction.mock.calls[0][0]).toEqual({remaining: 30})

})

test('effectTag receiveProps (not new effect)', () => {

  const mockFunction = jest.fn()

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
  EffectTag.prototype.setState = mockFunction

  const wrapper = shallow(<EffectTag effect={effect} />)

  wrapper.instance().state = fakeState

  wrapper.instance().componentWillReceiveProps({effect: effect})

  expect(wrapper.state()).toEqual(fakeState)
  expect(mockFunction.mock.calls).  toHaveLength(0)

})

test('effectTag receiveProps (no props effect)', () => {

  const mockFunction = jest.fn()

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
  EffectTag.prototype.setState = mockFunction

  const wrapper = shallow(<EffectTag effect={effect} />)

  wrapper.instance().state = fakeState

  wrapper.instance().componentWillReceiveProps({})

  expect(wrapper.state()).toEqual(fakeState)
  expect(mockFunction.mock.calls).  toHaveLength(0)
})
