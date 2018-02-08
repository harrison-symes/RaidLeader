import React, {Component} from 'react'
import {connect} from 'react-redux'

import HealthBar from './HealthBar'
import ManaBar from './ManaBar'
import PlayerSpellBar from './PlayerSpellBar'

class PlayerFrame extends Component {
  constructor(props) {
    super(props)
    this.targetPlayer = this.targetPlayer.bind(this)
  }
  targetPlayer() {
    this.props.dispatch({type: 'SELECT_FRIENDLY_TARGET', target: this.props.player})
  }
  render() {
    const {player, friendlyTarget} = this.props
    const {initHp, hp, maxMana, mana, spells, power, name} = player
    const playerTargeted = friendlyTarget && friendlyTarget.id == player.id
    return <div className="section PlayerFrame">
      <div className="columns">
        <div className="column is-4">
          <div
            style={{cursor: 'pointer', backgroundColor: playerTargeted ? 'lightgreen' : 'white'}}
            className="PlayerBox box"
            onClick={this.targetPlayer}>
            <div className="level">
              <p className="title is-3">{name}</p>
              <p className="title is-4">Power: {power}</p>
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
        </div>
        <div className="column is-8">
            <PlayerSpellBar spells={spells}/>
        </div>
      </div>
    </div>
  }
}

const mapStateToProps = ({player, selectedSpell, friendlyTarget}) => {
  return {
    player,
    selectedSpell,
    friendlyTarget
  }
}

export default connect(mapStateToProps)(PlayerFrame)
