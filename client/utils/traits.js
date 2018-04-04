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
    name: 'Blossom',
    tier: 1,
    gemCost: 1,
    description: 'Learn the Spell "Blossom"',
    isSpell: true,
    element: 'Life',
    requiredTrait: null,
    icon: spells['Blossom'].icon,
    color: spells['Blossom'].color,
    background: spells['Blossom'].background,
    element: 'Life',
    spell: spells['Blossom']
  }
]

const shadow = [
  {
    name: 'Life Funnel',
    tier: 1,
    gemCost: 1,
    description: 'Learn the Spell "Life Funnel"',
    isSpell: true,
    element: 'Shadow',
    requiredTrait: null,
    icon: spells['Life Funnel'].icon,
    color: spells['Life Funnel'].color,
    background: spells['Life Funnel'].background,
    element: 'Shadow',
    spell: spells['Life Funnel']
  }
]

const arcane = [
  {
    name: 'Evocate',
    tier: 1,
    gemCost: 1,
    description: 'Learn the Spell "Evocate"',
    isSpell: true,
    element: 'Arcane',
    requiredTrait: null,
    icon: spells['Evocate'].icon,
    color: spells['Evocate'].color,
    background: spells['Evocate'].background,
    element: 'Arcane',
    spell: spells['Evocate']
  }
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
    icon: 'ra-blaster',
    color: colors.darkRed,
    background: colors.lightOrange,
    element: 'Fire',
    spell: spells['Fireblast']
  },
  {
    name: 'Quicklight',
    tier: 2,
    gemCost: 2,
    description: 'Reduces the Cast Time of your Spells by 10%.',
    isSpell: false,
    element: 'Fire',
    requiredTrait: null,
    icon: 'ra-match',
    color: colors.darkRed,
    background: 'white',
  },
  {
    name: 'Light the Way',
    tier: 2,
    gemCost: 2,
    description: 'Casting a Fire Spell will Heal the Player for (100%) of Player Power',
    isSpell: false,
    element: 'Fire',
    requiredTrait: null,
    icon: 'ra-torch',
    color: colors.darkRed,
    background: 'white',
  }
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
  console.log(tierSorter);
}

function getAllTraits () {
  return life.concat(fire).concat(shadow).concat(arcane)
}

console.log(getAllTraits());

module.exports = {
  sortTiers,
  getTraitsByElement,
  getAllTraits
}

sortTiers(getTraitsByElement('Fire'))
