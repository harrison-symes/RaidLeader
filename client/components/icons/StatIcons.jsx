import React from 'react'

import {classIcons, attackIcons} from '../../utils/classText'
import weaponSwitch from '../../utils/weaponSwitch'
import {getZodiacData} from '../../utils/zodiacs'
// import 'react-tippy/dist/tippy.css'
import {
  Tooltip
} from 'react-tippy';


function toolTipGenerator(text, display) {
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
      <i style={{color: 'white'}} className="icon ra ra-fw ra-tombstone"></i>
    </span>
  )
}

export function PlayerIcon ({name}) {
  return toolTipGenerator(
    <p>{name}</p>,
    <span>
      <i id="PlayerIcon" className="icon ra ra-lg ra-player-king" />
    </span>
  )
}

export function HealthIcon ({value}) {
  return toolTipGenerator(
    <p>{value} Health</p>,
    <span>
      {value}
      <i className="icon ra ra-fw ra-two-hearts icon-large" />
    </span>
  )
}

export function SpeedIcon ({value}) {
  return toolTipGenerator(
    <p>{value} Speed</p>,
    <p>
      {value}
      <i className="ra ra-fw ra-lightning-bolt icon-large" />
    </p>
  )
}

export function PowerIcon ({value}) {
  return toolTipGenerator(
    <p>{value} Power</p>,
    <p>
      {value}
      <i className="ra ra-fw ra-axe-swing icon-large" />
    </p>
  )
}

export function CastTimeIcon ({value}) {
  return toolTipGenerator(
    <p>{value} Cast Time</p>,
    <p>
      {value}
      <i className="ra ra-fw ra-stopwatch icon-large" />
    </p>
  )
}

export function CoolDownIcon ({value}) {
  return toolTipGenerator(
    <p>{value} Cool Down</p>,
    <p>
      {value}
      <i className="ra ra-fw ra-hourglass icon-large" />
    </p>
  )
}

export function ManaIcon ({value}) {
  return toolTipGenerator(
    <p>{value} Mana</p>,
    <p>
      {value}
      <i className="ra ra-fw ra-crystals icon-large" />
    </p>
  )
}

export function ManaRegenIcon ({value}) {
  return toolTipGenerator(
    <p>{value} Mana Per Second</p>,
    <p>
      {value}
      <i className="ra ra-fw ra-cycle icon-large" />
    </p>
  )
}

export function GoldIcon ({value}) {
  return toolTipGenerator(
    <p>{value} Gold</p>,
    <p>{value}<i className="ra ra-fw ra-gold-bar icon-large" /></p>
  )
}

export function ArmorIcon ({value}) {
  return toolTipGenerator(
    <p>{value} Armor</p>,
    <p>
      {value}
      <i className="ra ra-fw ra-heavy-shield icon-large" />
    </p>
  )
}

export function ClassIcon ({heroClass, id}) {
  return toolTipGenerator(
    <p>Class: {heroClass}</p>,
    <p>
      <i style={{color: attackIcons(heroClass).colour }}id={id || `${heroClass}-${Math.round(Math.random() * 1000)}`} className={`ra ra-fw ${classIcons(heroClass)} icon-large`} />
    </p>
  )
}

export function TargetTypeIcon ({singleTarget}) {
  return toolTipGenerator(
    <p>{singleTarget ? "Requires Friendly Target" : "No Target Needed"}</p>,
    <p>
      <i className={`ra ra-fw ${singleTarget ? "ra-targeted": " ra-radial-balance"} icon-large`} />
    </p>
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
    <p>
      <i style={{color: 'white', backgroundColor: 'black'}} className={`ra ra-fw ra-dice-${num} icon-large`} />
    </p>
  )
}

export function WeaponAvailableIcon ({amount, hasWeapon}) {
  return toolTipGenerator(
    <p>{hasWeapon
      ? `${hasWeapon.name}`
      : `${amount} Weapon${amount != 1 ? 's':''} Available`
    }</p>,
    <p>
      <i style={{color: hasWeapon ? 'lightgreen' : amount > 0 ? 'orange': 'black'}} className={`ra ra-fw ${hasWeapon ? hasWeapon.icon : 'ra-hand'} icon-large`} />
    </p>
  )
}

export function WeaponIcon ({name, level}) {
  const weapon = weaponSwitch[name](level)
  return toolTipGenerator(
    <span>
      <span>{name}</span>
      <hr />
      <span>{weapon.class} Weapon</span>
    </span>,
    <p>
      <i className={`ra ra-fw ${weapon.icon} icon-large`} />
    </p>
  )
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
  return toolTipGenerator(
    <p>{element} Spell</p>,
    <p>
      <i className={`ra ra-fw ${icon} icon-large`} />
    </p>
  )
}

export function SpellIcon ({spell, isLarge}) {
  const {name, icon, color, background} = spell
  return toolTipGenerator(
    <p>{name}</p>,
    <p>
      <i style={{color: color || 'black', backgroundColor: background || 'white'}} className={`ra ra-fw ${isLarge ? 'ra-3x' : 'ra-fw'} ${icon} icon-large`} />
    </p>
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
    <p>
      <i className={`ra ra-${isLarge ? 'lrg' : 'fw'} ${data.icon}`} />
    </p>
  )
}

export function QuantityIcon ({quantity}) {
  return toolTipGenerator(
    <p>Quantity: {quantity}</p>,
    <p>
      <i className={`ra ra-lg ra-all-for-one icon-large`} />{quantity}
    </p>
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
    <p>
      <i className={`ra ra-lg ${equippedBy.length == 0 ? 'ra-hand': 'ra-hand-emblem'} icon-large`} />{equippedBy.length}
    </p>
  )
}

export function RecruitCountIcon ({amount}) {
  return toolTipGenerator(
    <p>You have {amount} Recruit{amount > 1 ? 's' : ''}</p>,
    <p>
      {amount}
      <i className="ra ra-double-team icon-large" />
    </p>
  )
}

export function SpellCountIcon ({amount}) {
  return toolTipGenerator(
    <p>You know {amount} Spell{amount > 1 ? 's' : ''}</p>,
    <p>
      {amount}
      <i className="ra ra-book icon-large" />
    </p>
  )
}
