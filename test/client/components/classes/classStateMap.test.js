import classStateMap from '../../../../client/components/classes/utils/classStateMap'

test('classStateMap', () => {
  const trueState = {
    started: true,
    party: [{id:1, name:'Jeff'}],
    friendlyTarget: {id: 1, name: 'Jeff'},
    player: {id: 0, name: 'Player'},
    boss: {name: 'Big Scary Dude'}
  }
  const fakeState = {
    ...trueState,
    fakeKeyOne: 'HaHa',
    fakeKeyTwo: 'Memes'
  }
  const actual = classStateMap(fakeState)

  expect(actual).toEqual(trueState)
})
