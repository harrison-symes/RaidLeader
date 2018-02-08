import React from 'react'

import {ManaIcon} from '../icons/StatIcons'

export default function ({maxMana, mana}) {
  const percent = mana/maxMana * 100
  const colourClass = percent > 1/3*100 ? 'is-info' : 'is-warning'
  return <div className="ManaBar has-text-centered">
    <p className="subtitle is-4"><ManaIcon value={`${mana}/${maxMana}`} /></p>
    <div className="box">
      <progress className={`ProgressBar progress ${colourClass}`} max="100" value={percent}>{percent}%</progress>
    </div>
  </div>
}
