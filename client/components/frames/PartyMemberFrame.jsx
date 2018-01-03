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
  startHealing() {
    const {power, speed} = this.props.member
    const {party} = this.props
    let target = party[0]
    party.forEach(member => {
      if (member.initHp - member.hp > target.initHp - target.hp) target = member
    })
    setTimeout(() => this.singleHeal(power, target), 10000 / speed)
  }
  startFighting () {
    const {heroClass, power, speed} = this.props.member
    let attackType
    switch(heroClass) {
      case 'Priest':
        attackType = 'heal';
        break;
      case 'Monk':
        attackType = 'healAll'
        break;
      case 'Mage':
        attackType = 'special'
        break;
      default:
        attackType = 'physical'
    }
    let interval = null
    if (attackType == 'heal') this.startHealing()
    else if (attackType == 'healAll') {
      interval = setInterval(() => this.healAll(power), 10000 / speed)
      this.setState({interval})
    }
    else if (attackType == 'special') {
      interval = setInterval(() => this.specialAttack(power), 10000 / speed)
      this.setState({interval})
    }
    else if (attackType == 'physical') {
      interval = setInterval(() => this.physicalAttack(power), 10000 / speed)
      this.setState({interval})
    }

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

const mapDispatchToProps = dispatch => {
  return {

  }
}

export default connect(mapStateToProps)(MemberFrame)
