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
      default: return
    }
  }
  render() {
    const {party} = this.props
    return <div className="section PartyFrame">
      <div className="columns is-mobile">
        {party.map((member, i) => this.classSwitch(member, i))}
      </div>
    </div>
  }
}

const mapStateToProps = ({party}) => {
  return {
    party
  }
}

export default connect(mapStateToProps)(PartyFrame)
