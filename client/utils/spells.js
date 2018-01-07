module.exports = {
  'Heal': {
    name: 'Heal',
    cast: 2,
    cost: 5,
    coolDown: 0.5,
    type: 'heal',
    singleTarget: true,
    powerRatio: 1
  },
  'Healing Ring': {
    name: 'Healing Ring',
    cast: 3,
    cost: 10,
    coolDown: 5,
    type: 'heal',
    singleTarget: false,
    powerRatio: 2
  },
  'Fireball': {
    name: 'Fireball',
    cast: 5,
    cost: 10,
    coolDown: 10,
    type: 'damage',
    singleTarget: false,
    powerRatio: 3
  },
  'Bind': {
    name: 'Bind',
    cast: 0,
    cost: 10,
    coolDown: 10,
    type: 'heal',
    singleTarget: true,
    powerRatio: 2
  },
  'Life Tap': {
    name: 'Life Tap',
    cast: 0,
    cost: 0,
    coolDown: 10,
    type: 'special',
    singleTarget: false,
    powerRatio: 3
  }
}
