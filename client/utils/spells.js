module.exports = {
  'Lesser Heal': {
    id: 1,
    name: 'Lesser Heal',
    cast: 1,
    cost: 10,
    coolDown: 0.5,
    type: 'heal',
    singleTarget: true,
    powerRatio: 1,
    description: 'Heal a Friendly Target for (100%) of Player Power'
  },
  'Heal': {
    id: 2,
    name: 'Heal',
    cast: 3,
    cost: 10,
    coolDown: 0.5,
    type: 'heal',
    singleTarget: true,
    powerRatio: 2,
    description: 'Heal a Friendly Target for (200%) of Player Power'
  },
  'Greater Heal': {
    id: 3,
    name: 'Greater Heal',
    cast: 5,
    cost: 10,
    coolDown: 0.5,
    type: 'heal',
    singleTarget: true,
    powerRatio: 3,
    description: 'Heal a Friendly Target for (300%) of Player Power'
  },
  'Healing Ring': {
    id: 4,
    name: 'Healing Ring',
    cast: 0,
    cost: 15,
    coolDown: 5,
    type: 'heal',
    singleTarget: false,
    powerRatio: 1,
    description: "Heal ALL Friendly Characters for (100%) of Player Power"
  },
  'Bind': {
    id: 5,
    name: 'Bind',
    cast: 0,
    cost: 10,
    coolDown: 10,
    type: 'heal',
    singleTarget: true,
    powerRatio: 2,
    description: 'Heal a Friendly Character and the Player for (200%) of Player Power'
  },
  'Fireball': {
    id: 6,
    name: 'Fireball',
    cast: 5,
    cost: 15,
    coolDown: 5,
    type: 'damage',
    singleTarget: false,
    powerRatio: 3,
    description: "Damage the Boss for (300%) of Player Power"
  },
  'Fireblast': {
    id: 7,
    name: 'Fireblast',
    cast: 2.5,
    cost: 15,
    coolDown: 5,
    type: 'damage',
    singleTarget: false,
    powerRatio: 2,
    description: 'Damage the Boss for (%200) of Player Power'
  },
  'Flash Fire': {
    id: 8,
    name: 'Flash Fire',
    cast: 0,
    cost: 15,
    coolDown: 10,
    type: 'damage',
    singleTarget: false,
    powerRatio: 1,
    description: 'Damage the Boss for (%100) of Player Power'
  },
  'Life Tap': {
    id: 9,
    name: 'Life Tap',
    cast: 0,
    cost: 0,
    coolDown: 10,
    type: 'special',
    singleTarget: false,
    powerRatio: 3,
    description: 'Damage the Player for (%300) Player Power, gain Mana equal to the damage taken'
  },
  'Evocate': {
    id: 10,
    name: 'Evocate',
    cast: 5,
    cost: 0,
    coolDown: 0,
    type: 'special',
    singleTarget: false,
    powerRatio: 10,
    description: 'Gain 10 Mana'
  },
  'Drain Life': {
    id: 11,
    name: 'Drain Life',
    cast: 2,
    cost: 5,
    coolDown: 5,
    type: 'damage',
    singleTarget: false,
    powerRatio: 1,
    description: "Damage the Boss for (%100) of Player Power, Heal the Player for (%200) of Damage done"
  },
  'Harvest Life': {
    id: 12,
    name: 'Harvest Life',
    cast: 5,
    cost: 20,
    coolDown: 20,
    type: 'damage',
    singleTarget: false,
    powerRatio: 3,
    description: 'Damage the Boss for (%300) of Player Power, Heal ALL Friendly Characters for (%100) of the Damage done'
  },
  'Drain Soul': {
    id: 13,
    name: 'Drain Soul',
    cast: 5,
    cost: 0,
    coolDown: 0,
    type: 'damage',
    singleTarget: false,
    powerRatio: 2,
    description: 'Damage the Boss for (%) of Player Power, Heal the Player for (100%) of the Damage done and restores 3 Mana to the Player'
  },
  'Renew': {
    id: 14,
    name: 'Renew',
    cast: 0,
    cost: 5,
    coolDown: 0,
    type: 'healing',
    singleTarget: true,
    powerRatio: 1,
    description: 'Place a Healing over Time effect on a friendly target, healing them for 100% of Player every 3 seconds for 9 seconds'
  }
}
