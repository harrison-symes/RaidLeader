export function MenuBackground (dungeon) {
  switch(dungeon) {
    case 'The Hunt': return {
      colour: '#b88d8d',
      background: 'https://www.transparenttextures.com/patterns/black-scales.png'
    }
    case 'The Cursed Wilds': return {
      colour: '#00633a',
      background: 'https://www.transparenttextures.com/patterns/gray-floral.png'
    }
    case 'The Swamp': return {
      colour: '#47294a',
      background: 'https://www.transparenttextures.com/patterns/asfalt-light.png'
    }
    case 'The Foundry': return {
      colour: '#c23f18',
      background: 'https://www.transparenttextures.com/patterns/diagmonds.png'
    }
    case 'The Armory': return {
      colour: '#302b30',
      background: 'https://www.transparenttextures.com/patterns/brushed-alum.png'
    }
    case 'The Lair': return {
      colour: '#42520f',
      background: 'https://www.transparenttextures.com/patterns/pyramid.png'
    }
    default: return {
      colour: 'white',
      background: ''
    }
  }
}

export default function getDungeonInfo(dungeon, isCompleted) {
  switch(dungeon) {
    case 'The Hunt': return {
      name: 'The Hunt',
      isCompleted,
      level: 1,
      is_repeatable: false,
      max_party: 1,
      max_spells: 1,
      requires_complete: null,
      rewards: [],
      gold_reward: 500,
      description: "The Paladin knows the location of a dying Dragon. Dragons are pretty scary, but they always hoard a large amount of treasure. Hopefully this Dragon won't live long enough to burn you alive...",
      bosses: [
        'Damaged Dragon'
      ]
    }
    case 'The Cursed Wilds': return {
      name: 'The Cursed Wilds',
      isCompleted,
      level: 1,
      is_repeatable: true,
      max_party: 2,
      max_spells: 2,
      requires_complete: 'The Hunt',
      rewards: [
        {
          name: 'Cursed Staff of the Wilds',
          min: 0,
          max: 0.7
        },
        {
          name: 'Cleansed Staff of the Wilds',
          min: 0.7,
          max: 1
        }
      ],
      gold_reward: 500,
      description: "Patrons of the local Town Pub have told stories of the Cursed Wilds, filled with giant beasts who have been acting more aggressively lately. Will you brave the challenge and free these Beasts from the curse?",
      bosses: [
        "Trampling Turtle",
        "Biting Bear",
        "Spitting Spider"
      ]
    }
    case 'The Swamp': return {
      name: 'The Swamp',
      isCompleted,
      level: 2,
      is_repeatable: true,
      max_party: 3,
      max_spells: 3,
      requires_complete: 'The Cursed Wilds',
      rewards: [
        {
          name: 'Plagued Staff of the Swamp',
          min: 0,
          max: 0.7
        }, {
          name: 'Cleansed Staff of the Woods',
          min: 0.7,
          max: 1
        }
      ],
      gold_reward: 1000,
      description: "The once tranquil woods have been overwhelmed by a strange sludge in recent weeks. Many adventurers have sought the source of this plague, but none have returned. That probably means there is a lot of loot to be found here!",
      bosses: [
        "Seeping Slime",
        "Decaying Deer",
        "Lunging Locusts",
        "Plague Piltherer"
      ]
    }
    case "The Foundry": return {
      name: 'The Foundry',
      isCompleted,
      level: 3,
      is_repeatable: true,
      max_party: 3,
      max_spells: 3,
      requires_complete: 'The Swamp',
      rewards: [

      ],
      gold_reward: 1500,
      description: "A great Foundry resides within an active Volcano. You're not sure who, what or why, but SOMEONE is definitely doing SOMETHING here for SOME REASON...",
      bosses: [
        "Flaming Furnace",
        "Cycling Conveyer"
      ]
    }
    case "The Armory": return {
      name: 'The Armory',
      isCompleted,
      level: 4,
      is_repeatable: true,
      max_party: 4,
      max_spells: 4,
      requires_complete: 'The Foundry',
      rewards: [

      ],
      gold_reward: 2000,
      description: "I suppose it only makes sense when you think about it. Where else would all these weapons have come from? ... ... ... Except those weapons you extracted from those dead animals earlier, you monster!",
      bosses: [

      ]
    }
    case "The Lair": return {
      name: 'The Lair',
      isCompleted,
      level: 5,
      is_repeatable: true,
      max_party: 5,
      max_spells: 4,
      requires_complete: 'The Armory',
      rewards: [

      ],
      gold_reward: 5000,
      description: "Hey remember that Dragon you killed a while back? Well, her boyfriend is pretty pissed of at you. So pissed off that he: Cursed the Woods, Plagued a Forest, Turned a Volcano into a Foundry, Used that Foundry to create hundreds of Weapons, and... You get the idea, I suggest being a little terrified!",
      bosses: [

      ]
    }
  }
}
