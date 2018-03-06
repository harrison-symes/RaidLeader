import {EffectTag, mapStateToProps} from '../../../../client/components/frames/EffectTag'

import React from 'react'
import {shallow, mount} from 'enzyme'
import clone from 'clone'


test('effectTag render', () => {
  //arrange
  const state = {
    remaining: 1
  }

  const effect = {
    name: 'Test',
    duration: 15,
    colour: 'purple',
    icon: 'fake-icon'
  }

  const target = {id: 1, name: 'Jeff', effects: [effect], isAlive: true}

  const wrapper = shallow(<EffectTag
    effect={effect}
    target={target}
  />)

  wrapper.instance().state = state
  wrapper.instance().render()
  const style = wrapper.find('div').prop('style')

  expect(style).toHaveProperty('backgroundColor': 'purple')
  expect(style).toHaveProperty('borderColor': 'black')
  expect(wrapper.find('i').hasClass('fake-icon')).toBeTruthy()

})

test('mapStateToProps', () => {
  const state = {
    party: [{
      id: 1, name: 'Jeff'
    }],
    started: true
  }

  const actual = mapStateToProps({
    ...state,
    otherThing: 'lol',
    fakeStuff: 'xd'
  })
  expect(actual).toEqual(state)
})
