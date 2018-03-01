import dungeons from '../../../client/reducers/dungeons'

const initialState = []

test('Dungeons Initial State', () => {
  const actual = dungeons(undefined, {})
  expect(actual).toEqual(initialState)
})

test('LOGOUT', () => {
  const actual = dungeons(
    [{}, {}, {}],
    {
      type: 'LOGOUT'
    }
  )
  expect(actual).toEqual([])
})

test('RECEIVE_DUNGEONS', () => {
  const actual = dungeons(
    initialState,
    {
      type: 'RECEIVE_DUNGEONS',
      dungeons: [{}, {}, {}]
    }
  )
  expect(actual).toEqual([{}, {}, {}])
})

test('DUNGEON_COMPLETE', () => {
  const actual = dungeons(
    [{id: 1, isCompleted: false}],
    {
      type: 'DUNGEON_COMPLETE',
      dungeon: {id: 1}
    }
  )

  const expected = [{id: 1, isCompleted: true}]

  expect(actual).toEqual(expected)
})
