module.exports = {
  'Heal': {
    name: 'heal',
    cast: 2,
    cost: 10,
    coolDown: 1,
    type: 'heal',
    singleTarget: true,
    powerRatio: 1
  },
  'Healing Ring': {
    name: 'circle',
    cast: 3,
    cost: 20,
    coolDown: 5,
    type: 'heal',
    singleTarget: false,
    powerRatio: 1
  },
  'Fireball': {
    name: 'burn',
    cast: 5,
    cost: 20,
    coolDown: 10,
    type: 'damage',
    singleTarget: false,
    powerRatio: 2
  }
}
