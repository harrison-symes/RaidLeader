import React, {Component} from 'react'
import {connect} from 'react-redux'

import RecruitHealthBar from './RecruitHealthBar'
import EffectTag from './EffectTag'
import {ClassIcon, SpeedIcon, PowerIcon} from '../icons/StatIcons'

const poisonConstructor = (perc) => ({
  name: 'Poison',
  duration: 15,
  percentage: perc || 0.1,
  colour: '#BA8CE8',
  tickRate: 3,
  type: 'PERCENT_DAMAGE_FRIENDLY_TARGET'
})

class MemberFrame extends Component {
  constructor(props) {
    super(props)
  }
  startCast() {
    const {power, speed, isAlive} = this.props.member
    const {started, member, dispatch} = this.props
    if (isAlive && started) setTimeout(() => {
      if (isAlive && started) {
        if (member.weapon_effect == 'selfPoison' && Math.random() < (1 / member.speed)) dispatch({type: 'ADD_EFFECT_TO_TARGET', target: member, effect: poisonConstructor()})
        this.finishCast(power)
      }
    }, 10000 / speed)
  }
  componentWillReceiveProps(nextProps) {
    if (!this.props.started && nextProps.started) setTimeout(() => this.startFighting(), Math.random() * 1000)
    if (nextProps.member.hp <= 0 && nextProps.member.isAlive) this.props.dispatch({type: 'MEMBER_DIED', target: this.props.member})
  }
  render() {
    const {member, dispatch, friendlyTarget, boss, party} = this.props
    const {initHp, hp, name, isAlive, effects} = member
    let width = 90 / party.length
    if (width > 20) width = 20
    return <div className={`column button MemberFrame ${!isAlive ? 'is-dark' : friendlyTarget == member ? 'is-success' : ''}`} style={{width: `${width}vw`, border: `5px ${friendlyTarget == member ? 'lightgreen' : 'black'}`}} onClick={() => dispatch({type: 'SELECT_FRIENDLY_TARGET', target: member})}>
      <div className="columns has-text-centered">
        <div className="column">
          <h1 className={`subtitle is-3`} style={{color: boss.bossTarget == member ? 'red' : 'black'}}>{name} <ClassIcon heroClass={member.heroClass} /></h1>
        </div>
      </div>
      <RecruitHealthBar recruit={{...member}}  />
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
