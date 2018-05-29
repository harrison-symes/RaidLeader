export function MenuBackground (dungeon) {
  switch(dungeon) {
    case 'The Hunt': return {
      icon: 'ra-dragon-head',
      colour: '#b88d8d',
      background: '/images/backgrounds/the-hunt.png'
    }
    case 'The Cursed Wilds': return {
      icon: 'ra-pine-tree',
      colour: '#00633a',
      background: '/images/backgrounds/the-wilds.png'
    }
    case 'The Swamp': return {
      icon: 'ra-swamp',
      colour: '#47294a',
      background: '/images/backgrounds/the-swamp.png'
    }
    case 'The Foundry': return {
      icon: 'ra-caldera',
      colour: '#c23f18',
      background: '/images/backgrounds/the-foundry.png'
    }
    case 'The Armory': return {
      icon: 'ra-sword-clash',
      colour: '#302b30',
      background: '/images/backgrounds/the-armory.png'
    }
    case 'The Lair': return {
      icon: 'ra-uncertainty',
      colour: '#42520f',
      background: '/images/backgrounds/the-lair.png'
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
      gemChance: 1,
      rewards: [],
      gold_reward: 300,
      expReward: 700,
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
      gemChance: 1/5,
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
      expReward: 700,
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
      gemChance: 1/4,
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
      expReward: 1400,
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
      max_spells: 4,
      requires_complete: 'The Swamp',
      gemChance: 1/3,
      rewards: [
        {
          name: 'Staff of Eternal Flame',
          min: 0,
          max: 0.25
        }, {
          name: 'Staff of Endless Shadow',
          min: 0.25,
          max: 0.5
        }, {
          name: 'Staff of Arcane Energy',
          min: 0.5,
          max: 0.75
        }, {
          name: 'Staff of Blossoming Life',
          min: 0.75,
          max: 1
        }
      ],
      gold_reward: 1500,
      expReward: 3400,
      description: "A great Foundry resides within an active Volcano. You're not sure who, what or why, but SOMEONE is definitely doing SOMETHING here for SOME REASON...",
      bosses: [
        "Flaming Furnace",
        "Cycling Conveyer",
        "Collapsing Core",
        "Trapped Tunnel"
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
      gemChance: 1/2,
      rewards: [

      ],
      gold_reward: 0,
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
      gold_reward: 0,
      gemChance: 1,
      description: "Hey remember that Dragon you killed a while back? Well, her boyfriend is pretty pissed of at you. So pissed off that he: Cursed the Woods, Plagued a Forest, Turned a Volcano into a Foundry, Used that Foundry to create hundreds of Weapons, and... You get the idea, I suggest being a little terrified!",
      bosses: [

      ]
    }
    case "The Test": return {
      name: 'The Test',
      isCompleted,
      level: 5,
      is_repeatable: true,
      max_party: 5,
      max_spells: 5,
      gold_reward: 500,
      gemChance: 1,
      bosses: [
        'Test'
      ],
      rewards: [
        {
         name: 'Staff of Blossoming Life',
         min: 0,
         max: 1
        }
      ],
    }
  }
}
