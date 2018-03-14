import React, {Component} from 'react'
import {connect} from 'react-redux'

import HealthBar from './HealthBar'
import ManaBar from './ManaBar'
import PlayerSpellBar from './PlayerSpellBar'

import {PowerIcon, PlayerIcon} from '../icons/StatIcons'

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
      <div className="columns is-mobile">
        <div className="column is-4">
          <div
            style={{cursor: 'pointer', backgroundColor: playerTargeted ? 'lightgreen' : 'white'}}
            className="PlayerBox box"
            onClick={this.targetPlayer}>
            <div className="level">
              <p className="subtitle is-1"><PowerIcon value={Math.floor(power * 10) / 10} /></p>
              <p className="subtitle is-1"><PlayerIcon player={player} />&nbsp;&nbsp;&nbsp;</p>
            </div>
            <div className="columns is-mobile">
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
