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

export function PlayerIcon ({player}) {
  const {name, manaRegen, power} = player
  return toolTipGenerator(
    <span>
      <p>{name}</p>
      <hr />
      <p>{manaRegen} Mana Regen</p>
      <p>{power} Power</p>
    </span>,
    <span>
      <i id="PlayerIcon" className="ra ra-lg ra-king" />
    </span>
  )
}

export function HealthIcon ({value}) {
  return toolTipGenerator(
    <p>{value} Health</p>,
    <span>
      {value}
      <i className="ra ra-fw ra-charm icon-large" />
    </span>
  )
}

export function SpeedIcon ({value}) {
  return toolTipGenerator(
    <p>{value} Speed</p>,
    <span>
      {value}
      <i className="ra ra-fw ra-electric icon-large" />
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
      <i className="ra ra-fw ra-crystal-cluster icon-large" />
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
export function GemIcon ({value}) {
  return toolTipGenerator(
    <p>{value} Gem{value == 1 ? '' : 's'}</p>,
    <span>
      {value}
      <i className="ra ra-fw ra-cut-diamond icon-large" />
    </span>
  )
}

export function ArmorIcon ({value}) {
  return toolTipGenerator(
    <p>{value} Armor</p>,
    <span>
      {value}
      <i className="ra ra-fw ra-layered-armor icon-large" />
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
  return toolTipGenerator(
    <p>Level {level}</p>,
    <span>
      <i style={{color: 'black', backgroundColor: 'white'}} className={`ra ra-fw ra-inverted-dice-${level} icon-large`} />
    </span>
  )
}

export function WeaponAvailableIcon ({amount, hasWeapon, lowLevel}) {
  return toolTipGenerator(
    <p>{hasWeapon
      ? `${hasWeapon.name}`
      : amount == lowLevel && amount != 0
        ? `${lowLevel} Weapon${lowLevel == 1 ? '' : 's'}, but Recruit's Level is too Low`
        : `${amount} Weapon${amount != 1 ? 's':''} Available`
    }</p>,
    <span>
      <i style={{color: hasWeapon ? 'lightgreen' : amount == lowLevel && amount != 0 ? 'red' : amount > 0 ? 'orange': 'black'}} className={`ra ra-fw ${hasWeapon ? hasWeapon.icon: 'ra-hand'} icon-large`} />
    </span>
  )
}

export function WeaponIcon ({name, level}) {
  const weapon = weaponSwitch[name](level)
  return toolTipGenerator(
    <span>
      {name}
      <hr />
      {weapon.class} Weapon <br />
      {weapon.effectDescription && <hr />}
      {weapon.effectDescription}
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
  const {name, icon, color, background, description} = spell
  return toolTipGenerator(
    <span>
      <p>{name}</p>
      <hr />
      <p>{description}</p>
    </span>,
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
    <span>
      <p>You have {amount} Recruit{amount > 1 ? 's' : ''}</p>
      <p>(Click to View)</p>
    </span>,
    <span>
      {amount}
      <i className="ra ra-backup icon-large" />
    </span>
  )
}

export function SpellCountIcon ({amount}) {
  return toolTipGenerator(
    <span>
      <p>You know {amount} Spell{amount > 1 ? 's' : ''}</p>
      <p>(Click to View)</p>
    </span>,
    <span>
      {amount}
      <i className="ra ra-spell-book icon-large" />
    </span>
  )
}

export function GameRecruitInfo ({recruit}) {
  const {name, hp, initHp, power, speed} = recruit
  return toolTipGenerator(
    <span>
      <p>{Math.round(power * 10) / 10} Power</p>
      <p>{Math.round(speed * 10) / 10} Speed</p>
      <p>({Math.round(power * speed) / 10} Dps)</p>
    </span>,
    <span>
      {name}
    </span>
  )
}
