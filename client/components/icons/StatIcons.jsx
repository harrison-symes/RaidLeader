import React from 'react'

import {classIcons, attackIcons} from '../../utils/classText'
import weaponSwitch from '../../utils/weaponSwitch'
import {getZodiacData} from '../../utils/zodiacs'
// import 'react-tippy/dist/tippy.css'
import {
  Tooltip
} from 'react-tippy';


export function toolTipGenerator(text, display) {
  return <Tooltip
    position="top"
    trigger="mouseenter"
    animation="perspective"
    // followCursor
    inertia
    arrow="true"
    html={text}
    size="big"
    style={{cursor: 'context-menu', display: 'inline-block'}}
  >
    {display}
  </Tooltip>
}

export function DeadRecruitIcon ({name}) {
  return toolTipGenerator(
    <p>{name} has Died</p>,
    <span>
      <i style={{color: 'white'}} className="ra ra-fw ra-tombstone"></i>
    </span>
  )
}

export function PlayerIcon ({name}) {
  return toolTipGenerator(
    <p>{name}</p>,
    <span>
      <i id="PlayerIcon" className="ra ra-lg ra-player-king" />
    </span>
  )
}

export function HealthIcon ({value}) {
  return toolTipGenerator(
    <p>{value} Health</p>,
    <span>
      {value}
      <i className="ra ra-fw ra-two-hearts icon-large" />
    </span>
  )
}

export function SpeedIcon ({value}) {
  return toolTipGenerator(
    <p>{value} Speed</p>,
    <span>
      {value}
      <i className="ra ra-fw ra-lightning-bolt icon-large" />
    </span>
  )
}

export function PowerIcon ({value}) {
  return toolTipGenerator(
    <p>{value} Power</p>,
    <span>
      {value}
      <i className="ra ra-fw ra-axe-swing icon-large" />
    </span>
  )
}

export function CastTimeIcon ({value}) {
  return toolTipGenerator(
    <p>{value} Cast Time</p>,
    <span>
      {value}
      <i className="ra ra-fw ra-stopwatch icon-large" />
    </span>
  )
}

export function CoolDownIcon ({value}) {
  return toolTipGenerator(
    <p>{value} Cool Down</p>,
    <span>
      {value}
      <i className="ra ra-fw ra-hourglass icon-large" />
    </span>
  )
}

export function ManaIcon ({value}) {
  return toolTipGenerator(
    <p>{value} Mana</p>,
    <span>
      {value}
      <i className="ra ra-fw ra-crystals icon-large" />
    </span>
  )
}

export function ManaRegenIcon ({value}) {
  return toolTipGenerator(
    <p>{value} Mana Per Second</p>,
    <span>
      {value}
      <i className="ra ra-fw ra-cycle icon-large" />
    </span>
  )
}

export function GoldIcon ({value}) {
  return toolTipGenerator(
    <p>{value} Gold</p>,
    <span>
      {value}
      <i className="ra ra-fw ra-gold-bar icon-large" />
    </span>
  )
}

export function ArmorIcon ({value}) {
  return toolTipGenerator(
    <p>{value} Armor</p>,
    <span>
      {value}
      <i className="ra ra-fw ra-heavy-shield icon-large" />
    </span>
  )
}

export function ClassIcon ({heroClass, id}) {
  return toolTipGenerator(
    <p>Class: {heroClass}</p>,
    <span>
      <i style={{color: attackIcons(heroClass).colour || 'white'}} id={id || `${heroClass}-${Math.round(Math.random() * 1000)}`} className={`ra ra-fw ${classIcons(heroClass)} icon-large`} />
    </span>
  )
}

export function TargetTypeIcon ({singleTarget}) {
  return toolTipGenerator(
    <p>{singleTarget ? "Requires Friendly Target" : "No Target Needed"}</p>,
    <span>
      <i className={`ra ra-fw  ${singleTarget ? "ra-targeted": " ra-radial-balance"} icon-large`} />
    </span>
  )
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
  return toolTipGenerator(
    <p>Level {level}</p>,
    <span>
      <i style={{color: 'white', backgroundColor: 'black'}} className={`ra ra-fw ra-dice-${num} icon-large`} />
    </span>
  )
}

