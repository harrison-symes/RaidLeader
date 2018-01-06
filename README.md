# Raid Leader Design Notes

## Class Design

### Paladin:
  * The Paladin is intended as the "baseline" class. Serves as a tank (takes boss direct hits for your party) by *taunting* with every attack.
  * Physical Attacker
  * Stats: the Paladin should be low power, medium speed and high hp.
  * Traits: The Paladin heals itself whenever it deals damage, to assist with his/her own surviviability, and taunts the boss into attacking the paladin with every attack..
  * Starting Buff: Gains (level) hp for each other party member

### Priest:
  * The priest serves the role of a party spot healer. With no damage capability, the priest will continuously heal the most damaged party member at a fairly high rate. Useful for sustained single target damage with occasional area of effect.
  * Healer
  * Stats: The Priest should be low power, high speed and medium hp.
  * Traits: If no party member is damage, the priest will attack the boss instead
  * Starting Buff: The priest increases the maximum hp of all party member by 50% of the priest initial max hp. The party members will still start at their initial hp total, but can be healed higher from the start of the battle

### Mage:
  * The mage is a special attacking damage dealer. Special attacks are great for ignoring armor, and finishing of bosses when their armor is depleted.
  * Special Attacker
  * Stats: The Mage should be high power, medium speed and low hp.
  * Traits: When the player is below 30% mana, the mage has double power
  * Starting Buff: The Mage increases the total and current *Mana* of the player by 20%

### Rogue:
  * The Rogue is a physical attacking damage dealer. The rogue is intended to be used for piercing armor with their quick attacks
  * Physical Attacker
  * Stats: The rogue should be low power, high speed, medium hp
  * Traits: (20%) chance to deal critical hits
  * Starting Buff: The Boss starts with 10% less hp.

### Warrior:
  * The Warrior is a heavy hitting physical attacker, capable of taking hits.
  * Physical Attacker
  * Stats: The Warrior should be medium power, low speed and high hp.
  * Traits: Power is doubled while below 50% hp
  * Starting Buff: All Party members gain power equal to their own level

### Monk:
  * The Monk is a phsyical attacking group Healer, useful for aoe damage from boss or Warlocks
  * Healer / Physical Attacker
  * Stats: The Monk should be high hp, medium power, low speed
  * Traits: Whenever the Monk deals damage, they heal all friendly characters for (1 or 1/2) of the damage dealt
  * Starting Buff: The Monk gains 1 Speed for every other party member

### Warlock:
  * The Warlock is a very high special damage dealer, with a drawback, every attack will damage all friendly characters
  * Special Attacker
  * Stats: The warlock should be *Very* high power, medium hp, low/medium speed.
  * Traits: Whenever the Warlock deals damage, deal 1/2 of the damage to each friendly character
  * Starting Buff: The Boss loses armor equal to the Warlocks Power
