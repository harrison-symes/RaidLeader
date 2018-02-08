import React from 'react'
import {connect} from 'react-redux'
import {HealthIcon, SpeedIcon, PowerIcon} from '../icons/StatIcons'


const RecruitHealthBar = ({recruit}) => {
  let {hp, initHp, power, speed} = recruit
  initHp = Math.round(initHp)
  hp = Math.round(hp)
  const percent = hp/initHp * 100
  const colourClass = percent > 1/3*100
    ? percent > 2/3*100
      ? percent == 100
        ? 'is-primary'
        : 'is-success'
      : 'is-warning'
    : 'is-danger'
  return <div className="RecruitHealthBar has-text-centered">
    <div className="columns">
      <div className="column is-3"><p className="subtitle is-4"><PowerIcon value={power} /></p></div>
      <div className="column is-6"><p className="subtitle is-4"><HealthIcon value={`${hp} / ${initHp}`} /></p></div>
      <div className="column is-3"><p className="subtitle is-4"><SpeedIcon value={speed} /></p></div>
    </div>
    <div className="box">
      <progress className={`ProgressBar progress ${colourClass}`} max="100" value={percent}>{percent}%</progress>
    </div>
  </div>
}

export default connect()(RecruitHealthBar)
