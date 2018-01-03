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
    console.log("attack");
    this.props.dispatch({type: 'PHYSICAL_ATTACK_BOSS', power: this.props.member.power})
  }
  heal(power, target) {
    console.log("heal")
    this.props.dispatch({type: 'HEAL_FRIENDLY_TARGET', target, power})
    console.log("healing", target);
    if (this.props.started) this.startHealing()
  }
  startHealing() {
    const {power, speed} = this.props.member
    const {party} = this.props
    let target = party[0]
    party.forEach(member => {
      if (member.initHp - member.hp > target.initHp - target.hp) target = member
    })
    console.log("start healing", target);
    setTimeout(() => this.heal(power, target), 10000 / speed)
  }
  startFighting () {
    const {heroClass, power} = this.props.member
    let attackType
    switch(heroClass) {
      case 'Priest':
        attackType = 'heal';
        break;
      default:
        attackType = 'physical'
    }
    let interval = null
    console.log({heroClass, attackType});
    if (attackType == 'heal') this.startHealing()
    else if (attackType == 'physical') {
      interval = setInterval(() => this.physicalAttack(power), 10000 / this.props.member.speed)
      this.setState({interval})
    }
  }
  componentWillReceiveProps(nextProps) {
    if (!this.props.started && nextProps.started) this.startFighting()
  }
  render() {
    const {member} = this.props
    const {initHp, hp, name} = member
    console.log({member});
    return <div className="box MemberFrame">
      <h1 className="title is-3">{name}</h1>
      <div className="columns">
        {member.heroClass}
      </div>
      <HealthBar maxHP={initHp} hp={hp} />
    </div>
  }
}

const mapStateToProps = ({started, party}) => {
  return {
    started,
    party
  }
}

const mapDispatchToProps = dispatch => {
  return {

  }
}

export default connect(mapStateToProps)(MemberFrame)
