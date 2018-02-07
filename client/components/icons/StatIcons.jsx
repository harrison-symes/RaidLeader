import React from 'react'

import {classIcons} from '../../utils/classText'

export function HealthIcon ({value}) {
  return <div className="tooltip">
    <span className="tooltiptext">{value} Health</span>
    {value}
    <i className="ra ra-fw ra-two-hearts icon-large" />
  </div>
}

export function SpeedIcon ({value}) {
  return <div className="tooltip">
    <span className="tooltiptext">{value} Speed</span>
    {value}
    <i className="ra ra-fw ra-lightning-bolt icon-large" />
  </div>
}

export function PowerIcon ({value}) {
  return <div className="tooltip">
    <span className="tooltiptext">{value} Power</span>
    {value}
    <i className="ra ra-fw ra-axe-swing icon-large" />
  </div>
}

export function CastTimeIcon ({value}) {
  return <div className="tooltip">
    <span className="tooltiptext">{value} Cast Time</span>
    {value}
    <i className="ra ra-fw ra-stopwatch icon-large" />
  </div>
}

export function CoolDownIcon ({value}) {
  return <div className="tooltip">
    <span className="tooltiptext">{value} Cool Down </span>
    {value}
    <i className="ra ra-fw ra-hourglass icon-large" />
  </div>
}

export function ManaIcon ({value}) {
  return <div className="tooltip">
    <span className="tooltiptext">{value} Mana</span>
    {value}
    <i className="ra ra-fw ra-crystals icon-large" />
  </div>
}

export function ManaRegenIcon ({value}) {
  return <div className="tooltip">
    <span className="tooltiptext">{value} Mana Regen (per s)</span>
    {value}
    <i className="ra ra-fw ra-cycle icon-large" />
  </div>
}

export function GoldIcon ({value}) {
  return <div className="tooltip">
    <span className="tooltiptext">{value} Gold</span>
    {value}
    <i className="ra ra-fw ra-gold-bar icon-large" />
  </div>
}

export function ArmorIcon ({value}) {
  return <div className="tooltip">
    <span className="tooltiptext">{value} Armor</span>
    {value}
    <i className="ra ra-fw ra-heavy-shield icon-large" />
  </div>
}

export function ClassIcon ({heroClass}) {
  return <div className="tooltip">
    <span className="tooltiptext">{heroClass}</span>
      <i className={`ra ra-fw ${classIcons(heroClass)} icon-large`} />
    </div>
}

export function TargetTypeIcon ({singleTarget}) {
  return <div className="tooltip">
    <span className="tooltiptext">{singleTarget ? "Requires Friendly Target" : "No Target Needed"}</span>
      <i className={`ra ra-fw ${singleTarget ? "ra-targeted": " ra-radial-balance"} icon-large`} />
    </div>
}

export function WeaponAvailableIcon ({amount, hasWeapon}) {
  return <div className="tooltip">
    <span className="tooltiptext">{amount} Weapon{amount > 1 ? 's':''} Available</span>
      <i style={{color: hasWeapon ? 'lightgreen' : 'orange'}} className={`ra ra-fw ${hasWeapon ? 'ra-all-for-one' : 'ra-hand'} icon-large`} />
    </div>
}

export function SpellElementIcon ({element}) {
  let icon
  switch(element) {
    case 'Life': icon = 'ra-zigzag-leaf'; break;
    case 'Fire': icon = 'ra-fire'; break;
    case 'Shadow': icon = 'ra-bleeding-eye'; break;
    case 'Arcane': icon = 'ra-crystal-ball'; break;
    default: icon = 'ra-zigzag-leaf'; break;
  }
  return <div className="tooltip">
    <span className="tooltiptext">{element} Spell</span>
      <i className={`ra ra-fw ${icon} icon-large`} />
    </div>
}

export function SpellIcon ({spell, isLarge}) {
  const {name, icon, color, background} = spell
  return <div className="tooltip box">
    <span className="tooltiptext">{name}</span>
    <i style={{color: color || 'green', backgroundColor: background || 'white'}} className={`ra ra-fw ${isLarge ? 'ra-3x' : 'ra-fw'} ${icon} icon-large`} />
  </div>
}
