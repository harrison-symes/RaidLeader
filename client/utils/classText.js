
export function startingBuff (heroClass) {
  switch(heroClass) {
    case 'Paladin': return 'The Paladin gains (+level) HP for each other Party Member'
    case 'Priest': return "The Priest increases each Party Member's max HP by (50%) of the Priest's own max HP"
    case 'Rogue': return "The Rogue damages the Boss equal to (5%) of the Boss' current HP"
    case 'Warrior': return "The Warrior increases the Power of each other Party Member (Power gained = Party Member's Level)"
    case 'Warlock': return "The Warlock removes armor from the Boss (Armor removed is = to Warlock's Power)"
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
    case 'Monk': return "Whenever the Monk attacks, all Party Members are healed for (100%) of the damage Dealt"
    case 'Warlock': return "Whenever the Warlock attacks, all Party Members take Damage (Damage = Party Member's own Level)"
    default: return null
  }
}
