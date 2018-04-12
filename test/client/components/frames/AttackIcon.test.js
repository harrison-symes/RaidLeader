import {AttackIcon} from '../../../../client/components/frames/AttackIcon'

import React from 'react'
import {shallow, mount} from 'enzyme'
import clone from 'clone'

import configureStore from  'redux-mock-store'

const mockStore = configureStore([])

// jest.mock('document', () => {
//   getElementById: () => ({
//
//   })
// })

test('getTargetFrame', () => {
  document.getElementById = (target) => ({
      getBoundingClientRect: () => ({
        target,
        left: 0,
        top: 0
      })
  })
  const wrapper = shallow(<AttackIcon
    svg = {{
      target: null,
      startX: 100,
      startY: 200,
      info: {
        icon: 'fake-icon',
        rotation: 90
      }
    }}
  />)

  const actual = wrapper.instance().getTargetFrame()
  expect(actual).toEqual({
    top: 0,
    left: 0,
    target: 'BossIcon'
  })

})

test('getTargetFrame (with target)', () => {
  document.getElementById = (target) => ({
      getBoundingClientRect: () => ({
        target,
        left: 0,
        top: 0
      })
  })
  const wrapper = shallow(<AttackIcon
    svg = {{
      target: {id: 1},
      startX: 100,
      startY: 200,
      info: {
        icon: 'fake-icon',
        rotation: 90
      }
    }}
  />)
  // wrapper.instance().constructor = () => ({})

  // console.log(wrapper.instance().getTargetFrame());
  const actual = wrapper.instance().getTargetFrame({id: 1})
  expect(actual).toEqual({
    top: 0,
    left: 0,
    target: 'Recruit-1'
  })

})


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
})

test('constructor (no X and Y)', () => {
  AttackIcon.prototype.getTargetFrame = (target) => target
    ? {left: 0, top: 0}
    : {left: 1, top: 1}

  const svg = {
    target: null,
    info: {
      icon: 'fake-icon',
      rotation: 90
    }
  }

  const wrapper = shallow(<AttackIcon
    svg={svg}
  />)

  expect(wrapper.instance().state).toEqual({
    x: 10,
    y: 10,
    targetY: 1,
    targetX: 1,
    speedY: (10 - 1) / 100,
    speedX: (10 - 1) / 100,
    rotation: 90
  })

  expect(wrapper.instance().interval).toBe(false)
})

test('constructor (with target)', () => {
  AttackIcon.prototype.getTargetFrame = (target) => target
    ? {left: 0, top: 0}
    : {left: 1, top: 1}

  const svg = {
    target: {thing: 'something', id: 1},
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
    targetY: 0,
    targetX: 0,
    speedY: 2,
    speedX: 1,
    rotation: 90
  })

  expect(wrapper.instance().interval).toBe(false)

})

test('componentUnmount with interval', () => {

  const svg = {
    target: {thing: 'something', id: 1},
    startX: 100,
    startY: 200,
    info: {
      icon: 'fake-icon',
      rotation: 90
    }
  }

  const wrapper = shallow(<AttackIcon svg={svg} />)

  wrapper.instance().render = () => <div></div>

  wrapper.instance().interval = 'test thing'

  wrapper.instance().componentWillUnmount()

  expect(wrapper.instance().interval).toBe(false)
})

test('componentUnmount without interval', () => {

  const svg = {
    target: {thing: 'something', id: 1},
    startX: 100,
    startY: 200,
    info: {
      icon: 'fake-icon',
      rotation: 90
    }
  }

  const wrapper = shallow(<AttackIcon svg={svg} />)

  wrapper.instance().render = () => <div></div>

  wrapper.instance().interval = false

  wrapper.instance().componentWillUnmount()

  expect(wrapper.instance().interval).toBe(false)
})

test('componentDidMount', (done) => {

  const svg = {
    target: {thing: 'something', id: 1},
    startX: 100,
    startY: 200,
    info: {
      icon: 'fake-icon',
      rotation: 90
    }
  }

  const wrapper = shallow(<AttackIcon svg={svg} />)

  wrapper.instance().render = () => <div></div>

  const mockEndTick = jest.fn()

  wrapper.instance().endTick = mockEndTick

  wrapper.instance().componentDidMount()

  expect(wrapper.instance().interval).toBeTruthy()

  setTimeout(() => {
    expect(mockEndTick.mock.calls).toHaveLength(1)
    done()
  }, 10)
})

test('render', () => {
  AttackIcon.prototype.getTargetFrame = (target) => target
    ? {left: 0, top: 0}
    : {left: 1, top: 1}

  const svg = {
    target: {thing: 'something', id: 1},
    startX: 100,
    startY: 200,
    info: {
      icon: 'fake-icon',
      rotation: 90,
      colour: 'purple'
    }
  }

  const wrapper = shallow(<AttackIcon
    svg={svg}
  />)

  const icon = wrapper.find('i')
  expect(icon.hasClass('fake-icon')).toBeTruthy()
  expect(icon.prop('style')).toHaveProperty('transform', 'rotate(90deg)')
  expect(icon.prop('style')).toHaveProperty('color', 'purple')
  expect(icon.prop('style')).toHaveProperty('position', 'fixed')
  expect(icon.prop('style')).toHaveProperty('top', 200)
  expect(icon.prop('style')).toHaveProperty('left', 100)


  expect(wrapper.instance().interval).toBe(false)

})

