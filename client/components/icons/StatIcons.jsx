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
