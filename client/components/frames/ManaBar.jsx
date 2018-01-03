import React from 'react'

export default function ({maxMana, mana}) {
  const percent = mana/maxMana * 100
  console.log({maxMana, mana, percent})
  const colourClass = percent > 1/3*100 ? 'is-info' : 'is-warning'
  return <div className="content has-text-centered">
    <p className="subtitle is-4">Mana: ({mana} / {maxMana})</p>
    <progress className={`progress ${colourClass}`} max="100" value={percent}>{percent}%</progress>
  </div>
}
