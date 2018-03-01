import reducer from '../../../client/reducers/selectedSpell'

test('selectedSpell initial state', () => {
  expect(reducer(undefined, {})).toBe(null)
})

test('LOGOUT', () => {
  const actual = reducer({}, {
    type: 'LOGOUT'
  })
  expect(actual).toBe(null)
})

test('RETURN_TO_MENU', () => {
  const actual = reducer({}, {
    type: 'RETURN_TO_MENU'
  })
  expect(actual).toBe(null)
})

test('TRAVEL_TO_TOWN', () => {
  const actual = reducer({}, {
    type: 'TRAVEL_TO_TOWN'
  })
  expect(actual).toBe(null)
})

test('SELECT_SPELL (first)', () => {
  const actual = reducer(null, {
    type: 'SELECT_SPELL',
    spell: {id: 1, name: 'Jeff'}
  })
  expect(actual).toEqual({id: 1, name: 'Jeff'})
})

test('SELECT_SPELL (duplicate)', () => {
  const actual = reducer(
    {
      id: 1, name: 'Jeff'
    }, {
      type: 'SELECT_SPELL',
      spell: {id: 1, name: 'Jeff'}
    }
  )
  expect(actual).toEqual(null)
})
