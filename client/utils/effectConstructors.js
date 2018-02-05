export function poisonConstructor (perc) {
  return {
    name: 'Poison',
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
    duration: 15,
    tickRate: 3,
    percentage: perc || 0.1,
    colour: '#8CE88C',
    type: 'PERCENT_HEAL_FRIENDLY_TARGET'
  }
}
