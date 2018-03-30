import React from 'react'
import {connect} from 'react-redux'
import {HealthIcon, SpeedIcon, PowerIcon} from '../icons/StatIcons'
import EffectTag from './EffectTag'

import { Line, Circle } from 'rc-progress';


const RecruitHealthBar = ({recruit, party}) => {
  let {hp, initHp, power, speed, effects} = recruit
  const percent = hp/initHp * 100
  const colourClass = percent >= 25
    ? percent >= 50
      ? 'hsl(171, 100%, 41%)'
      : 'hsl(48, 100%, 67%)'
    : 'hsl(348, 100%, 61%)'
  return <div className="RecruitHealthBar has-text-centered">
    <div className="">
      <span className="column" style={{maxHeigth: '15px', margin: 0}}>
        <Line percent={percent} strokeWidth={`${4 * party.length}`} strokeColor={colourClass} strokeLinecap="square"  trailWidth={`${4 * party.length}`}/>
      </span>
      <div className="columns" style={{marginTop: 0, backgroundColor: 'white'}}>
        <span className="column is-pulled-left"><p className="subtitle is-5">{Math.round(percent)}%</p></span>
        <div className="column is-pulled-right is-desktop-only"><p className="subtitle is-5"><HealthIcon value={`${Math.round(hp)} / ${Math.round(initHp)}`} /></p></div>
      </div>
    </div>
  </div>
}

const mapStateToProps = ({party}) => ({party})

export default connect(mapStateToProps)(RecruitHealthBar)
