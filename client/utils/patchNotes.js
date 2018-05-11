import React from 'react'

import {startingBuff, classTraits} from '../utils/classText'

module.exports = [
  {
    version: '0.4.3',
    updates: [
      {
        title: 'Icons! Icons Everywhere!',
        description: <div className="content is-medium has-text-dark">
          <p>The Game has updated from a sheet of 500 Icons, to over 3000 icons!</p>
          <p>This means that some old spells, classes and weapons have had their icons changed (for the better), but this might take some getting used to.</p>
          <p>Let me know if you preferred the old icons for any of the chnges!</p>
        </div>
      }
    ]
  },
  {
    version: '0.4.2',
    updates: [
      {
        title: 'New Class: Beast Master!',
        description: <div className="content is-medium has-text-dark">
          <p><b>The Beast Master</b> is a <b>Mid Health</b>, <b>Mid Power</b>, <b>Mid Speed</b> Recruit.</p>
          <p><b>Starting Buff</b>: {startingBuff('Beast Master')}</p>
          <p><b>Trait</b>: {classTraits('Beast Master')}</p>
          <p>- The Beast Master's Weapons are still in development and will <b>Soon</b> be available from all Dungeons (and they're gonna be really, really, reallllllly cool!)</p>
        </div>
      },
      {
        title: 'New Effects; Stunned and Bomb',
        description: <div className="content is-medium has-text-dark">
          <p>In Preparation for developing <b>The Armory</b>, I've been hard at work on several New and Interesting Effects</p>
          <br />
          <p><b>Stunned:</b> A Stunned Recruit cannot Attack. The Recruit's Attack timer will continue to 'tick' during the stun, but any <b>Completed</b> Attacks will not happen while <b>Stunned</b></p>
          <hr />
          <p><b>Bomb:</b> A Bomb Effect can be placed on a Recruit. The Bomb will <b>Explode</b> when it <b>Expires</b>, damagin <b>All Recruits</b> for a specified Health % (default is 20%)</p>
          <br />
          <p>If you want to try out the new Effects, there are several new Spells that utilise them in interesting ways</p>
        </div>
      },
      {
        title: 'The Wilds has been tweaked',
        description: <div className="content is-medium has-text-dark">
          <p>The Bear will now <b>Stun</b> their Target upon using <b>Bite</b> for 3 seconds.</p>
          <p>The Spider has a new ability; <b>Web Wrap</b>, which will <b>Stun</b> a Random Recruit for 5 seconds</p>
        </div>
      }
    ]
  },
  {
    version: '0.4.1',
    updates: [

      {
        title: 'Database Reset!',
        description: <div className="content is-medium has-text-dark">
          <p><b>Apologies for destroying your precious progress!</b></p>
          <p>During development this will need to happen from time to time, but I am putting measures in place to prevent this being necessary in the future.</p>
          <p>For those of you with Level 6 Armies, this is a good chance to go through and retest the game more fairly :)</p>
          <p>As much as the <b>Patch Number</b> may suggest, this is not an April Fools Joke</p>
        </div>
      },
      {
        title: 'Player Leveling',
        description: <div className="content is-medium has-text-dark">
          <p>A new feature is in the works, and it involves gaining <b>experience</b> and <b>leveling</b> up your Player Character.</p>
          <p>Leveling will provide you with a special currencey which you can use to purchase traits / upgrades.</p>
          <p>&nbsp;&nbsp;&nbsp;&nbsp; - Leveling and experience gains are functional, and you will gain <b>1 Gem</b> every time you level up.</p>
          <p>&nbsp;&nbsp;&nbsp;&nbsp; - Experience Required to Level Up increases by 10% of the previous levels EXP Requirement. (1000, 1100, 1210).</p>
          <p>&nbsp;&nbsp;&nbsp;&nbsp; - Defeating a Boss within a dungeon has a <b>Chance</b> to reward a <b>Gem</b>, this chance is reduced for every <b>Recruit</b> that was higher than the Dungeon's <b>Expected Level</b>. Harder Dungeons have a <b>Higher Chances of Gems</b></p>
          <br />
          <p>&nbsp;&nbsp;&nbsp;&nbsp; - You can spend the <b>Gems</b> that you have earned at the <b>Mage Tower</b></p>
          <p>Let me know if you run into any EXP related bugs</p>
        </div>
      },
      {
        title: 'Mage Tower Added!',
        description: <div className="content is-medium has-text-dark">
          <p>The <b>Mage Tower</b> is a new Menu you will find in <b>Town</b></p>
          <p>At the Mage Tower you can spend the <b>Gems</b> that you have earned on your adventure</p>
          <p>You will find <b>4</b> different <b>"Trees"</b>, one for each element</p>
          <p>In each tree you will find <b>Spells</b> that you can learn, or <b>Passive Traits</b> which will empower you <b>Player and/or Recruits</b> in various ways for the <b>Rest of your Adventure</b></p>
          <p>As unlock <b>Traits</b> for a Element Type, you will be able to purchase more <b>Expensive</b> but <b>Powerful</b> Traits and Spells further down the Tree</p>
          <br />
          <p>There are some <b>Wild</b> combinations to build towards to make you the <b>Most Powerful Raid Leader!</b></p>
        </div>
      },
      {
        title: 'Speed Scaling Changes',
        description: <div className="content is-medium has-text-dark">
          <p>Some Classes, namely <b>Bard</b> and <b>Shaman</b> have very powerful Traits at the cost of having low Power / Speed.</p>
          <p>This meant that a Shaman with a <b>+20% Speed Zodiac</b> was amazing, but a <b>-20% Speed Zodiac</b> was terrible.</p>
          <p>To fix this, I have changed the <b>Traits</b> of the <b>Bard and Shaman</b></p>
          <p><b>Bard</b>:</p>
          <p>&nbsp;&nbsp;&nbsp;&nbsp; - <b>Previous Trait</b>: Whenever the Bard attacks, restore 1 Mana to the Player</p>
          <p>&nbsp;&nbsp;&nbsp;&nbsp; - <b>New Trait</b>: The Bard's attacks have a chance to restore 3 Mana to the Player. (This chance scales with the Bard's Speed and will occur roughly once per 10 seconds.)</p>
          <p><b>Shaman</b>:</p>
          <p>&nbsp;&nbsp;&nbsp;&nbsp; - <b>Previous Trait</b>: "The Shaman's attacks also place a Renew effect on a friendly recruit with the lowest health %, healing for 60% of Target's Max Health over 15 seconds</p>
          <p>&nbsp;&nbsp;&nbsp;&nbsp; - <b>New Trait</b>: The Shaman's attacks have a chance to place a Renew effect on a friendly recruit with the lowest health %, healing for 60% of Target's Max Health over 15 seconds. (This chance scales with the Shaman's Speed and will occur roughly once per 10 seconds.)</p>
        </div>
      }
    ]
  },
  {
    version: '0.4',
    updates: [
      {
        title: 'New Dungeon: The Foundry',
        description: <div className="content is-medium has-text-dark">
          <p>4 new Bosses await you in <b>The Foundry</b>!</p>
          <p>These Encounters will change their abilities and mechanics <b>DURING</b> the fight, so you better be ready for what these Machines have up their sleeves.</p>
          <p>Grab your best <b>3 Recruits (at Level 3)</b> and <b>3 Spells</b> and dive in! (There's plenty of new Loot to find!).</p>
        </div>
      },
      {
        title: 'Tutorial!',
        description: <div className="content is-medium has-text-dark">
          <p>If you ever had trouble learning <b>How to Play</b>, or you're worried you might have been missing something, there is now a <b>Tutorial</b>!</p>
          <p>The Tutorial will be Presented to you upon Registering for the first time. Check it out!</p>
        </div>
      },
      {
        title: 'Key Controls!',
        description: <div className="content is-medium has-text-dark">
          <p>Sick of frantically clicking back and forth between your Recruits and your Spells? Worry no more!</p>
          <p>You can now cast <b>Spells</b> using the <b>Number Keys</b>:</p>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;<b>(1)</b> will cast the first spell on your <b>Spell Bar</b>, <b>(2)</b> will cast your second spell, etc...</p>
          <p>You can also change <b>Target</b> with the <b>Arrow Keys</b>:</p>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;<b>(Up)</b> and <b>(Down)</b> will swap between Targeting your <b>Recruits</b> and your <b>Player Character.</b></p>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;<b>(Left)</b> and <b>(Right)</b> will shift along your <b>Recruits</b> as Targets.</p>
          <p>Try it out and let me know how it feels!</p>
        </div>
      },
      {
        title: 'New Class: The Bard!',
        description: <div className="content is-medium has-text-dark">
          <p><b>The Bard</b> is a <b>Mid Health</b>, <b>Mid Power</b>, <b>Mid Speed</b> Recruit.</p>
          <p><b>Starting Buff</b>: {startingBuff('Bard')}</p>
          <p><b>Trait</b>: {classTraits('Bard')}</p>
        </div>
      },
      {
        title: 'New Class: The Necromancer!',
        description: <div className="content is-medium has-text-dark">
          <p><b>The Necromancer</b> is a <b>Low Health</b>, <b>Mid Power</b>, <b>Mid Speed</b> Recruit.</p>
          <p><b>Starting Buff</b>: {startingBuff('Necromancer')}</p>
          <p><b>Trait</b>: {classTraits('Necromancer')}</p>
        </div>
      },
      {
        title: 'Spell Changes!',
        description: <div className="content is-medium has-text-dark">
          <p>Keep an eye out on <b>Spells</b> as most of them have changed, some in bigger ways than others.</p>
          <p>There are also a <b>LOT</b> of new spells available for you to learn, check them out!</p>
          <p>Whenever you are offered <b>Spells</b> at the <b>Library</b>, you will now be offered a choice from each <b>Element</b> (Life, Fire, Shadow and Arcane). This should make it easier to start building synergies.</p>
          <p>If you don't like the spells your are offered, you can <b>ReRoll</b> your offerings for a small price.</p>
        </div>
      },
      {
        title: 'Recruit Changes!',
        description: <div className="content is-medium has-text-dark">
          <p>You will no longer be offered <b>Paladin</b> Recruits for your first few Recruit choice.s</p>
          <p>If you don't like the Recruits you are offered, you may <b>ReRoll</b> the offerings for a small price.</p>
          <p>Many Weapons and Class stats have been tweaked so be sure to keep and eye out.</p>
        </div>
      },
      {
        title: 'Better Loot!',
        description: <div className="content is-medium has-text-dark">
          <p>Not getting any <b>Weapons</b> for the Classes you have chosen for your Party sucks</p>
          <p>When you defeat a Boss, the Boss has several Weapons that they can Drop for you, one is Randomly Chosen</p>
          <p>Now, when <b>Randomly</b> choosing which Weapon you will receive, you are <b>3x more likely</b> to receive a Weapon for a Class that was in your Party (if Available)</p>
          <p>Basically, the Loot will ReRoll up to 2 extra times to try and give you a useable item, while still having some randomness</p>
          <p><b>Important: If you already have a copy of the weapon, there is no Bonus chance of it Dropping!</b></p>
        </div>
      },
      {
        title: 'Monk Reworked!',
        description: <div className="content is-medium has-text-dark">
          <p>Across the Board the have been changes to the power of AOE (Area of Effect) Damage and Healing</p>
          <p>Overall these changes are intended to make the gameplay more interesting, and to make Targeted Spells continue to feel useful as the size of your Party starts to grow.</p>
          <p>The Monk's previous <b>Trait</b> was to <b>Heal All Recruits for (10%) of their Max Health whenever the Monk attacks</b></p>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;- The new <b>Trait</b>: {classTraits('Monk')}</p>
          <p>The Monk's previous <b>Trait</b> was to <b>Gain (50%) Speed for each other Party Member. This caused the Monk to be really weak and ineffective at lower party sizes (early dungeons) and then get quite out of control later on.</b></p>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;- The new <b>Starting Buff</b>: {startingBuff('Monk')}</p>
          <br />
          <p>These changes should put the Monk's Healing Output to be more in Line with the <b>Priest</b> while still being able to get a few jabs in on the Boss, making the <b>Monk</b> a better choice for <b>AOE</b> heavy encounters</p>
          <p>This is all new and in need of testing so feedback is very much appreciated!</p>
        </div>
      }
    ]
  }
]
