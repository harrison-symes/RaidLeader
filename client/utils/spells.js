module.exports = {
  'Heal': {
    name: 'Heal',
    cast: 2,
    cost: 10,
    coolDown: 0.5,
    type: 'heal',
    singleTarget: true,
    powerRatio: 1
  },
  'Healing Ring': {
    name: 'Healing Ring',
    cast: 3,
    cost: 20,
    coolDown: 5,
    type: 'heal',
    singleTarget: false,
    powerRatio: 1
  },
  'Fireball': {
    name: 'Fireball',
    cast: 5,
    cost: 20,
    coolDown: 10,
    type: 'damage',
    singleTarget: false,
    powerRatio: 2
  },
  'Bind': {
    name: 'Bind',
    cast: 0.5,
    cost: 10,
    coolDown: 10,
    type: 'heal',
    singleTarget: true,
    powerRatio: 1
  },
  'Life Tap': {
    name: 'Life Tap',
    cast: 0.5,
    cost: 0,
    coolDown: 10,
    type: 'special',
    singleTarget: false,
    powerRatio: 3
  }
}
