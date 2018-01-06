import React from 'react'
import {connect} from 'react-redux'

const HealthBar = ({maxHP, hp}) => {
  const percent = hp/maxHP * 100
  const colourClass = percent > 1/3*100
    ? percent > 2/3*100
      ? percent == 100
        ? 'is-primary'
        : 'is-success'
      : 'is-warning'
    : 'is-danger'
  return <div className="content has-text-centered">
    <p className="subtitle is-4">Health: ({hp} / {maxHP})</p>
    <progress className={`progress ${colourClass}`} max="100" value={percent}>{percent}%</progress>
  </div>
}

export default connect()(HealthBar)
