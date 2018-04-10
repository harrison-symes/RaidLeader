import React, {Component} from 'react'
import {connect} from 'react-redux'

import Paladin from '../classes/Paladin'
import Warrior from '../classes/Warrior'
import Rogue from '../classes/Rogue'
import Mage from '../classes/Mage'
import Warlock from '../classes/Warlock'
import Priest from '../classes/Priest'
import Monk from '../classes/Monk'
import Hunter from '../classes/Hunter'
import Shaman from '../classes/Shaman'
import Bard from '../classes/Bard'
import Necromancer from '../classes/Necromancer'
import BeastMaster from '../classes/BeastMaster'
import Beast from '../classes/Beast'

import KeyHandler, {KEYPRESS} from 'react-key-handler';

class PartyFrame extends Component {
  constructor(props) {
    super(props)
  }
  classSwitch(member, i) {
    switch(member.heroClass) {
      case 'Paladin': return <Paladin member={member} key={`member-${i}`} />
      case 'Warrior': return <Warrior member={member} key={`member-${i}`} />
      case 'Rogue': return <Rogue member={member} key={`member-${i}`} />
      case 'Mage': return <Mage member={member} key={`member-${i}`} />
      case 'Warlock': return <Warlock member={member} key={`member-${i}`} />
      case 'Priest': return <Priest member={member} key={`member-${i}`} />
      case 'Monk': return <Monk member={member} key={`member-${i}`} />
      case 'Hunter': return <Hunter member={member} key={`member-${i}`} />
      case 'Shaman': return <Shaman member={member} key={`member-${i}`} />
      case 'Bard': return <Bard member={member} key={`member-${i}`} />
      case 'Necromancer': return <Necromancer member={member} key={`member-${i}`} />
      case 'Beast Master': return <BeastMaster member={member} key={`member-${i}`} />
      case 'Beast': return <Beast member={member} key={`member-${i}`} />
      default: return
    }
  }
  pressUp(e) {
    console.log("press up");
    const {party, friendlyTarget} = this.props
    if (friendlyTarget && friendlyTarget.id == 0) this.props.dispatch({type: 'SELECT_FRIENDLY_TARGET', target: party.find(recruit => recruit.isAlive)})
  }
  pressDown(e) {
    console.log("press down");
    const {player, friendlyTarget} = this.props
    if (friendlyTarget && friendlyTarget.id != 0) this.props.dispatch({type: 'SELECT_FRIENDLY_TARGET', target: player})
  }
  pressLeft(e) {
    console.log("press left");
    const {party, friendlyTarget} = this.props
    const aliveTargets = party.filter(recruit => recruit.isAlive)
    const currentIdx = friendlyTarget ? aliveTargets.findIndex(recruit => recruit.id == friendlyTarget.id) : -1
    let target = null
    if (currentIdx == -1 && aliveTargets.length > 0) target = aliveTargets[0]
    else if (aliveTargets.length > 0) target = currentIdx == 0 ? aliveTargets[aliveTargets.length - 1] : aliveTargets[currentIdx - 1]
    console.log({target, currentIdx, friendlyTarget});
    if (target) this.props.dispatch({type: 'SELECT_FRIENDLY_TARGET', target})
  }
  pressRight(e) {
    console.log("press right");
    const {party, friendlyTarget} = this.props
    const aliveTargets = party.filter(recruit => recruit.isAlive)
    const currentIdx = friendlyTarget ? aliveTargets.findIndex(recruit => recruit.id == friendlyTarget.id) : -1
    let target = null
    if (currentIdx == -1 && aliveTargets.length > 0) target = aliveTargets[aliveTargets.length - 1]
    else if (aliveTargets.length > 0) target = currentIdx == aliveTargets.length - 1 ? aliveTargets[0] : aliveTargets[currentIdx + 1]
    if (target) this.props.dispatch({type: 'SELECT_FRIENDLY_TARGET', target})

  }
  render() {
    const {party} = this.props
    return <div className="section PartyFrame">
      <div className="columns is-0 buttons is-mobile">
        {party.map((member, i) => this.classSwitch(member, i))}
      </div>
      <KeyHandler keyEventName={'keydown'} keyValue={'ArrowUp'} onKeyHandle={this.pressUp.bind(this)} />
      <KeyHandler keyEventName={'keydown'} keyValue={'ArrowDown'} onKeyHandle={this.pressDown.bind(this)} />
      <KeyHandler keyEventName={'keydown'} keyValue={'ArrowLeft'} onKeyHandle={this.pressLeft.bind(this)} />
      <KeyHandler keyEventName={'keydown'} keyValue={'ArrowRight'} onKeyHandle={this.pressRight.bind(this)} />
    </div>
  }
}

const mapStateToProps = ({party, friendlyTarget, player}) => {
  return {
    party,
    friendlyTarget,
    player
  }
}

export default connect(mapStateToProps)(PartyFrame)
