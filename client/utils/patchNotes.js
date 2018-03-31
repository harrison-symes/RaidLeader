import React from 'react'

import {startingBuff, classTraits} from '../utils/classText'

module.exports = [
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
      }
    ]
  }
]
