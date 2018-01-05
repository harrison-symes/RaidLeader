import React from 'react'
import PartyMemberFrame from '../frames/PartyMemberFrame'
import {connect} from 'react-redux'

class Priest extends PartyMemberFrame {
  startFighting () {
    const {heroClass, power, speed} = this.props.member
    this.startHealing();
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
