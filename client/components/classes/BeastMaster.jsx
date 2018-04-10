import React from 'react'
import PartyMemberFrame from '../frames/PartyMemberFrame'
import {connect} from 'react-redux'

import mapStateToProps from './utils/classStateMap'

export class BeastMaster extends PartyMemberFrame {
  finishCast() {
    const {member, started, player, dispatch, party} = this.props
    let {power, weapon_effect, speed} = member
    if (started && member.isAlive) {
      let pet = party.find(recruit => recruit.id == member.petId)
      if (pet && !pet.isAlive) power*= 1.2
      dispatch({type: 'PHYSICAL_ATTACK_BOSS', power})
    }
  }
  startFighting () {
    const {member, party} = this.props
    const {hp, initHp, power, speed} = member
    let newId = party.length
    while (party.find(recruit => recruit.id == newId)) {
      newId++
    }
    let beast = {
      ...this.props.member,
      hp: hp / 2,
      initHp: hp / 2,
      power: power / 2,
      heroClass: 'Beast',
      id: newId,
      name: 'Wolf',
      ownerId: member.id
    }
    this.props.dispatch({type: 'BEAST_MASTER_START_BUFF', beast, master: member})
    this.startCast()
  }
}

export default connect(mapStateToProps)(BeastMaster)
