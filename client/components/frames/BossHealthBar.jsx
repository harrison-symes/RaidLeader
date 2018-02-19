import React from 'react'
import {connect} from 'react-redux'
import {HealthIcon, ArmorIcon, ManaIcon} from '../icons/StatIcons'
import { Line, Circle } from 'rc-progress';

const healthBar = (current, max, armor) => {
  const percent = Math.round(current/max * 100)
  const colourClass = percent > 25
    ? percent > 50
      ? percent == 100
        ? 'hsl(171, 100%, 41%)'
        : 'hsl(141, 71%, 48%)'
      : 'hsl(48, 100%, 67%)'
    : 'hsl(348, 100%, 61%)'
  return <div className="column">
    <div className="">
      <Line percent={percent} strokeWidth={armor == 0 ? '3' : '6'} strokeColor={colourClass} strokeLinecap="square" trailWidth="6"/>
    </div>
    <p className="subtitle is-5"><HealthIcon value={`${current} / ${max}`} /></p>
  </div>
}

const armorBar = (current, max) => {
  const percent = Math.round(current/max * 100)
  return <div className="column">
    <div className="">
      <Line percent={percent} strokeWidth="6" strokeColor={'hsl(0, 0%, 48%)'} strokeLinecap="square" trailWidth="6" />
      {/* <progress className={`ProgressBar progress is-small ArmorBar`} max="100" value={percent}>{percent}%</progress> */}
      <p className="subtitle is-5"><ArmorIcon value={`${current} / ${max}`} /></p>
    </div>
  </div>
}

const manaBar = (current, max) =>{
  const percent = current/max * 100
  return <div className="column is-4 ManaBar has-text-centered">
    <div className="">
      <Line percent={percent} strokeWidth="6" strokeColor={'hsl(217, 71%, 53%)'} strokeLinecap="square" trailWidth="6" />
      {/* <progress className={`ProgressBar progress is-small ${colourClass}`} max="100" value={percent}>{percent}%</progress> */}
      <p className="subtitle is-5"><ManaIcon value={`${current}/${max}`} /></p>
    </div>
  </div>
}

const BossHealthBar = ({boss}) => {
  const {initHp, hp, armor, initArmor, mana, maxMana} = boss
  const percent = hp/initHp * 100
  const colourClass = percent > 1/3*100
    ? percent > 2/3*100
      ? percent == 100
        ? 'is-primary'
        : 'is-success'
      : 'is-warning'
    : 'is-danger'
    return <div className="BossHealthBar columns has-text-centered">
      {healthBar(hp, initHp, armor)}
      {armor > 0 && armorBar(armor, initArmor)}
      {manaBar(mana, maxMana)}
    </div>
}

export default connect()(BossHealthBar)
