import {AttackIcon} from '../../../../client/components/frames/AttackIcon'

import React from 'react'
import {shallow, mount} from 'enzyme'
import clone from 'clone'


test('constructor (no target)', () => {
  AttackIcon.prototype.getTargetFrame = (target) => target
    ? {left: 0, top: 0}
    : {left: 1, top: 1}

  const svg = {
    target: null,
    startX: 100,
    startY: 200,
    info: {
      icon: 'fake-icon',
      rotation: 90
    }
  }

  const wrapper = shallow(<AttackIcon
    svg={svg}
  />)

  expect(wrapper.instance().state).toEqual({
    x: 100,
    y: 200,
    targetY: 1,
    targetX: 1,
    speedY: (200 - 1) / 100,
    speedX: (100 - 1) / 100,
    rotation: 90
  })

  expect(wrapper.instance().interval).toBe(false)

  console.log(wrapper.instance().state);

})
