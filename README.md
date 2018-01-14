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
  * Traits: Always deals critical damage when the boss is below 25% hp
  * Starting Buff: All other Party members gain power equal to their own level

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
  * Traits: Whenever the Warlock deals damage, deale damage to each friendly character (damage = character level)
  * Starting Buff: The Boss loses armor equal to the Warlocks Power

## Player Spells

  |Name|Power Ratio|Cast Time|Cost|Cooldown|Type|Target|Description|
   | --- | --- | --- | --- | --- | --- | --- | --- | --- | 
   | Lesser Heal | 100% | 1 | 10 | 0.5 | Healing | True | A quick but expensive single target Heal | 
   | Heal | 200% | 3 | 10 | 0.5 | Healing | True | An efficient single target Heal | 
   | Greater Heal | 300% | 5 | 10 | 0.5 | Healing | True | A slow, but powerful and very efficient single target heal | 
   | Healing Ring | 200% | 3 | 10 | 5 | Healing | False | Heals ALL friendly characters | 
   | Bind | 200% | 0 | 10 | 10 | Healing | True | Instant cast, heals a single friendly target, and also heals the PLAYER | 
   | Fireball | 300% | 5 | 15 | 0 | Damage | False | A slow cast damage spell. Damages the Boss | 
   | Fireblast | 200% | 2.5 | 15 | 5 | Damage | False | A quicker Boss Damage spell, but not as efficient as Fireball | 
   | Flash Fire | 100% | 0 | 15 | 10 | Damage/Healing | False | Instant cast but very expensive boss damage spell, with a long cooldown | 
   | Drain Life | 100% | 2 | 5 | 5 | Damage | False | Damages the boss and heals the player for the amount of damage done | 
   | Harvest Life | 300% | 5 | 20 | 20 | Damage/Healing | False | Slow and heavy Boss Damage and Heals ALL friendly characters for the amount of damage done | 
   | Drain Soul | 200% | 5 | 0 | 0 | Damage/Healing | False | Slow Boss Damage spell that restores health and mana to the player. No Cooldown | 
   | Life Tap | 300% | 0 | 0 | 10 | Special | False | Sacrifice life to gain mana, instant cast | 
   | Evocate | 500% | 5 | 0 | 0 | Special | False | Slow casting spell that restores mana | 
