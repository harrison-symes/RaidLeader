import weaponSwitch from '../../../client/utils/weaponSwitch'

test('every key refers to a function', () => {
  const expectedKeys = [
    'name',
    'id',
    'value',
    'class',
    'description',
    'bonusEffect',
    'icon'
  ]
  const keys = Object.keys(weaponSwitch)

  keys.forEach(key => {
    const value = weaponSwitch[key]
    expect(typeof value).toBe('function')
    const weapon = value()
    expect(typeof weapon).toBe('object')
    expect(weapon.name).toBe(key)
    expectedKeys.forEach(expectedKey =>
    expect(weapon.hasOwnProperty(expectedKey)).toBeTruthy())
  })
})

const playerWeapons = [
  'Training Staff',
  'Cursed Staff of the Wilds',
  'Cleansed Staff of the Wilds',
  'Plagued Staff of the Swamp',
  'Cleansed Staff of the Woods'
]

test('player weapon keys', () => {
  const keys = [
    'hp',
    'power',
    'mana',
    'manaRegen',
  ]
  playerWeapons.forEach(weaponName => {
    const weapon = weaponSwitch[weaponName](1, 1)
    keys.forEach(key => {
      expect(weapon.hasOwnProperty(key)).toBeTruthy()
      expect(weapon.id).toBe(1)
      expect(weapon.level).toBe(1)
      if (weapon.bonusEffect) expect(weapon.hasOwnProperty('effectDescription')).toBeTruthy()
    })
  })
})
