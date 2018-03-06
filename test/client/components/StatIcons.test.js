import React from 'react'
import {shallow, mount} from 'enzyme'

import {DeadRecruitIcon, PlayerIcon, HealthIcon} from '../../../client/components/icons/StatIcons'

jest.mock('react-tippy', () => ({
  Tooltip: ({html, children}) => <div>
    {html}
    {children}
  </div>
}))

test('DeadRecruitIcon', () => {
  const wrapper =  mount(<DeadRecruitIcon name="Jeff" />)

  expect(wrapper.find('p').text()).toBe('Jeff has Died')
  expect(wrapper.find('i').hasClass('icon')).toBeTruthy()
  expect(wrapper.find('i').hasClass('ra')).toBeTruthy()
  expect(wrapper.find('i').hasClass('ra-tombstone')).toBeTruthy()
})

test('PlayerIcon', () => {
  const wrapper =  mount(<PlayerIcon name="Jeff" />)

  expect(wrapper.find('p').text()).toBe('Jeff')

  expect(wrapper.find('i').hasClass('icon')).toBeTruthy()
  expect(wrapper.find('i').hasClass('ra')).toBeTruthy()
  expect(wrapper.find('i').hasClass('ra-player-king')).toBeTruthy()
})

test('HealthIcon', () => {
  const wrapper =  mount(<HealthIcon value={100} />)

  expect(wrapper.find('p').text()).toBe('100 Health')

  expect(wrapper.find('span').text()).toBe('100')

  expect(wrapper.find('i').hasClass('icon')).toBeTruthy()
  expect(wrapper.find('i').hasClass('ra')).toBeTruthy()
  expect(wrapper.find('i').hasClass('ra-two-hearts')).toBeTruthy()
})
