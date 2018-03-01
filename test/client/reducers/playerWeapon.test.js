import reducer from '../../../client/reducers/playerWeapon'

test('initial playerWeapon state', () => {
  expect(reducer(undefined, {})).toBe(null)
})

test('LOGOUT', () => {
  const actual = reducer(
    {name: 'TEST_WEAPON'},
    {type: 'LOGOUT'}
  )
  expect(actual).toBe(null)
})

test('EQUIP_PLAYER_WEAPON', () => {
  const actual = reducer(
    {name: 'TEST_WEAPON_ONE'},
    {
      type: 'EQUIP_PLAYER_WEAPON',
      weapon: {name: 'TEST_WEAPON_TWO'}
    }
  )
  expect(actual).toEqual({name: 'TEST_WEAPON_TWO'})
})

test('TRAVEL_TO_TOWN', () => {
  const actual = reducer(
    {name: 'TEST_WEAPON'},
    {type: 'TRAVEL_TO_TOWN'}
  )
  expect(actual).toBe(null)
})
