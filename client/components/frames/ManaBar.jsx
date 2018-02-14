import React from 'react'

import {ManaIcon} from '../icons/StatIcons'
import { Line, Circle } from 'rc-progress';


export default function ({maxMana, mana}) {
  const percent = mana/maxMana * 100
  const colourClass = percent > 1/3*100 ? 'hsl(217, 71%, 53%)' : 'hsl(48, 100%, 67%)'
  return <div className="ManaBar has-text-centered">
    <p className="content"><ManaIcon value={`${mana}/${maxMana}`} /></p>
    <div className="box" style={{height: '15px'}}>
        <Line percent={percent} strokeWidth="10" strokeColor={colourClass} strokeLineCap="square" />
    </div>
  </div>
}
