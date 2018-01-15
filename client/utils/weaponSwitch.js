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
  }),
  ['Bear Fangs']: (level, id) => ({
    name: 'Bear Fangs',
    type: 'Weapon',
    level,
    id,
    hp: -1 * level,
    power: 0,
    speed: 1,
    class: 'Rogue',
    description: 'A set of Bear Fangs. Good for stabbing, not very good for blocking',
    bonusEffect: null
  }),
  ['Bear Heart']: (level, id) => ({
    name: 'Bear Heart',
    type: 'Weapon',
    level,
    id,
    hp: 2 * level,
    power: level,
    speed: 0,
    class: 'Warlock',
    description: 'The heart still beats, only a true sadist would find this useful',
    bonusEffect: null
  })
}
