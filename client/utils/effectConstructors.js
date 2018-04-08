export function poisonConstructor (perc) {
  return {
    name: 'Poison',
    icon: 'ra-poison-cloud',
    duration: 15,
    percentage: perc || 0.1,
    colour: '#BA8CE8',
    tickRate: 3,
    type: 'PERCENT_DAMAGE_FRIENDLY_TARGET'
  }
}

export function renewConstructor (perc) {
  return {
    name: 'Renew',
    icon: 'ra-sprout',
    duration: 15,
    tickRate: 3,
    percentage: perc || 0.1,
    colour: '#8CE88C',
    type: 'PERCENT_HEAL_FRIENDLY_TARGET'
  }
}

export function stunConstructor (duration) {
  return {
    name: 'Stunned',
    icon: 'ra-player-pain',
    duration,
    tickRate: duration,
    percentage: 0,
    colour: '#7D9EC0',
    type: null
  }
}
