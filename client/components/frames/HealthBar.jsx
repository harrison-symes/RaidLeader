import React from 'react'
import {connect} from 'react-redux'
import {HealthIcon} from '../icons/StatIcons'

import { Line, Circle } from 'rc-progress';


const HealthBar = ({maxHP, hp}) => {
  const percent = hp/maxHP * 100
  const colourClass = percent >= 25
    ? percent >= 50
      ? 'hsl(171, 100%, 41%)'
      : 'hsl(48, 100%, 67%)'
    : 'hsl(348, 100%, 61%)'
  return <div className="HealthBar has-text-centered box">
    <div className="" style={{height: '15px'}}>
      <p className="content"><HealthIcon value={`${hp} / ${maxHP}`} /></p>
      <Line percent={percent} strokeWidth="10" strokeColor={colourClass} strokeLineCap="square" trailWidth="10" />
    </div>
  </div>
}

export default connect()(HealthBar)
