import React, {Component} from 'react'
import {connect} from 'react-redux'

import HealthBar from './HealthBar'
import ManaBar from './ManaBar'
import PlayerSpellBar from './PlayerSpellBar'

import {PowerIcon, PlayerIcon} from '../icons/StatIcons'

const startingTraitHandler = (trait, props) => {
  const {dispatch, player} = props
  switch (trait.name) {
    //Life
    case 'Ingrain':
      return dispatch({type: 'PERCENT_INCREASE_POWER', percentage: 0.1})
    case 'Hearty':
      return dispatch({type: 'PERCENT_INCREASE_RECRUIT_HEALTH', percentage: 0.1})

    //Fire
    case 'Quicklight':
      dispatch({type: 'REDUCE_SPELL_COOLDOWN', percentage: 0.1})
      return dispatch({type: 'REDUCE_SPELL_CAST', percentage: 0.1})
    case 'Burning Rush':
      let spells = player.spells.filter(spell => spell.cast <= 2)
      spells.forEach(spell => spell.coolDown = 0)
      return dispatch({type: 'BURNING_RUSH_TRAIT'})

    //Shadow
    case 'Empower':
      dispatch({type: 'PERCENT_INCREASE_RECRUIT_POWER', percentage: 0.1})
      return dispatch({type: 'PERCENT_DAMAGE_PLAYER', percentage: 0.1})
    case 'Unchain':
      return dispatch({type: 'REDUCE_SPELL_COST_BY_ELEMENT', reduction: 500, element: 'Shadow'})

    //Arcane
    case 'Light Feet':
      return dispatch({type: 'REDUCE_SPELL_COST', reduction: 1})
    case 'Mana Pool':
      let mana = 10 * props.spellBook.filter(spell => spell.element == 'Arcane').length
      return dispatch({type: 'INCREASE_PLAYER_MANA', mana})
    case 'Focus':
      return dispatch({type: 'FOCUS_TRAIT'})
    default: return
  }
}

class PlayerFrame extends Component {
  constructor(props) {
    super(props)
    this.targetPlayer = this.targetPlayer.bind(this)
  }
  targetPlayer() {
    this.props.dispatch({type: 'SELECT_FRIENDLY_TARGET', target: this.props.player})
  }
  componentDidMount() {
    const {traits, dispatch} = this.props
    traits.forEach(trait => startingTraitHandler(trait, this.props))
  }
  componentWillReceiveProps(nextProps) {
    if (!this.props.started && nextProps.started) this.props.dispatch({type: 'PERCENT_INCREASE_RECRUIT_SPEED', percentage: 0.1 * nextProps.player.spells.filter(spell => spell.element == 'Arcane').length})
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

const mapStateToProps = ({player, selectedSpell, friendlyTarget, traits, spellBook}) => {
  return {
    player,
    selectedSpell,
    friendlyTarget,
    traits,
    spellBook
  }
}

export default connect(mapStateToProps)(PlayerFrame)
