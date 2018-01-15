module.exports = {
  ['Dragon Scale']: (level, id) => ({
    name: 'Dragon Scale',
    type: 'Weapon',
    level,
    id,
    hp: 2 * level,
    power: level,
    speed: 0,
    class: 'Paladin',
    description: 'A Scale from a Dragon, this should make a good shield',
    bonusEffect: null
  })
}
