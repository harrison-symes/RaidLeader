import nock from 'nock'

jest.mock('../../../client/utils/dungeonInfo', () => (name, isCompleted) => ({
  name,
  isCompleted,
  description: 'Fake Dungeon',
  bosses: [
    'Boss1'
  ]
}))

jest.mock('../../../client/utils/bosses/bosses', () => (name) => ({
  name
}))

import {receiveDungeonsAction, completeDungeonAction} from '../../../client/actions/dungeons'

test('Receive Dungeons Action', () => {
  const fake1 = {
    id: 1,
    name: 'Fake 1',
    isCompleted: false,

  }
  const fake2 = {
    id: 2,
    name: 'Fake 2',
    isCompleted: true,
    bosses: [
      'Boss2'
    ]
  }
  const fakeDungeonArr = [
    fake1,
    fake2
  ]

  const expectedArr = [
    {
      ...fake1,
      type: 'Dungeon',
      description: 'Fake Dungeon',
      bosses: [
        {name: 'Boss1'}
      ]
    },
    {
      ...fake2,
      type: 'Dungeon',
      description: 'Fake Dungeon',
      bosses: [
        {name: 'Boss1'}
      ]
    }
  ]

  const actual = receiveDungeonsAction(fakeDungeonArr)

  expect(actual.dungeons).toEqual(expectedArr)
  expect(actual.type).toBe('RECEIVE_DUNGEONS')
})
