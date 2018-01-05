import React, {Component} from 'react'
import {connect} from 'react-redux'

import Paladin from '../classes/Paladin'
import Warrior from '../classes/Warrior'
import Rogue from '../classes/Rogue'
import Mage from '../classes/Mage'
import Warlock from '../classes/Warlock'
import Priest from '../classes/Priest'
import Monk from '../classes/Monk'

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
      default: return
    }
  }
  render() {
    const {party} = this.props
    return <div className="section PartyFrame">
      <div className="columns">
        {party.map(this.classSwitch)}
      </div>
    </div>
  }
}

const mapStateToProps = ({party}) => {
  return {
    party
  }
}

const mapDispatchToProps = dispatch => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PartyFrame)
