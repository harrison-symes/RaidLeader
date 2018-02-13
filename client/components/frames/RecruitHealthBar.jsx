import React from 'react'
import {connect} from 'react-redux'
import {HealthIcon, SpeedIcon, PowerIcon} from '../icons/StatIcons'
import EffectTag from './EffectTag'

const RecruitHealthBar = ({recruit}) => {
  let {hp, initHp, power, speed, effects} = recruit
    const percent = hp/initHp * 100
  const colourClass = percent > 1/3*100
    ? percent > 2/3*100
      ? percent == 100
        ? 'is-primary'
        : 'is-success'
      : 'is-warning'
    : 'is-danger'
  return <div className="RecruitHealthBar has-text-centered">
    <div className="level">
      <div className=""><p className="subtitle is-4"><PowerIcon value={Math.round(power * 10) / 10} /></p></div>
      <div className=""><p className="subtitle is-4"><SpeedIcon value={Math.round(speed * 10) /10} /></p></div>
      <div className="tags">
        {effects.map(effect => <EffectTag key={`effect-${effect.name}-${recruit.name}`} effect={effect} target={recruit} />)}
      </div>
    </div>
    <div className="box">
      <div className="level">
        <progress className={`ProgressBar progress ${colourClass}`} max="100" value={percent}>{percent}%</progress>
        <div className="is-pulled-right"><p className="subtitle is-3"><HealthIcon value={`${Math.round(hp * 10) /10} / ${Math.round(initHp * 10) /10}`} /></p></div>
      </div>
    </div>
  </div>
}

export default connect()(RecruitHealthBar)
