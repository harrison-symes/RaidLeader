import React from 'react'

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

export function CastTimeIcon () {
  return <div className="tooltip">
    <span className="tooltiptext">Cast Time (s)</span>
    <i className="ra ra-fw ra-stopwatch icon-large" />
  </div>
}

export function CoolDownIcon () {
  return <div className="tooltip">
    <span className="tooltiptext">Cool Down (s)</span>
    <i className="ra ra-fw ra-hourglass icon-large" />
  </div>
}

export function ManaIcon () {
  return <div className="tooltip">
    <span className="tooltiptext">Mana</span>
    <i className="ra ra-fw ra-crystals icon-large" />
  </div>
}
export function ManaRegenIcon () {
  return <div className="tooltip">
    <span className="tooltiptext">Mana Regen (per s)</span>
    <i className="ra ra-fw ra-cycle icon-large" />
  </div>
}
