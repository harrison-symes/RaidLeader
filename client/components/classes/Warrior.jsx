import React from 'react'
import PartyMemberFrame from '../frames/PartyMemberFrame'
import {connect} from 'react-redux'

class Warrior extends PartyMemberFrame {
  finishCast(power) {
    if (this.props.boss.hp / this.props.boss.initHp * 100 < 25) this.props.dispatch({type: 'CRITICAL_ATTACK_BOSS', power})
    else this.props.dispatch({type: 'PHYSICAL_ATTACK_BOSS', power})
    this.startCast()
  }
  startCast() {
    const {power, speed} = this.props.member
    setTimeout(() => this.finishCast(power), 10000 / speed)
  }
  startFighting () {
    this.props.dispatch({type: 'WARRIOR_START_BUFF', target: this.props.member})
    this.startCast()
  }
}

const mapStateToProps = ({started, party, boss, friendlyTarget}) => {
  return {
    started,
    party,
    friendlyTarget,
    boss
  }
}

export default connect(mapStateToProps)(Warrior)
