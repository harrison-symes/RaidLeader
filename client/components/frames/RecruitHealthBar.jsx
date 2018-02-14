import React from 'react'
import {connect} from 'react-redux'
import {HealthIcon, SpeedIcon, PowerIcon} from '../icons/StatIcons'
import EffectTag from './EffectTag'

import { Line, Circle } from 'rc-progress';


const RecruitHealthBar = ({recruit}) => {
  let {hp, initHp, power, speed, effects} = recruit
    const percent = hp/initHp * 100
  const colourClass = percent > 1/3*100
    ? percent > 2/3*100
      ? percent == 100
        ? 'hsl(171, 100%, 41%)'
        : 'hsl(141, 71%, 48%)'
      : 'hsl(48, 100%, 67%)'
    : 'hsl(348, 100%, 61%)'
  return <div className="RecruitHealthBar has-text-centered">
    <div className="">
      <div className="columns">
        <div className="column is-9" style={{heigth: '15px'}}>
          {/* <progress className={`ProgressBar progress ${colourClass}`} max="100" value={percent}>{percent}%</progress> */}
          <Line percent={percent} strokeWidth="4" strokeColor={colourClass} strokeLineCap="square" />
        </div>
        <div className="column is-3"><p className="subtitle is-4"><HealthIcon value={`${Math.round(hp * 10) /10} / ${Math.round(initHp * 10) /10}`} /></p></div>
      </div>
    </div>
  </div>
}

export default connect()(RecruitHealthBar)
