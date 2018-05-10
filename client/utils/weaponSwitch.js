module.exports = {
  ['Training Staff']: (level, id) => ({
    name: 'Training Staff',
    type: 'Weapon',
    level,
    id,
    value: 250,
    hp: 1000,
    power: 20,
    mana: 100,
    manaRegen: 1,
    class: 'Player',
    description: 'It comes with a note attached; "Hitting your Recruits with this will NOT heal them!"',
    bonusEffect: null,
    icon: 'ra-wizard-staff'
  }),
  ['Cursed Staff of the Wilds']: (level, id) => ({
    name: 'Cursed Staff of the Wilds',
    type: 'Weapon',
    level,
    id,
    value: 300,
    hp: 1300,
    power: 30,
    mana: 130,
    manaRegen: 1,
    class: 'Player',
    description: 'This Staff is covered in thorns. You hear the sounds of a Bear Wailing from inside of it.',
    bonusEffect: null,
    icon: 'ra-wood-stick'
  }),
  ['Cleansed Staff of the Wilds']: (level, id) => ({
    name: 'Cleansed Staff of the Wilds',
    type: 'Weapon',
    level,
    id,
    value: 400,
    hp: 1300,
    power: 30,
    mana: 100,
    manaRegen: 1.1,
    class: 'Player',
    description: 'You have lifted the curse upon the Wilds, and the Wilds presents you this as a reward.',
    bonusEffect: null,
    icon: 'ra-tree-branch'
  }),
  ['Plagued Staff of the Swamp']: (level, id) => ({
    name: 'Plagued Staff of the Swamp',
    type: 'Weapon',
    level,
    id,
    value: 500,
    hp: 1800,
    power: 40,
    mana: 150,
    manaRegen: 1,
    class: 'Player',
    description: 'The staff resonates great power, but something about it feels so wrong.',
    bonusEffect: 'Poison',
    effectDescription: `Casting a Life Spell on a Recruit will Poison the Recruit for 60% of their Max Health over 15 seconds`,
    icon: 'ra-kusarigama'
  }),
  ['Cleansed Staff of the Woods']: (level, id) => ({
    name: 'Cleansed Staff of the Woods',
    type: 'Weapon',
    level,
    id,
    value: 700,
    hp: 1800,
    power: 35,
    mana: 100,
    manaRegen: 1.2,
    class: 'Player',
    description: 'Made from a powerful Oak Tree. A small artifact of purity from the Woods that used to be...',
    bonusEffect: 'curePoison',
    effectDescription: "Casting a Life Spell on a Recruit will remove any Poison effect from the target",
    icon: 'ra-tree-face'
  }),
  ['Staff of Eternal Flame']: (level, id) => ({
    name: 'Staff of Eternal Flame',
    type: 'Weapon',
    level,
    id,
    value: 700,
    hp: 2400,
    power: 40,
    mana: 250,
    manaRegen: 1.2,
    class: 'Player',
    description: 'A Glowing Sun Shaped Ruby sits at the tip of the Staff. The Hilt Glows as you touch it, warming you soul... a little too warm perhaps...',
    bonusEffect: 'firePower',
    effectDescription: "The Power of your Fire Spells is Increased by (100%)",
    icon: 'ra-primitve-torch'
  }),
  ['Staff of Endless Shadow']: (level, id) => ({
    name: 'Staff of Endless Shadow',
    type: 'Weapon',
    level,
    id,
    value: 700,
    hp: 2400,
    power: 40,
    mana: 250,
    manaRegen: 1.2,
    class: 'Player',
    description: 'A skull sits at the tip of the Staff. A soft voice calls out to you: "Fear not mortal, together can do anything I desire..."',
    bonusEffect: 'shadowPower',
    effectDescription: "Whenever you cast a Shadow Spell, the Power of ALL Recruits are increased by 1%",
    icon: 'ra-skull-staff'
  }),
  ['Staff of Arcane Energy']: (level, id) => ({
    name: 'Staff of Arcane Energy',
    type: 'Weapon',
    level,
    id,
    value: 700,
    hp: 2400,
    power: 40,
    mana: 250,
    manaRegen: 1.2,
    class: 'Player',
    description: 'A swirling mist hovers over the tip of the Staff. As you hold the Weapon a surge flows through your body. You feel like you could run forever. In fact, not running is quite painful.',
    bonusEffect: 'arcanePower',
    effectDescription: "Your Recruits have +10% Speed for Each Arcane Spell on your Spell Bar",
    icon: 'ra-crystal-wand'
  }),
  ['Staff of Blossoming Life']: (level, id) => ({
    name: 'Staff of Blossoming Life',
    type: 'Weapon',
    level,
    id,
    value: 700,
    hp: 2400,
    power: 40,
    mana: 250,
    manaRegen: 1.2,
    class: 'Player',
    description: 'A small daisy sits at the tip of the Staff. Walking out of the Scorched Volcano with this in your hand, you watch amazed as the Earth around you sprouts and heals with new life.',
    bonusEffect: 'lifePower',
    effectDescription: "Whenever you Cast a Life Spell, Heal ALL Recruits for (5%) of their Max Health",
    icon: 'ra-caduceus'
  }),
  ['Dragon Scale']: (level, id) => ({
    name: 'Dragon Scale',
    type: 'Weapon',
    level,
    id,
    value: 200,
    hp: 0.2,
    power: -0.3,
    speed: 0.3,
    class: 'Paladin',
    description: 'A Scale from a Dragon, this should make a good shield',
    bonusEffect: null,
    icon: 'ra-shieldcomb'
  }),
  ['Bear Fangs']: (level, id) => ({
    name: 'Bear Fangs',
    type: 'Weapon',
    level,
    id,
    value: 200,
    hp: -0.1,
    power: -0.1,
    speed: 0.4,
    class: 'Rogue',
    description: 'A set of Bear Fangs. Good for stabbing, not very good for blocking',
    bonusEffect: null,
    icon: 'ra-front-teeth'
  }),
  ['Bear Heart']: (level, id) => ({
    name: 'Bear Heart',
    type: 'Weapon',
    level,
    id,
    value: 200,
    hp: 0.4,
    power: 0.1,
    speed: -0.3,
    class: 'Warlock',
    description: 'The heart still beats, only a true sadist would find this useful',
    bonusEffect: null,
    icon: 'ra-heart-organ'
  }),
  ['Bear Claw Arrows']: (level, id) => ({
    name: 'Bear Claw Arrows',
    type: 'Weapon',
    level,
    id,
    value: 200,
    hp: 0.2,
    power: -0.3,
    speed: 0.3,
    class: 'Hunter',
    description: "There are only Ten arrows, but they seem sturdy enough to reuse.",
    bonusEffect: null,
    icon: 'ra-arrow-cluster'
  }),
  ['Chew Toy']: (level, id) => ({
    name: 'Chew Toy',
    type: 'Weapon',
    level,
    id,
    value: 200,
    hp: -0.3,
    power: -0.2,
    speed: 0.5,
    class: 'Necromancer',
    description: "The Bear was very attached to this bone, you're not really sure what kind of Animal it is from. (Could be Human)",
    bonusEffect: null,
    icon: 'ra-bone-knife'
  }),
  ['Massive Shell']: (level, id) => ({
    name: 'Massive Shell',
    type: 'Weapon',
    level,
    id,
    value: 200,
    hp: 0.6,
    power: -0.3,
    speed: 0,
    class: 'Warrior',
    description: 'A shell so heavy only a Warrior can weild it, not good for hitting things with, but great for not dying!',
    bonusEffect: 'taunt',
    effectDescription: "The Warrior's Attacks now force the Boss to target the Warrior",
    icon: 'ra-turtle-shell'
  }),
  ['Ancient Pearls']: (level, id) => ({
    name: 'Ancient Pearls',
    type: 'Weapon',
    level,
    id,
    value: 200,
    hp: -0.3,
    power: 0.3,
    speed: 0.2,
    class: 'Monk',
    description: "Strange, the Turtle was growing Pearls under it's shell",
    bonusEffect: null,
    icon: 'ra-oyster-pearl'
  }),
  ['Glowing Pearl Talisman']: (level, id) => ({
    name: 'Glowing Pearl Talisman',
    type: 'Weapon',
    level,
    id,
    value: 200,
    hp: 0.1,
    power: -0.4,
    speed: 0.5,
    class: 'Shaman',
    description: "Strange, the Turtle was magical growing Pearls under it's shell",
    bonusEffect: null,
    icon: 'ra-pearl-necklace'
  }),
  ['Fine Silk']: (level, id) => ({
    name: 'Fine Silk',
    type: 'Weapon',
    level,
    id,
    value: 200,
    hp: -0.4,
    power: 0.3,
    speed: 0.3,
    class: 'Priest',
    description: "The Spider had spun some amazing silk. Very light, with slight magical properties",
    bonusEffect: null,
    icon: 'ra-rolled-cloth'

  }),
  ['Spider Eye Wand']: (level, id) => ({
    name: 'Spider Eye Wand',
    type: 'Weapon',
    level,
    id,
    value: 200,
    hp: 0.4,
    power: 0.2,
    speed: -0.4,
    class: 'Mage',
    description: "It's a stick with a Spider Eye on the end, so obviously it's magical",
    bonusEffect: null,
    icon: 'ra-eyeball'
  }),
  ['Lute Thread']: (level, id) => ({
    name: 'Lute Thread',
    type: 'Weapon',
    level,
    id,
    value: 200,
    hp: 0.2,
    power: -0.2,
    speed: 0.2,
    class: 'Bard',
    description: "The Loot you received will go perfectly with a Lute.",
    bonusEffect: null,
    icon: 'ra-caged-bowl'
  }),
  ['Turtle Aspect']: (level, id) => ({
    name: 'Turtle Aspect',
    type: 'Weapon',
    level,
    id,
    value: 200,
    hp: 0.4,
    power: 0.2,
    speed: -0.2,
    class: 'Beast Master',
    description: "A charm embedded with the Turtle's soul. It calls out quietly, seeking the aid of other Turtles.",
    bonusEffect: 'turtlePet',
    effectDescription: "The Beast Master will now summon a Turtle Pet instead. The Turtle will inherit (100%) of the Beast Master's Health, but only (30% of the Beast Master's speed)",
    icon: 'ra-turtle'
  }),
  ['Plagued Aegis']: (level, id) => ({
    name: 'Plagued Aegis',
    type: 'Weapon',
    level,
    id,
    value: 400,
    hp: 0.4,
    power: -0.4,
    speed: 0.4,
    class: 'Paladin',
    description: 'A lost shield from a fallen adventurer. "A. Blaine" is engraved on the back',
    bonusEffect: 'selfPoison',
    effectDescription: `The character's attacks have a chance to Poison themselves for 60% of their Max Health over 15 seconds`,
    icon: 'ra-zebra-shield'
  }),
  ['Plagued Blade']: (level, id) => ({
    name: 'Plagued Blade',
    type: 'Weapon',
    level,
    id,
    value: 400,
    hp: 0,
    power: 0.4,
    speed: 0,
    class: 'Warrior',
    description: 'A lost weapon from a fallen adventurer. "A Blaine" is engraved on the back',
    bonusEffect: 'selfPoison',
    effectDescription: `The character's attacks have a chance to Poison themselves for 60% of their Max Health over 15 seconds`,
    icon: 'ra-gooey-sword'
  }),
  ['Plagued Daggers']: (level, id) => ({
    name: 'Plagued Daggers',
    type: 'Weapon',
    level,
    id,
    value: 400,
    hp: 0.2,
    power: 0.6,
    speed: -0.4,
    class: 'Rogue',
    description: 'A lost pair of Daggers from a fallen adventurer. "Joe Van Boe" is engraved on the back',
    bonusEffect: 'selfPoison',
    effectDescription: `The character's attacks have a chance to Poison themselves for 60% of their Max Health over 15 seconds`,
    icon: 'ra-dripping-knife'
  }),
  ['Plagued Arrows']: (level, id) => ({
    name: 'Plagued Arrows',
    type: 'Weapon',
    level,
    id,
    value: 400,
    hp: -0.3,
    power: -0.3,
    speed: 1,
    class: 'Hunter',
    description: 'A lost Quiver of Arrows from a fallen adventurer. "Joe Van Boe" is engraved on the back',
    bonusEffect: 'selfPoison',
    effectDescription: `The character's attacks have a chance to Poison themselves for 60% of their Max Health over 15 seconds`,
    icon: 'ra-chemical-arrow'
  }),
  ['Plagued Scythe']: (level, id) => ({
    name: 'Plagued Scythe',
    type: 'Weapon',
    level,
    id,
    value: 400,
    hp: -0.6,
    power: 0,
    speed: 1,
    class: 'Warlock',
    description: 'A lost weapon from a fallen adventurer. "A A. Ron" is engraved on the back',
    bonusEffect: 'selfPoison',
    effectDescription: `The character's attacks have a chance to Poison themselves for 60% of their Max Health over 15 seconds`,
    icon: 'ra-scythe'
  }),
  ['Plagued Stave']: (level, id) => ({
    name: 'Plagued Stave',
    type: 'Weapon',
    level,
    id,
    value: 400,
    hp: -0.3,
    power: 0.5,
    speed: 0.2,
    class: 'Monk',
    description: 'A lost weapon from a fallen adventurer. "L. N." is engraved on the back',
    bonusEffect: 'selfPoison',
    effectDescription: `The character's attacks have a chance to Poison themselves for 60% of their Max Health over 15 seconds`,
    icon: 'ra-laser-blast'
  }),
  ['Plagued Wand']: (level, id) => ({
    name: 'Plagued Wand',
    type: 'Weapon',
    level,
    id,
    value: 400,
    hp: 0.4,
    power: -0.3,
    speed: 0.3,
    class: 'Mage',
    description: 'A lost weapon from a fallen adventurer. "L. N." is engraved on the back',
    bonusEffect: 'selfPoison',
    effectDescription: `The character's attacks have a chance to Poison themselves for 60% of their Max Health over 15 seconds`,
    icon: 'ra-spear-head'
  }),
  ['Plagued Skull']: (level, id) => ({
    name: 'Plagued Skull',
    type: 'Weapon',
    level,
    id,
    value: 400,
    hp: -0.4,
    power: 0.4,
    speed: 0.2,
    class: 'Necromancer',
    description: 'A lost weapon from a fallen adventurer. "Decaying Deer" is engraved on the back',
    bonusEffect: 'selfPoison',
    effectDescription: `The character's attacks have a chance to Poison themselves for 60% of their Max Health over 15 seconds`,
    icon: 'ra-desert-skull'
  }),
  ['The Antidote']: (level, id) => ({
    name: 'The Antidote',
    type: 'Weapon',
    level,
    id,
    value: 500,
    hp: 0.3,
    power: -0.7,
    speed: 1,
    class: 'Shaman',
    description: 'A lost weapon from a fallen adventurer. "Dr. Dayne" is engraved on the back',
    bonusEffect: 'curePoison',
    effectDescription: `When the Shaman casts Renew on a target, the target is cured of any Poison Effect`,
    icon: 'ra-heart-bottle'
  }),
  ['Fox Aspect']: (level, id) => ({
    name: 'Fox Aspect',
    type: 'Weapon',
    level,
    id,
    value: 500,
    hp: -0.2,
    power: 0.2,
    speed: 0.2,
    class: 'Beast Master',
    description: "That disgusting Piltherer was holding a Fox captive. It seems that the Fox holds the cure to the poison infecting The Swamp",
    bonusEffect: 'foxPet',
    effectDescription: `The Beast Master will summon a Fox as a pet instead. The Fox will inherit (150%) Speed and (30%) Power from the Beast Master, and the Fox's attacks will cure any Poison Effect on itself of it's Beast Master owner`,
    icon: 'ra-fox'
  }),
  ['Glowing Libram']: (level, id) => ({
    name: 'Glowing Libram',
    type: 'Weapon',
    level,
    id,
    value: 500,
    hp: 0.4,
    power: -0.3,
    speed: 0.3,
    class: 'Priest',
    description: 'A lost weapon from a fallen adventurer. "Dr. Dayne" is engraved on the back',
    bonusEffect: 'curePoison',
    effectDescription: `The Priest's heals cure any Poison effect on the spell's Target`,
    icon: 'ra-book'
  }),
  ['Plagued Ocarina']: (level, id) => ({
    name: 'Plagued Ocarina',
    type: 'Weapon',
    level,
    id,
    value: 500,
    hp: 0,
    power: 0.6,
    speed: -0.2,
    class: 'Bard',
    description: '"The Ocarina of Slime"',
    bonusEffect: 'selfPoison',
    effectDescription: `The character's attacks have a chance to Poison themselves for 60% of their Max Health over 15 seconds`,
    icon: 'ra-book'
  }),
  ['Cracked Chassis']: (level, id) => ({
    name: 'Cracked Chassis',
    type: 'weapon',
    level,
    id,
    value: 800,
    hp: -0.5,
    power: 0.2,
    speed: 1,
    description: "A splinter of the Furnace's iron chassis. You wouldn't want to use this to protect you!",
    class: 'Paladin',
    bonusEffect: 'noTaunt',
    effectDescription: 'The Paladin no longer forces the Boss to attack them',
    icon: 'ra-cracked-shield'
  }),
  ['Curved Chassis']: (level, id) => ({
    name: 'Curved Chassis',
    type: 'weapon',
    level,
    id,
    value: 800,
    hp: 0.6,
    power: -0.3,
    speed: 0.2,
    description: "A rounded piece of Iron from the Furnace's outer chassis. This actually seems sturdy enough to wear.",
    class: 'Monk',
    bonusEffect: 'taunt',
    effectDescription: "The Monk's attacks now force the Boss to Target the Monk",
    icon: 'ra-cracked-helm'
  }),
  ['Afterburn Arrows']: (level, id) => ({
    name: 'Afterburn Arrows',
    type: 'weapon',
    level,
    id,
    value: 800,
    hp: 0.7,
    power: -0.5,
    speed: 0.5,
    description: "Splinters of Iron coated in molten metal. These wouldn't just sting once...",
    class: 'Hunter',
    bonusEffect: 'taunt',
    effectDescription: "The Hunter's attacks now force the Boss to Target the Hunter",
    icon: 'ra-flaming-arrow'
  }),
  ['Polarizing Stick']: (level, id) => ({
    name: 'Polarizing Stick',
    type: 'weapon',
    level,
    id,
    value: 800,
    hp: 0,
    power: 1,
    speed: -0.5,
    description: 'Still warm and crackling, electrically charged on one end, maybe hold it by the other end?',
    class: 'Mage',
    bonusEffect: 'charge',
    effectDescription: "The Mage's attacks restore 1 Mana to the Player",
    icon: 'ra-laser-site'
  }),
  ['Lightning Rod']: (level, id) => ({
    name: 'Lightning Rod',
    type: 'weapon',
    level,
    id,
    value: 800,
    hp: 0.5,
    power: -0.4,
    speed: 0.5,
    description: "Lightning never strikes the same place twice, confirmation may require further testing",
    class: 'Warlock',
    bonusEffect: 'lightningRod',
    effectDescription: "The Warlock now only damages themselves for 5% of Max Health whenever they attack (instead of damagin ALL party members)",
    icon: 'ra-magnet'
  }),
  ['Power Drill']: (level, id) => ({
    name: 'Power Drill',
    type: 'weapon',
    level,
    id,
    value: 800,
    hp: 0.2,
    power: -0.8,
    speed: 2,
    description: "Stealth and Subtlety are cool, but sometimes you just want to get straight to the point",
    class: 'Rogue',
    bonusEffect: 'critical',
    effectDescription: "All of the Rogue's attacks are Critical (Double damage, Ignores armor)",
    icon: 'ra-drill'
  }),
  ['Sheet Music']: (level, id) => ({
    name: 'Sheet Music',
    type: 'weapon',
    level,
    id,
    value: 800,
    hp: 0.2,
    power: -0.5,
    speed: 2,
    description: "A melody that was played to calm down the Core whenever it was close to a Meltdown",
    class: 'Bard',
    bonusEffect: 'loseMana',
    effectDescription: "The Bard's attack cause the Player to LOSE 1 Mana instead of gaining 1",
    icon: 'ra-scroll-unfurled'
  }),
  ['Decaying Blade']: (level, id) => ({
    name: 'Decaying Blade',
    type: 'weapon',
    level,
    id,
    value: 800,
    hp: -0.3,
    power: -0.5,
    speed: 0.5,
    description: "What is the Half Life of a Warrior?",
    class: 'Warrior',
    bonusEffect: 'enrage',
    effectDescription: "The Warrior deals Double Damage while below 50% Health",
    icon: 'ra-scroll-unfurled'
  }),
  ['Decayed Core']: (level, id) => ({
    name: 'Decayed Core',
    type: 'weapon',
    level,
    id,
    value: 800,
    hp: 0.3,
    power: -0.3,
    speed: 0.3,
    description: "Is the Recruit half alive, or half dead? It's really a matter of perspective",
    class: 'Priest',
    bonusEffect: 'halfLife',
    effectDescription: "The Priest's heals are Twice as effective against targets ABOVE (50%) Health",
    icon: 'ra-implosion'
  }),
  ['Snake Charmer']: (level, id) => ({
    name: 'Snake Charmer',
    type: 'weapon',
    level,
    id,
    value: 800,
    hp: 0.3,
    power: -0.8,
    speed: 0.5,
    class: 'Shaman',
    description: 'A flute made FROM a Snake to CHARM other Snakes. It seems to scare the other Party members...',
    effectDescription: "When the Shaman casts Renew on a Recruit, the Recruit's Speed is also increased by 10%",
    bonusEffect: 'speedBooster',
    icon: 'ra-snake'
  }),
  ['Crushed Skull']: (level, id) => ({
    name: 'Crushed Skull',
    type: 'weapon',
    level,
    id,
    value: 800,
    hp: 0.5,
    power: -0.2,
    speed: 0,
    class: 'Necromancer',
    description: "You found this under the collapsing walls of the Tunnel, looks like another Adventurer wasn't so lucky.",
    effectDescription: "The Necromancer's attacks deal Critical Damage (Double Damage, Ignores Armor) while Dead",
    bonusEffect: 'criticalDead',
    icon: 'ra-broken-skull'
  })
}
