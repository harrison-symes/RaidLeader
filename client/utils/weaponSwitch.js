module.exports = {
  ['Dragon Scale']: (level, id) => ({
    name: 'Dragon Scale',
    type: 'Weapon',
    level,
    id,
    hp: 3 * level,
    power: level,
    speed: -1,
    class: 'Paladin',
    description: 'A Scale from a Dragon, this should make a good shield',
    bonusEffect: null
  })
}
