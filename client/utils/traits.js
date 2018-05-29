const spells = require('./spells')

var colors = {
  lightGreen: '#00FF7F',
  medGreen: '#00C957',
  darkGreen: '#008B45',
  lightOlive: '#C0FF3E',
  darkOlive: '#6E8B3D',
  medOlive: '#A2CD5A',
  medOrange: '#FFA500',
  darkOrange: '#FF7F24',
  lightRed: '#EE5C42',
  medRed: '#EE4000',
  darkRed: '#EE4000',
  lightOrange: '#FFC125',
  medBlue: '#7171C6',
  darkBlue: '#00688B',
  lightBlue: '#7D9EC0',
  lightPurple: '#9370DB',
  darkPurple: '#7D26CD',
  medPurple: '#6A5ACD',
  medYellow: '#EEEE00',
  lightYellow: '#FFF68F',
  darkYellow: '#FFD700',
  medGrey: '#AAAAAA',
  faintPink: '#DDA0DD'
}

const life = [
  {
    name: 'Renew',
    tier: 1,
    gemCost: 1,
    description: 'Learn the Spell "Renew"',
    isSpell: true,
    element: 'Life',
    requiredTrait: null,
    icon: spells['Renew'].icon,
    color: spells['Renew'].color,
    background: spells['Renew'].background,
    element: 'Life',
    spell: spells['Renew']
  },
  {
    name: 'Ingrain',
    tier: 2,
    gemCost: 2,
    description: 'Increases Player Power by (10%)',
    isSpell: false,
    element: 'Life',
    requiredTrait: null,
    icon: 'ra-root-tip',
    color: spells['Life Soul'].background,
    background: 'white',
  },
  {
    name: 'Fruitful',
    tier: 2,
    gemCost: 2,
    description: 'Casting a Life spell will heal ALL Recruits for (1%) of their Max Health per 1 Second of the Spells Cast Time',
    isSpell: false,
    element: 'Life',
    requiredTrait: null,
    icon: 'ra-fruiting',
    color: spells['Life Soul'].background,
    background: 'white',
  },
  {
    name: 'Life Soul',
    tier: 3,
    gemCost: 3,
    description: 'Learn the Spell "Life Soul"',
    isSpell: true,
    element: 'Life',
    requiredTrait: null,
    icon: spells['Life Soul'].icon,
    color: spells['Life Soul'].color,
    background: spells['Life Soul'].background,
    element: 'Life',
    spell: spells['Life Soul']
  },
  {
    name: 'Hearty',
    tier: 3,
    gemCost: 3,
    description: "Increases the Max Health of your Recruits by (10%)",
    isSpell: false,
    element: 'Life',
    requiredTrait: null,
    icon: 'ra-heart-wings',
    color: spells['Life Soul'].background,
    background: 'white',
    element: 'Life',
  },
]

const shadow = [
  {
    name: 'Life Tap',
    tier: 1,
    gemCost: 1,
    description: 'Learn the Spell "Life Tap"',
    isSpell: true,
    element: 'Shadow',
    requiredTrait: null,
    icon: spells['Life Tap'].icon,
    color: spells['Life Tap'].color,
    background: spells['Life Tap'].background,
    element: 'Shadow',
    spell: spells['Life Tap']
  },
  {
    name: 'Empower',
    tier: 2,
    gemCost: 2,
    description: 'Increases the Power of you Recruits by (10%), You will lose (10%) of Player Health at the Start of each Game',
    isSpell: false,
    element: 'Shadow',
    requiredTrait: null,
    icon: 'ra-beams-aura',
    color: spells['Life Funnel'].background,
    background: 'white',
  },
  {
    name: 'Unchain',
    tier: 2,
    gemCost: 2,
    description: 'Your Shadow Spells cost 0 Mana',
    isSpell: false,
    element: 'Shadow',
    requiredTrait: null,
    icon: 'ra-andromeda-chain',
    color: spells['Life Funnel'].background,
    background: 'white',
  },
  {
    name: 'Shadow Soul',
    tier: 3,
    gemCost: 3,
    description: 'Learn the Spell "Shadow Soul"',
    isSpell: true,
    element: 'Shadow',
    requiredTrait: null,
    icon: spells['Shadow Soul'].icon,
    color: spells['Shadow Soul'].color,
    background: spells['Shadow Soul'].background,
    element: 'Shadow',
    spell: spells['Shadow Soul']
  },
  {
    name: 'Vengeance',
    tier: 3,
    gemCost: 3,
    description: 'Increases the Power of your Spells (That are based on your Player Power) by up to (50%). The amount is increased by how LOW your Player Health is. (100% Player health = 0% Power Boost, 50% Player Health = 25% Power Boost)',
    isSpell: false,
    element: 'Shadow',
    requiredTrait: null,
    icon: 'ra-angry-eyes',
    color: spells['Shadow Soul'].background,
    background: 'white',
    element: 'Shadow',
  },
]

