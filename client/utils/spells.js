module.exports = {
  'Lesser Heal': {
    id: 1,
    name: 'Lesser Heal',
    cast: 1,
    cost: 10,
    coolDown: 0.5,
    type: 'heal',
    singleTarget: true,
    powerRatio: 1
  },
  'Heal': {
    id: 2,
    name: 'Heal',
    cast: 3,
    cost: 10,
    coolDown: 0.5,
    type: 'heal',
    singleTarget: true,
    powerRatio: 2
  },
  'Greater Heal': {
    id: 3,
    name: 'Greater Heal',
    cast: 5,
    cost: 10,
    coolDown: 0.5,
    type: 'heal',
    singleTarget: true,
    powerRatio: 3
  },
  'Healing Ring': {
    id: 4,
    name: 'Healing Ring',
    cast: 3,
    cost: 10,
    coolDown: 5,
    type: 'heal',
    singleTarget: false,
    powerRatio: 2
  },
  'Bind': {
    id: 5,
    name: 'Bind',
    cast: 0,
    cost: 10,
    coolDown: 10,
    type: 'heal',
    singleTarget: true,
    powerRatio: 2
  },
  'Fireball': {
    id: 6,
    name: 'Fireball',
    cast: 5,
    cost: 15,
    coolDown: 0,
    type: 'damage',
    singleTarget: false,
    powerRatio: 3
  },
  'Fireblast': {
    id: 7,
    name: 'Fireblast',
    cast: 2.5,
    cost: 15,
    coolDown: 5,
    type: 'damage',
    singleTarget: false,
    powerRatio: 2
  },
  'Flash Fire': {
    id: 8,
    name: 'Flash Fire',
    cast: 0,
    cost: 15,
    coolDown: 10,
    type: 'damage',
    singleTarget: false,
    powerRatio: 1
  },
  'Life Tap': {
    id: 9,
    name: 'Life Tap',
    cast: 0,
    cost: 0,
    coolDown: 10,
    type: 'special',
    singleTarget: false,
    powerRatio: 3
  },
  'Evocate': {
    id: 10,
    name: 'Evocate',
    cast: 5,
    cost: 0,
    coolDown: 0,
    type: 'special',
    singleTarget: false,
    powerRatio: 5
  },
  'Drain Life': {
    id: 11,
    name: 'Drain Life',
    cast: 2,
    cost: 5,
    coolDown: 5,
    type: 'damage',
    singleTarget: false,
    powerRatio: 1
  },
  'Harvest Life': {
    id: 12,
    name: 'Harvest Life',
    cast: 5,
    cost: 20,
    coolDown: 20,
    type: 'damage',
    singleTarget: false,
    powerRatio: 3
  },
  'Drain Soul': {
    id: 13,
    name: 'Drain Soul',
    cast: 5,
    cost: 0,
    coolDown: 0,
    type: 'damage',
    singleTarget: false,
    powerRatio: 2
  }
}
