import nock from 'nock'

import configureStore from  'redux-mock-store'

const mockStore = configureStore([])

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

jest.mock('../../../client/utils/localstorage', () => ({
  get: (thing) => ({
    thing
  })
}))

jest.mock('jwt-decode', () => () => 'token')

import {receiveDungeonsAction, completeDungeonAction, getDungeons} from '../../../client/actions/dungeons'

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

test('Receive Dungeons Action', () => {

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

test('GET Dungeons', () => {
  // const store = mockStore()

  const scope = nock('http://localhost:80')
  .get('/api/v1/dungeons')
  .reply(200, fakeDungeonArr)

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

  const expectedAction = {
    type: 'RECEIVE_DUNGEONS',
    dungeons: expectedArr
  }

  const dispatch = jest.fn()
   .mockImplementationOnce(action => {
     expect(action).toEqual(expectedAction)
     scope.done()
   })


  getDungeons()(dispatch)

})

test('Complete Dungeon Action', () => {
  const fakeDungeon = {
    name: 'Fake'
  }
  const expected = {
    type: 'DUNGEON_COMPLETE',
    dungeon: fakeDungeon
  }
  const actual = completeDungeonAction(fakeDungeon)

  expect(actual).toEqual(expected)
})

test('Complete Dungeon Post Request', () => {
  const fakeDungeon = {
    name: 'Fake'
  }
  const expectedAction = {
    type: 'DUNGEON_COMPLETE',
    dungeon: fakeDungeon
  }
  const scope = nock('http://localhost:80')
  .get('/api/v1/dungeons')
  .reply(200, fakeDungeon)


  const dispatch = jest.fn()
   .mockImplementationOnce(action => {
     expect(action).toEqual(expectedAction)
     scope.done()
   })
})
