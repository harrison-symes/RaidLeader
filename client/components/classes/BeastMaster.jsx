import React from 'react'
import PartyMemberFrame from '../frames/PartyMemberFrame'
import {connect} from 'react-redux'

import mapStateToProps from './utils/classStateMap'

export class BeastMaster extends PartyMemberFrame {
  finishCast() {
    const {member, started, player, dispatch, party} = this.props
    let {power, weapon_effect, speed} = member
    power = this.alterPower(power)

    if (started && member.isAlive) {
      let pet = party.find(recruit => recruit.id == member.petId)
      if (pet && !pet.isAlive) power*= 1.2
      dispatch({type: 'PHYSICAL_ATTACK_BOSS', power})
    }
  }
  solvePet() {
    const {member, party} = this.props
    const {hp, initHp, power, speed} = member

    let newId = party.length
    while (party.find(recruit => recruit.id == newId)) newId++

    let beast =  {
      ...this.props.member,
      hp: initHp / 2,
      initHp: initHp / 2,
      power: power / 2,
      heroClass: 'Beast',
      id: newId,
      name: 'Wolf',
      ownerId: member.id
    }

    switch (member.weapon_effect) {
      case 'turtlePet':
        beast = {
          ...beast,
          hp: initHp,
          initHp: initHp,
          speed: speed * 0.3,
          name: 'Turtle'
        }
        return beast
      case 'foxPet':
        beast = {
          ...beast,
          speed: speed * 1.5,
          power: power * 0.3,
          name: 'Fox'
        }
      case 'battleCry':
        beast = {
          ...beast,
          speed,
          power: power * 0.3,
          name: 'Piranha'
        }
      default: return beast
    }
  }
  startFighting () {
    const {member, party} = this.props

    this.props.dispatch({type: 'BEAST_MASTER_START_BUFF', beast: this.solvePet(), master: member})
    if (this.props.member.weapon_effect == 'battleyCry')         this.props.dispatch({type: 'BEAST_MASTER_START_BUFF', beast: this.solvePet(), master: member})


    this.startCast()
  }
}

export default connect(mapStateToProps)(BeastMaster)
