import React from 'react'

import {classIcons} from '../../utils/classText'
import weaponSwitch from '../../utils/weaponSwitch'
import {getZodiacData} from '../../utils/zodiacs'

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

export function LevelIcon ({level}) {
  let num
  switch(level) {
    case 1: num = 'one'; break;
    case 2: num = 'two'; break;
    case 3: num = 'three'; break;
    case 4: num = 'four'; break;
    case 5: num = 'five'; break;
    case 6: num = 'six'; break;
  }
  return <div className="tooltip">
    <span className="tooltiptext">Level {level}</span>
      <i style={{color: 'white', backgroundColor: 'black'}} className={`ra ra-fw ra-dice-${num} icon-large`} />
    </div>
}

export function WeaponAvailableIcon ({amount, hasWeapon}) {
  return <div className="tooltip">
    <span className="tooltiptext">
      {hasWeapon
        ? <span>
          <p>{hasWeapon.name}</p>
        </span>
        : <p>{amount} Weapon{amount != 1 ? 's':''} Available</p>
      }
    </span>
      <i style={{color: hasWeapon ? 'lightgreen' : amount > 0 ? 'orange': 'black'}} className={`ra ra-fw ${hasWeapon ? hasWeapon.icon : 'ra-hand'} icon-large`} />
    </div>
}

export function WeaponIcon ({name, level}) {
  const weapon = weaponSwitch[name](level)
  return <span className="tooltip">
    <span className="tooltiptext">
      <p>{name}</p>
      <hr />
      <p>{weapon.class} Weapon</p>
    </span>
      <i className={`ra ra-fw ${weapon.icon} icon-large`} />
    </span>
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
    <i style={{color: color || 'black', backgroundColor: background || 'white'}} className={`ra ra-fw ${isLarge ? 'ra-3x' : 'ra-fw'} ${icon} icon-large`} />
  </div>
}

export function ZodiacIcon ({zodiac, isLarge}) {
  let data = getZodiacData(zodiac)
  const translatePerc = (val) => `${val < 0 ? '': '+'}${val * 100}%`
  return <div className="tooltip">
    <span className="tooltiptext">
      <p>{zodiac}</p>
      <hr/>
      {data.health != 0 &&<p>{translatePerc(data.health)} Health</p>}
      {data.power != 0 && <p>{translatePerc(data.power)} Power</p>}
      {data.speed != 0 && <p>{translatePerc(data.speed)} Speed</p>}
    </span>
    <i className={`ra ra-${isLarge ? 'lrg' : 'fw'} ${data.icon}`} />
  </div>
}
