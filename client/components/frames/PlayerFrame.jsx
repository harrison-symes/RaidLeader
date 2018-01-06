import React, {Component} from 'react'
import {connect} from 'react-redux'

import HealthBar from './HealthBar'
import ManaBar from './ManaBar'
import PlayerSpellBar from './PlayerSpellBar'

class PlayerFrame extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {player} = this.props
    const {initHp, hp, maxMana, mana, spells} = player
    return <div className="section PlayerFrame">
      <div className="columns">
        <div className="column is-3 box">
          haha
        </div>
        <div className="column is-9">
          <PlayerSpellBar spells={spells}/>
        </div>
      </div>
      <div className="columns">
        <div className="column is-6">
          <HealthBar hp={hp} maxHP={initHp} />
        </div>
        <div className="column is-6">
          <ManaBar mana={mana} maxMana={maxMana} />
        </div>
      </div>
    </div>
  }
}

const mapStateToProps = ({player, selectedSpell}) => {
  return {
    player,
    selectedSpell
  }
}

const mapDispatchToProps = dispatch => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerFrame)
