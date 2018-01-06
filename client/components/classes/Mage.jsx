import React from 'react'
import PartyMemberFrame from '../frames/PartyMemberFrame'
import {connect} from 'react-redux'

class Mage extends PartyMemberFrame {
  finishCast(power) {
    if (this.props.player.mana / this.props.player.maxMana * 100 < 30) power*2
    this.props.dispatch({type: 'SPECIAL_ATTACK_BOSS', power})
    this.startCast()
  }
  startCast() {
    const {power, speed} = this.props.member
    setTimeout(() => this.finishCast(power), 10000 / speed)
  }
  startFighting () {
    this.props.dispatch({type: 'MAGE_START_BUFF'})
    this.startCast()
  }
}

const mapStateToProps = ({started, party, player, friendlyTarget}) => {
  return {
    started,
    party,
    friendlyTarget,
    player
  }
}

export default connect(mapStateToProps)(Mage)
