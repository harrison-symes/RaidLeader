import React, {Component} from 'react'
import {connect} from 'react-redux'

class PlayerSpell extends Component {
  constructor(props) {
    super(props)
    this.state = {
      onCooldown: false,
      currentCD: 0,
      cooldownInterval: null,
      castInterval: null,
      currentCastTime: 0,
      target: null
    }
    this.tickCast = this.tickCast.bind(this)
    this.tickCD = this.tickCD.bind(this)
  }
  castSwitch(target) {
    const {spell, dispatch} = this.props
    const power = this.props.player.power * spell.powerRatio
    switch(spell.name) {
      case 'Heal':
        return dispatch({type: 'HEAL_FRIENDLY_TARGET', target, power})
      case 'Healing Ring':
        return dispatch({type: 'HEAL_ALL_FRIENDLY', power})
      case 'Bind':
        dispatch({type: 'HEAL_FRIENDLY_TARGET', target, power})
        return dispatch({type: 'HEAL_PLAYER', power})
      case 'Fireball':
        return dispatch({type: 'SPECIAL_ATTACK_BOSS', power})
      case 'Fireblast':
        return dispatch({type: 'SPECIAL_ATTACK_BOSS', power})
      case 'Flash Fire':
        return dispatch({type: 'SPECIAL_ATTACK_BOSS', power})
      case 'Life Tap':
        dispatch({type: 'PLAYER_GAIN_MANA', power})
        return dispatch({type: 'DAMAGE_PLAYER', power})
      case 'Evocate':
        return dispatch({type: 'PLAYER_GAIN_MANA', power})
      default: return
    }
  }
  tickCD() {
    let {currentCD, cooldownInterval} = this.state
    currentCD+= 0.1
    if (currentCD >= this.props.spell.coolDown) {
      clearInterval(cooldownInterval)
      this.setState({currentCD: 0, currentCastTime: 0, cooldownInterval: null, onCooldown: false})
    } else this.setState({currentCD})
  }
  startCooldown() {
    const interval = setInterval(this.tickCD, 100)
    this.setState({cooldownInterval: interval})
  }
  tickCast() {
    let {currentCastTime, target, castInterval} = this.state
    currentCastTime+= 0.1
    if (currentCastTime >= this.props.spell.cast) {
      this.castSwitch(target)
      this.props.dispatch({type: 'CAST_SPELL', spell: this.props.spell, target})
      clearInterval(castInterval)
      this.setState({currentCD: 0, currentCastTime: 0, castInterval: null, onCooldown: true})
      this.startCooldown()
    } else this.setState({currentCastTime})
  }
  startCasting() {
    this.props.dispatch({type: 'START_CASTING', spell: this.props.spell})
    const interval = setInterval(this.tickCast, 100)
    this.setState({castInterval: interval, target: this.props.friendlyTarget})
  }
  clickSpell() {
    const {spell, player, friendlyTarget, started} = this.props
    if (started && ((spell.singleTarget && friendlyTarget) || !spell.singleTarget) && !this.state.onCooldown && !player.isCasting && spell.cost <= player.mana) {
      this.startCasting()
    }
  }
  render() {
    const {spell, selectedSpell, dispatch, idx, player} = this.props
    const {onCooldown, currentCD, currentCastTime, castInterval} = this.state
    const spellColour = onCooldown || player.mana < spell.cost ? 'is-loading is-danger' : selectedSpell == spell ? 'is-info' : 'is-success'
    return <div
      className={`PlayerSpell button ${spellColour}`}
      onClick={() => this.clickSpell()}>
      <table className="table">
        <thead className='thead has-text-centered'>
          <th className="th subtitle is-5 has-text-centered">({idx}) {spell.name}</th>
        </thead>
        {(onCooldown || castInterval) &&
          <tfoot className="tfoot">
            <tr>
              <td>
                {onCooldown && <CoolDownBar spell={spell} currentCD={currentCD} />}
                {castInterval && <CastBar spell={spell} currentCastTime={currentCastTime} />}
              </td>
            </tr>
          </tfoot>
        }
      </table>
    </div>
  }
}

function CoolDownBar ({spell, currentCD}) {
  const percent = 100 - (currentCD / spell.coolDown * 100)
  return <progress className={`SpellCooldDown is-large progress is-danger`} max="100" value={percent}>{percent}%</progress>
}

function CastBar ({spell, currentCastTime}) {
  const percent = (currentCastTime / spell.cast * 100)
  return <progress className={`SpellCooldDown is-large progress is-primary`} max="100" value={percent}>{percent}%</progress>
}

const mapStateToProps = ({started, player, selectedSpell, friendlyTarget}) => {
  return {
    started,
    player,
    selectedSpell,
    friendlyTarget
  }
}

export default connect(mapStateToProps)(PlayerSpell)
