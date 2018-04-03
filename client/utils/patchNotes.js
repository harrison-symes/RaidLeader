import React from 'react'

import {startingBuff, classTraits} from '../utils/classText'

module.exports = [
  {
    version: '0.4.1',
    updates: [
      {
        title: 'Database Reset!',
        description: <div className="content is-large">
          <p><b>Apologies for destroying your precious progress!</b></p>
          <p>During development this will need to happen from time to time, but I am putting measures in place to prevent this being necessary in the future.</p>
          <p>For those of you with Level 6 Armies, this is a good chance to go through and retest the game more fairly :)</p>
          <p>As much as the <b>Patch Number</b> may suggest, this is not an April Fools Joke</p>
        </div>
      },
      {
        title: 'Player Leveling',
        description: <div className="content is-large">
          <p>A new feature is in the works, and it involves gaining <b>experience</b> and <b>leveling</b> up your Player Character.</p>
          <p>Leveling will provide you with a special currencey which you can use to purchase traits / upgrades.</p>
          <p><b>Present Moment (Watch this space):</b></p>
          <p>&nbsp;&nbsp;&nbsp;&nbsp; - Leveling and experience gains are functional, and you will gain <b>1 Gem</b> every time you level up.</p>
          <p>&nbsp;&nbsp;&nbsp;&nbsp; - Experience Required to Level Up increases by 10% of the previous levels EXP Requirement. (1000, 1100, 1210).</p>
          <p>&nbsp;&nbsp;&nbsp;&nbsp; - Defeating a Boss within a dungeon has a <b>Chance</b> to reward a <b>Gem</b>, this chance is reduced for every <b>Recruit</b> that was higher than the Dungeon's <b>Expected Level</b>. Harder Dungeons have a <b>Higher Chances of Gems</b></p>
          <p>Let me know if you run into any EXP related bugs, and WATCH THIS SPACE</p> '
        </div>
      }
    ]
  },
  {
    version: '0.4',
    updates: [
      {
        title: 'New Dungeon: The Foundry',
        description: <div className="content is-large">
          <p>4 new Bosses await you in <b>The Foundry</b>!</p>
          <p>These Encounters will change their abilities and mechanics <b>DURING</b> the fight, so you better be ready for what these Machines have up their sleeves.</p>
          <p>Grab your best <b>3 Recruits (at Level 3)</b> and <b>3 Spells</b> and dive in! (There's plenty of new Loot to find!).</p>
        </div>
      },
      {
        title: 'Tutorial!',
        description: <div className="content is-large">
          <p>If you ever had trouble learning <b>How to Play</b>, or you're worried you might have been missing something, there is now a <b>Tutorial</b>!</p>
          <p>The Tutorial will be Presented to you upon Registering for the first time. Check it out!</p>
        </div>
      },
      {
        title: 'Key Controls!',
        description: <div className="content is-large">
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
        description: <div className="content is-large">
          <p><b>The Bard</b> is a <b>Mid Health</b>, <b>Mid Power</b>, <b>Mid Speed</b> Recruit.</p>
          <p><b>Starting Buff</b>: {startingBuff('Bard')}</p>
          <p><b>Trait</b>: {classTraits('Bard')}</p>
        </div>
      },
      {
        title: 'New Class: The Necromancer!',
        description: <div className="content is-large">
          <p><b>The Necromancer</b> is a <b>Low Health</b>, <b>Mid Power</b>, <b>Mid Speed</b> Recruit.</p>
          <p><b>Starting Buff</b>: {startingBuff('Necromancer')}</p>
          <p><b>Trait</b>: {classTraits('Necromancer')}</p>
        </div>
      },
      {
        title: 'Spell Changes!',
        description: <div className="content is-large">
          <p>Keep an eye out on <b>Spells</b> as most of them have changed, some in bigger ways than others.</p>
          <p>There are also a <b>LOT</b> of new spells available for you to learn, check them out!</p>
          <p>Whenever you are offered <b>Spells</b> at the <b>Library</b>, you will now be offered a choice from each <b>Element</b> (Life, Fire, Shadow and Arcane). This should make it easier to start building synergies.</p>
          <p>If you don't like the spells your are offered, you can <b>ReRoll</b> your offerings for a small price.</p>
        </div>
      },
      {
        title: 'Recruit Changes!',
        description: <div className="content is-large">
          <p>You will no longer be offered <b>Paladin</b> Recruits for your first few Recruit choice.s</p>
          <p>If you don't like the Recruits you are offered, you may <b>ReRoll</b> the offerings for a small price.</p>
          <p>Many Weapons and Class stats have been tweaked so be sure to keep and eye out.</p>
        </div>
      },
      {
        title: 'Better Loot!',
        description: <div className="content is-large">
          <p>Not getting any <b>Weapons</b> for the Classes you have chosen for your Party sucks</p>
          <p>When you defeat a Boss, the Boss has several Weapons that they can Drop for you, one is Randomly Chosen</p>
          <p>Now, when <b>Randomly</b> choosing which Weapon you will receive, you are <b>3x more likely</b> to receive a Weapon for a Class that was in your Party (if Available)</p>
          <p>Basically, the Loot will ReRoll up to 2 extra times to try and give you a useable item, while still having some randomness</p>
          <p><b>Important: If you already have a copy of the weapon, there is no Bonus chance of it Dropping!</b></p>
        </div>
      },
      {
        title: 'Monk Reworked!',
        description: <div className="content is-large">
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
