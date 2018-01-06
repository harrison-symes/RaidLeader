import React from 'react'
import PartyMemberFrame from '../frames/PartyMemberFrame'
import {connect} from 'react-redux'

class Priest extends PartyMemberFrame {
  priestCast(power, target) {
    this.props.dispatch({type: 'HEAL_FRIENDLY_TARGET', target, power})
    if (this.props.started) this.priestStart()
  }
  priestAttack(power) {
    console.log("Priest attack");
    this.props.dispatch({type: 'SPECIAL_ATTACK_BOSS', power: power * 2})
    this.priestStart()
  }
  priestStart() {
    const {power, speed} = this.props.member
    const {party} = this.props
    let target = null
    party.forEach(member => {
      if (!target && member.hp < member.initHp) target = member
      else if (target && member.initHp - member.hp > target.initHp - target.hp) target = member
    })
    if (!target) console.log("no target");
    if (!target) setTimeout(() => this.priestAttack(power), 10000 / speed)
    else setTimeout(() => this.priestCast(power, target), 10000 / speed)
  }
  startFighting () {
    const {heroClass, power, speed, initHp} = this.props.member
    this.props.dispatch({type: 'PRIEST_START_BUFF', hp: initHp / 2})
    this.priestStart();
  }
}

const mapStateToProps = ({started, party, friendlyTarget}) => {
  return {
    started,
    party,
    friendlyTarget
  }
}

export default connect(mapStateToProps)(Priest)
