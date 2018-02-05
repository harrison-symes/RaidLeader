
export function startingBuff (heroClass) {
  switch(heroClass) {
    case 'Paladin': return 'The Paladin gains (+3%) HP for each other Party Member'
    case 'Priest': return "The Priest increases each Party Member's max HP by (10%)"
    case 'Rogue': return "The Rogue damages the Boss equal to (5%) of the Boss' current HP"
    case 'Warrior': return "The Warrior increases the Power of each other Party Member by (+10%)"
    case 'Warlock': return "The Warlock removes armor from the Boss (Armor removed = (300%) of Warlock's Power)"
    case 'Mage': return "The Mage increases the Player's Mana by (20%)"
    case 'Monk': return "The Monk gains (1) speed for each other Party Member"
    default: return null
  }
}

export function classTraits(heroClass) {
  switch(heroClass) {
    case 'Paladin': return "The Paladin's attacks heal the Paladin for (50%) of the Damage dealt. These attacks also force the Boss to target the Paladin"
    case 'Mage': return "The Mage deals (100%) more damage while the Player is below (30%) Mana"
    case 'Warrior': return "The Warrior's attacks deal Critical Damage while the Boss is below (25%) HP. (Critical Damage: Deals (100%) bonus Damage and ignores Armor)"
    case 'Priest': return "The Priest heals a Damaged Party Member instead of Attacking the Boss. (If no Party Member is Damaged, the Priest will attack the Boss instead)"
    case 'Rogue': return "All attacks have a (20%) chance to deal Critical Damage (Critical Damage: Deals (100%) bonus Damage and ignores Armor)"
    case 'Monk': return "Whenever the Monk attacks, all Party Members are healed for (+10%) of their hp"
    case 'Warlock': return "Whenever the Warlock attacks, all Party Members take (5%) of the max HP as damage"
    default: return null
  }
}

export function classIcons (heroClass) {
  switch(heroClass) {
    case 'Paladin': return 'ra-heavy-shield'
    case 'Mage': return 'ra-frostfire'
    case 'Priest': return 'ra-angel-wings'
    case 'Warlock': return 'ra-flaming-claw'
    case 'Rogue': return ' ra-hood'
    case 'Monk': return 'ra-doubled'
    case 'Warrior': return 'ra-knight-helmet'
  }
}
