import React from 'react'
import {connect} from 'react-redux'
import {HealthIcon} from '../icons/StatIcons'

const HealthBar = ({maxHP, hp}) => {
  const percent = hp/maxHP * 100
  const colourClass = percent > 1/3*100
    ? percent > 2/3*100
      ? percent == 100
        ? 'is-primary'
        : 'is-success'
      : 'is-warning'
    : 'is-danger'
  return <div className="HealthBar has-text-centered box">
    <p className="subtitle is-4"><HealthIcon value={`${hp} / ${maxHP}`} /></p>
    <progress className={`ProgressBar progress ${colourClass}`} max="100" value={percent}>{percent}%</progress>
  </div>
}

export default connect()(HealthBar)
