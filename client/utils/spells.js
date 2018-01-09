module.exports = {
  'Lesser Heal': {
    name: 'Lesser Heal',
    cast: 1,
    cost: 10,
    coolDown: 0,
    type: 'heal',
    singleTarget: true,
    powerRatio: 1
  },
  'Heal': {
    name: 'Heal',
    cast: 3,
    cost: 10,
    coolDown: 0.5,
    type: 'heal',
    singleTarget: true,
    powerRatio: 2
  },
  'Greater Heal': {
    name: 'Greater Heal',
    cast: 5,
    cost: 10,
    coolDown: 0.5,
    type: 'heal',
    singleTarget: true,
    powerRatio: 3
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
  'Bind': {
    name: 'Bind',
    cast: 0,
    cost: 10,
    coolDown: 10,
    type: 'heal',
    singleTarget: true,
    powerRatio: 2
  },
  'Fireball': {
    name: 'Fireball',
    cast: 5,
    cost: 15,
    coolDown: 10,
    type: 'damage',
    singleTarget: false,
    powerRatio: 3
  },
  'Fireblast': {
    name: 'Fireblast',
    cast: 2.5,
    cost: 15,
    coolDown: 5,
    type: 'damage',
    singleTarget: false,
    powerRatio: 2
  },
  'Flash Fire': {
    name: 'Flash Fire',
    cast: 0,
    cost: 15,
    coolDown: 15,
    type: 'damage',
    singleTarget: false,
    powerRatio: 1
  },
  'Life Tap': {
    name: 'Life Tap',
    cast: 0,
    cost: 0,
    coolDown: 10,
    type: 'special',
    singleTarget: false,
    powerRatio: 3
  },
  'Evocate': {
    name: 'Evocate',
    cast: 5,
    cost: 0,
    coolDown: 0,
    type: 'special',
    singleTarget: false,
    powerRatio: 5
  },
  'Drain Life': {
    name: 'Drain Life',
    cast: 2,
    cost: 10,
    coolDown: 5,
    type: 'damage',
    singleTarget: false,
    powerRatio: 1
  },
  'Harvest Life': {
    name: 'Harvest Life',
    cast: 5,
    cost: 30,
    coolDown: 20,
    type: 'damage',
    singleTarget: false,
    powerRatio: 3
  },
  'Drain Soul': {
    name: 'Drain Soul',
    cast: 3,
    cost: 0,
    coolDown: 3,
    type: 'damage',
    singleTarget: false,
    powerRatio: 1
  }
}
