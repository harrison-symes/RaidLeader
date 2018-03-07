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

test('Priest startCast success', (done) => {
  const store = mockStore()
  Priest.prototype.render = () =>  <div></div>

  const mockCall = jest.fn()
  mockCall()
  Priest.prototype.findTarget = () => {
    mockCall()
    expect(mockCall.mock.calls).toHaveLength(2)
    const timestamps = mockCall.mock.timestamps
    const timeout = timestamps[1] - timestamps[0]
    expect(timeout < 1100).toBeTruthy()
    expect(timeout > 1000).toBeTruthy()
    done()
  }

  const wrapper = shallow(<Priest
    member={member}
    started={true}
    dispatch={store.dispatch}
  />)

  wrapper.instance().startCast()

  const actions = store.getActions()

  expect(actions).toHaveLength(0)
})

test('Priest startCast not started', () => {
  const store = mockStore()
  Priest.prototype.render = () =>  <div></div>

  const mockCall = jest.fn()

  Priest.prototype.findTarget = mockCall

  const wrapper = shallow(<Priest
    member={member}
    started={false}
    dispatch={store.dispatch}
  />)

  wrapper.instance().startCast()


  expect(mockCall.mock.calls).toHaveLength(0)
  const actions = store.getActions()

  expect(actions).toHaveLength(0)
})

test('Priest startCast not alive', () => {
  const store = mockStore()
  Priest.prototype.render = () =>  <div></div>

  const mockCall = jest.fn()

  Priest.prototype.findTarget = mockCall

  const wrapper = shallow(<Priest
    member={{
      ...member,
      isAlive: false
    }}
    started={true}
    dispatch={store.dispatch}
  />)

  wrapper.instance().startCast()


  expect(mockCall.mock.calls).toHaveLength(0)
  const actions = store.getActions()

  expect(actions).toHaveLength(0)
})
