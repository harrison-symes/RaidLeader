import {startingBuff, classTraits, classIcons, attackIcons} from '../../../client/utils/classText'

const classes = ['Paladin', 'Warrior', 'Monk', 'Shaman', 'Hunter', 'Priest', 'Warlock', 'Rogue', 'Mage']

test('startingBuff', () => {
  classes.forEach(heroClass=> expect(startingBuff(heroClass)).toBeTruthy())
  expect(startingBuff()).toBe(null)
})

test('classTraits', () => {
  classes.forEach(heroClass=> expect(classTraits(heroClass)).toBeTruthy())
  expect(classTraits()).toBe(null)
})

test('classIcons', () => {
  expect(classIcons('Player')).toBeTruthy()
  classes.forEach(heroClass=> expect(classIcons(heroClass)).toBeTruthy())
  expect(classIcons()).toBe(null)
})

test('attackIcons', () => {
  classes.forEach(heroClass=> expect(attackIcons(heroClass)).toBeTruthy())
  expect(attackIcons()).toBe(null)
})
