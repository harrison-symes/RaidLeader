import React from 'react'

import {classIcons} from '../../utils/classText'
import weaponSwitch from '../../utils/weaponSwitch'
import {getZodiacData} from '../../utils/zodiacs'

export function HealthIcon ({value}) {
  return <span className="tooltip">
    <span className="tooltiptext">{value} Health</span>
    {value}
    <i className="ra ra-fw ra-two-hearts icon-large" />
  </span>
}

export function SpeedIcon ({value}) {
  return <span className="tooltip">
    <span className="tooltiptext">{value} Speed</span>
    {value}
    <i className="ra ra-fw ra-lightning-bolt icon-large" />
  </span>
}

export function PowerIcon ({value}) {
  return <span className="tooltip">
    <span className="tooltiptext">{value} Power</span>
    {value}
    <i className="ra ra-fw ra-axe-swing icon-large" />
  </span>
}

export function CastTimeIcon ({value}) {
  return <span className="tooltip">
    <span className="tooltiptext">{value} Cast Time</span>
    {value}
    <i className="ra ra-fw ra-stopwatch icon-large" />
  </span>
}

export function CoolDownIcon ({value}) {
  return <span className="tooltip">
    <span className="tooltiptext">{value} Cool Down </span>
    {value}
    <i className="ra ra-fw ra-hourglass icon-large" />
  </span>
}

export function ManaIcon ({value}) {
  return <span className="tooltip">
    <span className="tooltiptext">{value} Mana</span>
    {value}
    <i className="ra ra-fw ra-crystals icon-large" />
  </span>
}

export function ManaRegenIcon ({value}) {
  return <span className="tooltip">
    <span className="tooltiptext">{value} Mana Regen (per s)</span>
    {value}
    <i className="ra ra-fw ra-cycle icon-large" />
  </span>
}

export function GoldIcon ({value}) {
  return <span className="tooltip">
    <span className="tooltiptext">{value} Gold</span>
    {value}
    <i className="ra ra-fw ra-gold-bar icon-large" />
  </span>
}

export function ArmorIcon ({value}) {
  return <span className="tooltip">
    <span className="tooltiptext">{value} Armor</span>
    {value}
    <i className="ra ra-fw ra-heavy-shield icon-large" />
  </span>
}

export function ClassIcon ({heroClass}) {
  return <span className="tooltip">
    <span className="tooltiptext">{heroClass}</span>
      <i className={`ra ra-fw ${classIcons(heroClass)} icon-large`} />
    </span>
}

export function TargetTypeIcon ({singleTarget}) {
  return <span className="tooltip">
    <span className="tooltiptext">{singleTarget ? "Requires Friendly Target" : "No Target Needed"}</span>
      <i className={`ra ra-fw ${singleTarget ? "ra-targeted": " ra-radial-balance"} icon-large`} />
    </span>
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
  return <span className="tooltip">
    <span className="tooltiptext">Level {level}</span>
      <i style={{color: 'white', backgroundColor: 'black'}} className={`ra ra-fw ra-dice-${num} icon-large`} />
    </span>
}

export function WeaponAvailableIcon ({amount, hasWeapon}) {
  return <span className="tooltip">
    <span className="tooltiptext">
      {hasWeapon
        ? `${hasWeapon.name}`
        : `${amount} Weapon${amount != 1 ? 's':''} Available`
      }
    </span>
      <i style={{color: hasWeapon ? 'lightgreen' : amount > 0 ? 'orange': 'black'}} className={`ra ra-fw ${hasWeapon ? hasWeapon.icon : 'ra-hand'} icon-large`} />
    </span>
}

export function WeaponIcon ({name, level}) {
  const weapon = weaponSwitch[name](level)
  return <span className="tooltip">
    <span className="tooltiptext">
      <span>{name}</span>
      <hr />
      <span>{weapon.class} Weapon</span>
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
  return <span className="tooltip">
    <span className="tooltiptext">{element} Spell</span>
      <i className={`ra ra-fw ${icon} icon-large`} />
    </span>
}

export function SpellIcon ({spell, isLarge}) {
  const {name, icon, color, background} = spell
  return <span className="tooltip box">
    <span className="tooltiptext">{name}</span>
    <i style={{color: color || 'black', backgroundColor: background || 'white'}} className={`ra ra-fw ${isLarge ? 'ra-3x' : 'ra-fw'} ${icon} icon-large`} />
  </span>
}

export function ZodiacIcon ({zodiac, isLarge}) {
  let data = getZodiacData(zodiac)
  const translatePerc = (val) => `${val < 0 ? '': '+'}${val * 100}%`
  return <span className="tooltip">
    <span className="tooltiptext">
      <span>{zodiac}</span>
      <hr/>
      {data.health != 0 &&<span>{translatePerc(data.health)} Health<br /></span>}
      {data.power != 0 && <span>{translatePerc(data.power)} Power<br/></span>}
      {data.speed != 0 && <span>{translatePerc(data.speed)} Speed</span>}
    </span>
    <i className={`ra ra-${isLarge ? 'lrg' : 'fw'} ${data.icon}`} />
  </span>
}

export function QuantityIcon ({quantity}) {
  return <span className="tooltip">
    <span className="tooltiptext">Quantity: {quantity}</span>
    <i className={`ra ra-lg ra-all-for-one icon-large`} />{quantity}
  </span>
}

export function WeaponEquippedByIcon ({equippedBy}) {
  return <span className="tooltip">
    <span className="tooltiptext">
      {equippedBy.length == 0
        ? <p>Not Equipped</p>
        : <p>{equippedBy.length} Equipped</p>
      }
      <br />
      {equippedBy.map(recruit => <span key={recruit.id}>
        <hr />
        <p>{recruit.name} the {recruit.heroClass}</p>
      </span>)}
    </span>
    <i className={`ra ra-lg ${equippedBy.length == 0 ? 'ra-hand': 'ra-hand-emblem'} icon-large`} />{equippedBy.length}
  </span>
}