test('endTick moveToTarget', () => {
  const state = {
    y: 100,
    x: 100,
    targetX: 0,
    targetY: 0,
    speedY: 1,
    speedX: 1,
    rotation: 90
  }

  const svg = {
    target: {thing: 'something', id: 1},
    startX: 100,
    startY: 200,
    info: {
      icon: 'fake-icon',
      rotation: 90,
      colour: 'purple',
      rotates: false
    }
  }

  const wrapper = shallow(<AttackIcon
    svg={svg}
  />)

  wrapper.instance().state = state

  wrapper.instance().interval = 'something'

  const mockSetState = jest.fn()
  wrapper.instance().setState = mockSetState

  wrapper.instance().endTick()

  expect(mockSetState.mock.calls).toHaveLength(1)
  expect(mockSetState.mock.calls[0][0]).toEqual({
    y: 99,
    x: 99,
    rotation: 90
  })

})

test('endTick moveToTarget rotates ', () => {
  const state = {
    y: 100,
    x: 100,
    targetX: 0,
    targetY: 0,
    speedY: 1,
    speedX: 2,
    rotation: 90
  }

  const svg = {
    target: {thing: 'something', id: 1},
    startX: 100,
    startY: 200,
    info: {
      icon: 'fake-icon',
      rotation: 90,
      colour: 'purple',
      rotates: true
    }
  }

  const wrapper = shallow(<AttackIcon
    svg={svg}
  />)

  wrapper.instance().state = state

  wrapper.instance().interval = 'something'

  const mockSetState = jest.fn()
  wrapper.instance().setState = mockSetState

  wrapper.instance().endTick()

  expect(mockSetState.mock.calls).toHaveLength(1)
  expect(mockSetState.mock.calls[0][0]).toEqual({
    y: 99,
    x: 98,
    rotation: 120
  })

})

test('endTick moveToTarget x cap ', () => {
  const state = {
    y: 100,
    x: 0,
    targetX: 0,
    targetY: 0,
    speedY: 1,
    speedX: 1,
    rotation: 90
  }

  const svg = {
    target: {thing: 'something', id: 1},
    startX: 100,
    startY: 200,
    info: {
      icon: 'fake-icon',
      rotation: 90,
      colour: 'purple',
      rotates: true
    }
  }

  const wrapper = shallow(<AttackIcon
    svg={svg}
  />)

  wrapper.instance().state = state

  wrapper.instance().interval = 'something'

  const mockSetState = jest.fn()
  wrapper.instance().setState = mockSetState

  wrapper.instance().endTick()

  expect(mockSetState.mock.calls).toHaveLength(1)
  expect(mockSetState.mock.calls[0][0]).toEqual({
    y: 99,
    x: state.x,
    rotation: 120
  })

})

test('endTick moveToTarget y cap ', () => {
  const state = {
    y: 0,
    x: 100,
    targetX: 0,
    targetY: 0,
    speedY: 1,
    speedX: 1,
    rotation: 90
  }

  const svg = {
    target: {thing: 'something', id: 1},
    startX: 100,
    startY: 200,
    info: {
      icon: 'fake-icon',
      rotation: 90,
      colour: 'purple',
      rotates: true
    }
  }

  const wrapper = shallow(<AttackIcon
    svg={svg}
  />)

  wrapper.instance().state = state

  wrapper.instance().interval = 'something'

  const mockSetState = jest.fn()
  wrapper.instance().setState = mockSetState

  wrapper.instance().endTick()

  expect(mockSetState.mock.calls).toHaveLength(1)
  expect(mockSetState.mock.calls[0][0]).toEqual({
    y: state.y,
    x: 99,
    rotation: 120
  })

})

test('endTick meets target', () => {
  const store = mockStore()

  const state = {
    y: 1,
    x: 1,
    targetX: 0,
    targetY: 0,
    speedY: 1,
    speedX: 1,
    rotation: 90
  }

  const svg = {
    target: {thing: 'something', id: 1},
    startX: 100,
    startY: 200,
    info: {
      icon: 'fake-icon',
      rotation: 90,
      colour: 'purple',
      rotates: true
    }
  }
  const mockDeleteSVG = jest.fn()

  const wrapper = shallow(<AttackIcon
    svg={svg}
    dispatch={store.dispatch}
    deleteSVG={mockDeleteSVG}
  />)

  wrapper.instance().state = state

  wrapper.instance().interval = 'something'

  const mockSetState = jest.fn()
  wrapper.instance().setState = mockSetState

  wrapper.instance().endTick()

  expect(mockSetState.mock.calls).toHaveLength(0)
  expect(mockDeleteSVG.mock.calls).toHaveLength(1)
  expect(mockDeleteSVG.mock.calls[0][0]).toEqual(svg)
})

test('endTick no interval', () => {
  const store = mockStore()

  const state = {
    y: 1,
    x: 1,
    targetX: 0,
    targetY: 0,
    speedY: 1,
    speedX: 1,
    rotation: 90
  }

  const svg = {
    target: {thing: 'something', id: 1},
    startX: 100,
    startY: 200,
    info: {
      icon: 'fake-icon',
      rotation: 90,
      colour: 'purple',
      rotates: true
    }
  }
  const mockDeleteSVG = jest.fn()

  const wrapper = shallow(<AttackIcon
    svg={svg}
    dispatch={store.dispatch}
    deleteSVG={mockDeleteSVG}
  />)

  wrapper.instance().state = state

  wrapper.instance().interval = null

  const mockSetState = jest.fn()
  wrapper.instance().setState = mockSetState

  wrapper.instance().endTick()

  expect(mockSetState.mock.calls).toHaveLength(0)
  expect(mockDeleteSVG.mock.calls).toHaveLength(0)
})
