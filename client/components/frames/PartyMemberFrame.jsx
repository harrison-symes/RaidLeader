import React, {Component} from 'react'
import {connect} from 'react-redux'

import HealthBar from './HealthBar'

class MemberFrame extends Component {
  constructor(props) {
    super(props)
  }
  startCast() {
    const {power, speed, isAlive} = this.props.member
    const {started} = this.props
    if (isAlive && started) setTimeout(() => {
      if (isAlive && started) this.finishCast(power)
    }, 10000 / speed)
  }
  componentWillReceiveProps(nextProps) {
    if (!this.props.started && nextProps.started) setTimeout(() => this.startFighting(), Math.random() * 1000)
    if (nextProps.member.hp <= 0 && nextProps.member.isAlive) this.props.dispatch({type: 'MEMBER_DIED', target: this.props.member})
  }
  render() {
    const {member, dispatch, friendlyTarget, boss, party} = this.props
    const {initHp, hp, name, isAlive, effects} = member
    return <div className={`column button MemberFrame ${!isAlive ? 'is-dark' : friendlyTarget == member ? 'is-success' : 'is-light'}`} onClick={() => dispatch({type: 'SELECT_FRIENDLY_TARGET', target: member})}>
      <div className="columns has-text-centered">
        <div className="column is-4">
          <h1 className={`subtitle is-${party.length + 1}`} style={{color: boss.bossTarget == member ? 'red' : 'black'}}>{name} the {member.heroClass}</h1>
        </div>
        <div className="column is-4">
          <div className=""><p className={`subtitle is-${party.length + 2} `}>Power: {member.power}</p></div>
          <div className=""><p className={`subtitle is-${party.length + 2}`}>Speed: {member.speed}</p></div>
        </div>
        <div className="column is-4">
          {effects.map(effect => <div className="tag">{effect.name}</div>)}
        </div>
      </div>
      <HealthBar maxHP={initHp} hp={hp} />
    </div>
  }
}

const mapStateToProps = ({started, party, friendlyTarget}) => {
  return {
    started,
    party,
    friendlyTarget
  }
}

export default MemberFrame
