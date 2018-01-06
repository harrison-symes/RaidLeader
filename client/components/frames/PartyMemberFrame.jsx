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
  healAll(power) {
    this.props.dispatch({type: 'HEAL_ALL_FRIENDLY', power})
  }
  damageAllFriendly(power) {
    this.props.dispatch({type: 'DAMAGE_ALL_FRIENDLY', power})
  }
  componentWillReceiveProps(nextProps) {
    if (!this.props.started && nextProps.started) this.startFighting()
  }
  render() {
    const {member, dispatch, friendlyTarget} = this.props
    const {initHp, hp, name} = member
    return <div className={`column button MemberFrame ${friendlyTarget == member ? 'is-success' : 'is-light'}`} onClick={() => dispatch({type: 'SELECT_FRIENDLY_TARGET', target: member})}>
      <h1 className="title is-3">{name}</h1>
      <div className="columns has-text-centered">
        <p>{member.heroClass}</p>
        <p>{member.power}</p>
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
