import React from 'react'
import {connect} from 'react-redux'
import {HealthIcon} from '../icons/StatIcons'

import { Line, Circle } from 'rc-progress';


const HealthBar = ({maxHP, hp}) => {
  const percent = hp/maxHP * 100
  const colourClass = percent > 1/3*100
    ? percent > 2/3*100
      ? percent == 100
        ? 'blue'
        : 'lightgreen'
      : 'yellow'
    : 'red'
  return <div className="HealthBar has-text-centered">
    <p className="content"><HealthIcon value={`${hp} / ${maxHP}`} /></p>
    <div className="box" style={{height: '15px'}}>
      <Line percent={percent} strokeWidth="10" strokeColor={colourClass} strokeLineCap="square" />
    </div>
  </div>
}

export default connect()(HealthBar)