const arcane = [
  {
    name: 'Arcane Explosion',
    tier: 1,
    gemCost: 1,
    description: 'Learn the Spell "Arcane Explosion"',
    isSpell: true,
    element: 'Arcane',
    requiredTrait: null,
    icon: spells['Arcane Explosion'].icon,
    color: spells['Arcane Explosion'].color,
    background: spells['Arcane Explosion'].background,
    element: 'Arcane',
    spell: spells['Arcane Explosion']
  },
  {
    name: 'Light Feet',
    tier: 2,
    gemCost: 2,
    description: 'Reduces the Mana Cost of your Spells by (1)',
    isSpell: false,
    element: 'Arcane',
    requiredTrait: null,
    icon: 'ra-running-ninja',
    color:  spells['Evocate'].background,
    background: 'white',
  },
  {
    name: 'Mana Pool',
    tier: 2,
    gemCost: 2,
    description: 'Increases your Mana by 10 for each Arcane Spell on your Spell Bar',
    isSpell: false,
    element: 'Arcane',
    requiredTrait: null,
    icon: 'ra-water-splash',
    color:  spells['Evocate'].background,
    background: 'white',
  },
  {
    name: 'Arcane Soul',
    tier: 3,
    gemCost: 3,
    description: 'Learn the Spell "Arcane Soul"',
    isSpell: true,
    element: 'Arcane',
    requiredTrait: null,
    icon: spells['Arcane Soul'].icon,
    color: spells['Arcane Soul'].color,
    background: spells['Arcane Soul'].background,
    element: 'Arcane',
    spell: spells['Arcane Soul']
  },
  {
    name: 'Focus',
    tier: 3,
    gemCost: 3,
    description: 'Reduces the Cast Time and Cool Down of you Channeled Spells by (50%)',
    isSpell: false,
    element: 'Arcane',
    requiredTrait: null,
    icon: 'ra-droplet-splash',
    color: spells['Arcane Soul'].background,
    background: 'white',
    element: 'Arcane',
  },
]

const fire = [
  {
    name: 'Fireblast',
    tier: 1,
    gemCost: 1,
    description: 'Learn the Spell "Fireblast"',
    isSpell: true,
    element: 'Fire',
    requiredTrait: null,
    icon: spells['Fireblast'].icon,
    color: colors.darkRed,
    background: colors.lightOrange,
    element: 'Fire',
    spell: spells['Fireblast']
  },
  {
    name: 'Quicklight',
    tier: 2,
    gemCost: 2,
    description: 'Reduces the Cast Time and Cool Down of your Spells by 10%.',
    isSpell: false,
    element: 'Fire',
    requiredTrait: null,
    icon: 'ra-match-head',
    color: colors.darkRed,
    background: 'white',
  },
  {
    name: 'Light the Way',
    tier: 2,
    gemCost: 2,
    description: "Casting a Fire Spell will Heal the Player for (25%) of Player Power per 1 second of the Spell's Cast Time",
    isSpell: false,
    element: 'Fire',
    requiredTrait: null,
    icon: 'ra-torch',
    color: colors.darkRed,
    background: 'white',
  },
  {
    name: 'Fire Soul',
    tier: 3,
    gemCost: 3,
    description: 'Learn the Spell "Fire Soul"',
    isSpell: true,
    element: 'Fire',
    requiredTrait: null,
    icon: spells['Fire Soul'].icon,
    color: spells['Fire Soul'].color,
    background: spells['Fire Soul'].background,
    element: 'Fire',
    spell: spells['Fire Soul']
  },
  {
    name: 'Burning Rush',
    tier: 3,
    gemCost: 3,
    description: 'Your Spells with a BASE cast time of 2 seconds or less have No Cast Time. (Only for non-Channeled spells),',
    isSpell: false,
    element: 'Fire',
    requiredTrait: null,
    icon: 'ra-fire-dash',
    color: colors.darkRed,
    background: 'white',
    element: 'Fire'
  },
  {
    name: 'Forest Fire',
    tier: 4,
    gemCost: 4,
    description: 'Learn the Spell "Forest Fire"',
    isSpell: true,
    element: 'Fire',
    requiredTrait: null,
    icon: spells['Forest Fire'].icon,
    color: colors.darkRed,
    background: colors.lightOrange,
    element: 'Fire',
    spell: spells['Forest Fire']
  },
]

function getTraitsByElement(element) {
  switch (element) {
    case 'Fire': return fire
    case 'Shadow': return shadow
    case 'Arcane': return arcane
    default: return life
  }
}

function sortTiers (traits) {
  const tierSorter = traits.reduce((sorter, trait) => {
    if (sorter.hasOwnProperty(trait.tier)) sorter[trait.tier].push(trait)
    else sorter[trait.tier] = [trait]
    return sorter
  }, {})
  return tierSorter
}

function getAllTraits () {
  return life.concat(fire).concat(shadow).concat(arcane)
}


module.exports = {
  sortTiers,
  getTraitsByElement,
  getAllTraits
}

sortTiers(getTraitsByElement('Fire'))
