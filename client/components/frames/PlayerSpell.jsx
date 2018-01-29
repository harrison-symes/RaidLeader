import React, {Component} from 'react'
import {connect} from 'react-redux'

const renewConstructor = (power) => ({
  name: 'Renew',
  duration: 9,
  tickRate: 3,
  power,
  colour: '#8CE88C',
  type: 'HEAL_FRIENDLY_TARGET'
})

const poisonConstructor = (power) => ({
  name: 'Poison',
  duration: 15,
  power,
  colour: '#BA8CE8',
  tickRate: 5,
  type: 'DAMAGE_FRIENDLY_TARGET'
})

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
    const {spell, dispatch, player} = this.props
    const power = this.props.player.power * spell.powerRatio
    if (!this.props.started) return
    if (player.bonusEffect == "curePoison" && spell.singleTarget) dispatch({type: 'REMOVE_EFFECT_FROM_TARGET', target, effect: {name: 'Poison'}})
    if (player.bonusEffect == 'poison' && spell.singleTarget) dispatch({type: 'ADD_EFFECT_TO_TARGET', target, effect: poisonConstructor(player.level * 2)})

    switch(spell.name) {
      case 'Heal':
        return dispatch({type: 'HEAL_FRIENDLY_TARGET', target, power})
      case 'Lesser Heal':
        return dispatch({type: 'HEAL_FRIENDLY_TARGET', target, power})
      case 'Greater Heal':
        return dispatch({type: 'HEAL_FRIENDLY_TARGET', target, power})
      case 'Healing Ring':
        return dispatch({type: 'HEAL_ALL_FRIENDLY', power})
      case 'Bind':
        dispatch({type: 'HEAL_FRIENDLY_TARGET', target, power})
        return dispatch({type: 'HEAL_PLAYER', power})
      case 'Fireball':
        return dispatch({type: 'PLAYER_ATTACK_BOSS', power})
      case 'Fireblast':
        return dispatch({type: 'PLAYER_ATTACK_BOSS', power})
      case 'Flash Fire':
        return dispatch({type: 'PLAYER_ATTACK_BOSS', power})
      case 'Drain Life':
        dispatch({type: 'PLAYER_ATTACK_BOSS', power})
        return dispatch({type: 'HEAL_PLAYER', power: power * 2})
      case 'Harvest Life':
        dispatch({type: 'PLAYER_ATTACK_BOSS', power})
        return dispatch({type: 'HEAL_ALL_FRIENDLY', power})
      case 'Life Tap':
        dispatch({type: 'PLAYER_GAIN_MANA', power: Math.round(player.maxMana * 0.1)})
        return dispatch({type: 'DAMAGE_PLAYER', power: Math.round(player.initHp * 0.05)})
      case 'Evocate':
        return dispatch({type: 'PLAYER_GAIN_MANA', power: Math.round(player.maxMana / 100 * spell.powerRatio)})
      case 'Drain Soul':
        dispatch({type: 'PLAYER_GAIN_MANA', power: Math.round(player.maxMana * 0.03)})
        dispatch({type: 'HEAL_PLAYER', power})
        return dispatch({type: 'PLAYER_ATTACK_BOSS', power})
      case 'Renew':
        return dispatch({type: 'ADD_EFFECT_TO_TARGET', effect: renewConstructor(power), target})
      case 'Greater Renew':
        return dispatch({type: 'ADD_EFFECT_TO_ALL_FRIENDLY', effect: renewConstructor(power)})
      default: return
    }
  }
  tickCD() {
    if (!this.props.started) return
    let {currentCD, cooldownInterval} = this.state
    currentCD+= 0.1
    if (currentCD >= this.props.spell.coolDown) {
      clearInterval(cooldownInterval)
      this.setState({currentCD: 0, currentCastTime: 0, cooldownInterval: null, onCooldown: false})
    } else this.setState({currentCD})
  }
  startCooldown() {
    if (!this.props.started) return
    const interval = setInterval(this.tickCD, 100)
    this.setState({cooldownInterval: interval})
  }
  tickCast() {
    if (!this.props.started) return
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
    if (!this.props.started) return
    this.props.dispatch({type: 'START_CASTING', spell: this.props.spell})
    const interval = setInterval(this.tickCast, 100)
    this.setState({castInterval: interval, target: this.props.friendlyTarget})
  }
  clickSpell() {
    if (!this.props.started) return
    const {spell, player, friendlyTarget, started} = this.props
    if (started && ((spell.singleTarget && friendlyTarget) || !spell.singleTarget) && !this.state.onCooldown && !player.isCasting && spell.cost <= player.mana) {
      this.startCasting()
    }
  }
  render() {
    const {spell, selectedSpell, dispatch, idx, player} = this.props
    const {onCooldown, currentCD, currentCastTime, castInterval} = this.state
    const spellColour = onCooldown || player.mana < spell.cost ? 'is-loading is-danger' : selectedSpell == spell ? 'is-info' : 'is-success'
    let width = 1000 / player.spells.length
    if (width > 200) width = 200
    return <div
      className={`PlayerSpell button ${spellColour}`}
      onClick={() => this.clickSpell()}
      style={{width: `${width}px`}}>
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
