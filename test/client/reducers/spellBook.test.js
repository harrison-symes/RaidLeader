import reducer from '../../../client/reducers/spellBook'

test('Spellbook initial state', () => {
  expect(reducer(undefined, {})).toEqual([])
})

test('LOGOUT', () => {
  const actual = reducer([{}], {
    type: 'LOGOUT'
  })
  expect(actual).toEqual([])
})

test('RECEIVE_SPELLS', () => {
  const actual = reducer([], {
    type: 'RECEIVE_SPELLS',
    spells: [{}, {}]
  })
  expect(actual).toEqual([{}, {}])
})

test('ADD_SPELL', () => {
  const actual = reducer([{name: 'Jeff'}], {
    type: 'ADD_SPELL',
    spell: {name: 'Not-Jeff'}
  })
  expect(actual).toEqual([
    {name: 'Jeff'},
    {name: 'Not-Jeff'}
  ])
})

test('DELETE_SPELL', () => {
  const init = [
    {id: 1, name: 'Jeff'},
    {id: 2, name: 'Not-Jeff'}
  ]
  const actual = reducer(init, {
    type: 'DELETE_SPELL',
    name: "Jeff"
  })
  expect(actual).toEqual([
    {id: 2, name: 'Not-Jeff'}
  ])
})
