import {poisonConstructor, renewConstructor} from '../../../client/utils/effectConstructors'

test('poisonConstructor (default perc)', () => {
  const actual = poisonConstructor()
  expect(actual).toHaveProperty('name', 'Poison')
  expect(actual).toHaveProperty('icon', 'ra-poison-cloud')
  expect(actual).toHaveProperty('duration', 15)
  expect(actual).toHaveProperty('type', 'PERCENT_DAMAGE_FRIENDLY_TARGET')
  expect(actual).toHaveProperty('percentage', 0.1)
})

test('poisonConstructor (set perc)', () => {
  const actual = poisonConstructor(0.2)
  expect(actual).toHaveProperty('percentage', 0.2)

})

test('renewConstructor (default perc)', () => {
  const actual = renewConstructor()
  expect(actual).toHaveProperty('name', 'Renew')
  expect(actual).toHaveProperty('icon', 'ra-sprout')
  expect(actual).toHaveProperty('duration', 15)
  expect(actual).toHaveProperty('type', 'PERCENT_HEAL_FRIENDLY_TARGET')
  expect(actual).toHaveProperty('percentage', 0.1)
})

test('renewConstructor (set perc)', () => {
  const actual = renewConstructor(0.2)
  expect(actual).toHaveProperty('percentage', 0.2)

})