export function WeaponAvailableIcon ({amount, hasWeapon}) {
  return toolTipGenerator(
    <p>{hasWeapon
      ? `${hasWeapon.name}`
      : `${amount} Weapon${amount != 1 ? 's':''} Available`
    }</p>,
    <span>
      <i style={{color: hasWeapon ? 'lightgreen' : amount > 0 ? 'orange': 'black'}} className={`ra ra-fw ${hasWeapon ? hasWeapon.icon: 'ra-hand'} icon-large`} />
    </span>
  )
}

export function WeaponIcon ({name, level}) {
  const weapon = weaponSwitch[name](level)
  return toolTipGenerator(
    <span>
      {name}
      <hr />
      {weapon.class} Weapon
    </span>,
    <span>
      <i className={`ra ra-fw ${weapon.icon} icon-large`} />
    </span>
  )
}


export function SpellElementIcon ({element}) {
  let icon
  switch(element) {
    case 'Life': icon= 'ra-zigzag-leaf'; break;
    case 'Fire': icon= 'ra-fire'; break;
    case 'Shadow': icon = 'ra-bleeding-eye'; break;
    case 'Arcane': icon = 'ra-crystal-ball'; break;
    default: icon = 'ra-zigzag-leaf'; break;
  }
  return toolTipGenerator(
    <p>{element} Spell</p>,
    <span>
      <i className={`ra ra-fw ${icon} icon-large`} />
    </span>
  )
}

export function SpellIcon ({spell, isLarge}) {
  const {name, icon, color, background} = spell
  return toolTipGenerator(
    <p>{name}</p>,
    <span>
      <i style={{color: color || 'black', backgroundColor: background || 'white'}} className={`ra ra-fw  ${isLarge ? 'ra-3x' : 'ra-fw'} ${icon} icon-large`} />
    </span>
  )
}

export function ZodiacIcon ({zodiac, isLarge}) {
  let data = getZodiacData(zodiac)
  const translatePerc = (val) => `${val < 0 ? '': '+'}${val * 100}%`
  return toolTipGenerator(
    <span>
      <span>{zodiac}</span>
      <hr/>
      {data.health != 0 &&<span>{translatePerc(data.health)} Health<br /></span>}
      {data.power != 0 && <span>{translatePerc(data.power)} Power<br/></span>}
      {data.speed != 0 && <span>{translatePerc(data.speed)} Speed</span>}
    </span>,
    <span>
      <i className={`ra ra-${isLarge ? 'lrg' : 'fw'} ${data.icon}`} />
    </span>
  )
}

export function QuantityIcon ({quantity}) {
  return toolTipGenerator(
    <p>Quantity: {quantity}</p>,
    <span>
      <i className={`ra ra-lg ra-all-for-one icon-large`} />{quantity}
    </span>
  )
}

export function WeaponEquippedByIcon ({equippedBy}) {
  return toolTipGenerator(
    <span>
      {equippedBy.length == 0
        ? <p>Not Equipped</p>
        : <p>{equippedBy.length} Equipped</p>
      }
      {equippedBy.map(recruit => <span key={recruit.id}>
        <hr />
        <p>{recruit.name} the {recruit.heroClass}</p>
      </span>)}
    </span>,
    <span>
      <i className={`ra ra-lg ${equippedBy.length == 0 ? 'ra-hand': 'ra-hand-emblem'} icon-large`} />{equippedBy.length}
    </span>
  )
}

export function RecruitCountIcon ({amount}) {
  return toolTipGenerator(
    <p>You have {amount} Recruit{amount > 1 ? 's' : ''}</p>,
    <span>
      {amount}
      <i className="ra ra-double-team icon-large" />
    </span>
  )
}

export function SpellCountIcon ({amount}) {
  return toolTipGenerator(
    <p>You know {amount} Spell{amount > 1 ? 's' : ''}</p>,
    <span>
      {amount}
      <i className="ra ra-book icon-large" />
    </span>
  )
}
