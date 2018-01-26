import React, {Component} from 'react'
import {connect} from 'react-redux'

const poisonConstructor = (power) => ({
  name: 'Poison',
  duration: 15,
  power,
  colour: '#BA8CE8',
  tickRate: 5,
  type: 'DAMAGE_FRIENDLY_TARGET'
})

class BossSpell extends Component {
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
  castSwitch() {
    const {spell, dispatch, boss, party} = this.props
    const power = boss.power * spell.powerRatio
    let target = boss.bossTarget
    switch(spell.name) {
      case 'Roar':
        return dispatch({type: 'BOSS_GAIN_POWER', amount: spell.powerRatio})
      case 'Weakened Bite':
        dispatch({type: 'DAMAGE_FRIENDLY_TARGET', target, power})
        return dispatch({type: 'PHYSICAL_ATTACK_BOSS', power: 100})
      case 'Feeble Fire':
        dispatch({type: 'DAMAGE_ALL_FRIENDLY', power})
        return dispatch({type: 'PHYSICAL_ATTACK_BOSS', power: 200})
      case 'Bite':
        return dispatch({type: 'DAMAGE_FRIENDLY_TARGET', target, power})
      case 'Swipe':
        return dispatch({type: 'DAMAGE_ALL_FRIENDLY', power})
      case 'Protect':
        return dispatch({type: 'BOSS_GAIN_ARMOR', amount: spell.powerRatio})
      case 'Trample':
        dispatch({type: 'DAMAGE_FRIENDLY_TARGET', target, power})
        return dispatch({type: 'DAMAGE_PLAYER', power})
      case 'Spit':
        return dispatch({type: 'DAMAGE_PLAYER', power})
      case 'Feed':
        return dispatch({type: 'BOSS_GAIN_POWER', amount: spell.powerRatio})
      case 'Regenerate':
        dispatch({type: 'BOSS_GAIN_ARMOR', amount: spell.armor})
        return dispatch({type: 'HEAL_BOSS', power: spell.health})
      case 'Seep':
        dispatch({type: 'PHYSICAL_ATTACK_BOSS', power})
        return dispatch({type: 'DAMAGE_ALL_FRIENDLY', power})
      case 'Plague Bite':
        dispatch({type: "DAMAGE_FRIENDLY_TARGET", target, power})
        return dispatch({type: 'ADD_EFFECT_TO_TARGET', effect: poisonConstructor(power), target})
      case 'Poison':
        return dispatch({type: 'ADD_EFFECT_TO_TARGET', effect: poisonConstructor(power), target})
      case 'Overwhelm':
        return dispatch({type: 'DAMAGE_ALL_FRIENDLY', power})
      case 'Lunge':
        let aliveTargets = party.filter(member => member.isAlive && !member.effects.find(eff => eff.name == 'Poison'))
        if (aliveTargets.length) {
          target = aliveTargets[Math.floor(Math.random() * aliveTargets.length)]
          dispatch({type: 'DAMAGE_FRIENDLY_TARGET', target, power})
          return dispatch({type: 'ADD_EFFECT_TO_TARGET', target, effect: poisonConstructor(power)})
        }
      case 'Ravage':
        dispatch({type: 'DAMAGE_ALL_FRIENDLY', power})
        return dispatch({type: 'BOSS_GAIN_POWER', amount: spell.power})
      case 'Ingest Plague':
        return dispatch({type: 'BOSS_GAIN_POWER', amount: spell.power})
      case 'Spread Plague':
        dispatch({type: 'BOSS_GAIN_POWER', amount: spell.power})
        return dispatch({type: 'ADD_EFFECT_TO_ALL_FRIENDLY', effect: poisonConstructor(power)})
      default: return
    }
  }
  tickCD() {
    let {currentCD, cooldownInterval} = this.state
    const {spell, started} = this.props
    currentCD+= 0.1
    if (currentCD >= spell.coolDown && started) {
      clearInterval(cooldownInterval)
      this.setState({currentCD: 0, currentCastTime: 0, cooldownInterval: null, onCooldown: false})
      this.props.dispatch({type: 'BOSS_SPELL_FINISH_COOLDOWN', spell: this.props.spell})
    } else if (started) this.setState({currentCD})
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
      this.props.dispatch({type: 'BOSS_FINISH_CASTING', spell: this.props.spell, target})
      clearInterval(castInterval)
      this.setState({currentCD: 0, currentCastTime: 0, castInterval: null, onCooldown: true})
      this.startCooldown()
    } else this.setState({currentCastTime})
  }
  startCasting() {
    this.props.dispatch({type: 'BOSS_START_CASTING', spell: this.props.spell})
    const interval = setInterval(this.tickCast, 100)
    this.setState({castInterval: interval, target: this.props.boss.bossTarget})
  }
  stopCasting() {
    this.props.dispatch({type: 'BOSS_FINISH_CASTING', spell: this.props.spell, target: null})
    clearInterval(this.props.castInterval)
    this.setState({currentCd: 0, currentCastTime: 0, castInterval: null, onCooldown: false})
  }
  componentDidMount() {
    this.setState({
      onCooldown: false,
      currentCD: 0,
      cooldownInterval: null,
      castInterval: null,
      currentCastTime: 0,
      target: null
    })
  }
  componentWillReceiveProps(nextProps) {
    const {spell, started, boss} = nextProps
    if (nextProps.spell != this.props.spell) {
      this.setState({
        onCooldown: false,
        currentCD: 0,
        cooldownInterval: null,
        castInterval: null,
        currentCastTime: 0,
        target: null
      })
    }
    if (!nextProps.started && this.props.started) {
      clearInterval(this.state.castInterval)
      clearInterval(this.state.cooldownInterval)
      this.stopCasting()
    }
    if (this.props.boss.bossTarget && this.props.boss.bossTarget.isAlive && !boss.bossTarget.isAlive && this.state.castInterval) this.stopCasting()
    else if (started && ((spell.singleTarget && boss.bossTarget) || !spell.singleTarget) && !nextProps.spell.onCooldown && !boss.isCasting && spell.cost <= boss.mana && boss.wantsToCast == spell.name) {
      this.startCasting()
    }
  }
  render() {
    const {spell, dispatch, boss} = this.props
    const {onCooldown, currentCD, currentCastTime, castInterval} = this.state
    console.log({spell}, this.state);
    const spellColour = onCooldown || boss.mana < spell.cost ? 'is-loading is-danger' : castInterval ? 'is-info' : 'is-success'
    return <div
      className={`PlayerSpell button ${spellColour}`}>
      <table className="table">
        <thead className='thead has-text-centered'>
          <th className="th subtitle is-5 has-text-centered">({spell.name} ({spell.cost})</th>
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

const mapStateToProps = ({started, player, boss, party, friendlyTarget}) => {
  return {
    started,
    player,
    boss,
    party,
    friendlyTarget
  }
}

export default connect(mapStateToProps)(BossSpell)
