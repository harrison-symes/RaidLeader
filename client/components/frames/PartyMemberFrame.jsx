import React, {Component} from 'react'
import {connect} from 'react-redux'

import HealthBar from './HealthBar'

class MemberFrame extends Component {
  constructor(props) {
    super(props)
    this.state = {
      interval: null
    }
  }
  physicalAttack() {
    this.props.dispatch({type: 'PHYSICAL_ATTACK_BOSS', power: this.props.member.power})
  }
  specialAttack() {
    this.props.dispatch({type: 'SPECIAL_ATTACK_BOSS', power: this.props.member.power})
  }
  singleHeal(power, target) {
    this.props.dispatch({type: 'HEAL_FRIENDLY_TARGET', target, power})
    if (this.props.started) this.startHealing()
  }
  healAll(power) {
    this.props.dispatch({type: 'HEAL_ALL_FRIENDLY', power})
  }
  damageAllFriendly(power) {
    this.props.dispatch({type: 'DAMAGE_ALL_FRIENDLY', power})
  }
  startHealing() {
    const {power, speed} = this.props.member
    const {party} = this.props
    let target = party[0]
    party.forEach(member => {
      if (member.initHp - member.hp > target.initHp - target.hp) target = member
    })
    setTimeout(() => this.singleHeal(power, target), 10000 / speed)
  }
  componentWillReceiveProps(nextProps) {
    if (!this.props.started && nextProps.started) this.startFighting()
  }
  render() {
    const {member, dispatch, friendlyTarget} = this.props
    const {initHp, hp, name} = member
    return <div className={`column button MemberFrame ${friendlyTarget == member ? 'is-success' : 'is-light'}`} onClick={() => dispatch({type: 'SELECT_FRIENDLY_TARGET', target: member})}>
      <h1 className="title is-3">{name}</h1>
      <div className="columns">
        {member.heroClass}
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
