import React, {Component} from 'react'
import {connect} from 'react-redux'

import { Progress } from 'react-sweet-progress';

const poisonConstructor = (perc) => ({
  name: 'Poison',
  duration: 15,
  percentage: perc || 0.1,
  colour: '#BA8CE8',
  tickRate: 3,
  type: 'PERCENT_DAMAGE_FRIENDLY_TARGET'
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
    let power = boss.power * spell.powerRatio
    let target = boss.bossTarget
    let aliveTargets = party.filter(member => member.isAlive)
    if (aliveTargets.length == 0) power*=2
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
        return dispatch({type: 'ADD_EFFECT_TO_TARGET', effect: poisonConstructor(), target})
      case 'Decay':
        dispatch({type: 'ADD_EFFECT_TO_ALL_FRIENDLY', effect: poisonConstructor()})
        return dispatch({type: 'PHYSICAL_ATTACK_BOSS', power})
      case 'Sludge Bomb':
        dispatch({type: 'DAMAGE_FRIENDLY_TARGET', power, target})
        return dispatch({type: 'ADD_EFFECT_TO_TARGET', effect: poisonConstructor(), target})
      case 'Overwhelm':
        return dispatch({type: 'DAMAGE_ALL_FRIENDLY', power})
      case 'Lunge':
        aliveTargets = party.filter(member => member.isAlive && !member.effects.find(eff => eff.name == 'Poison'))
        if (aliveTargets.length) {
          target = aliveTargets[Math.floor(Math.random() * aliveTargets.length)]
          dispatch({type: 'DAMAGE_FRIENDLY_TARGET', target, power})
          return dispatch({type: 'ADD_EFFECT_TO_TARGET', target, effect: poisonConstructor()})
        }
      case 'Ravage':
        dispatch({type: 'DAMAGE_ALL_FRIENDLY', power})
        return dispatch({type: 'BOSS_GAIN_POWER', amount: spell.power})
      case 'Ingest Plague':
        return dispatch({type: 'BOSS_GAIN_POWER', amount: spell.power})
      case 'Spread Plague':
        dispatch({type: 'BOSS_GAIN_POWER', amount: spell.power})
        return dispatch({type: 'ADD_EFFECT_TO_ALL_FRIENDLY', effect: poisonConstructor()})
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
    if (nextProps.spell !== this.props.spell) {
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
    } else {
    }
  }
  render() {
    const {spell, dispatch, boss} = this.props
    const {onCooldown, currentCD, currentCastTime, castInterval} = this.state
    const spellColour = onCooldown || boss.mana < spell.cost ? 'is-danger' : castInterval ? 'is-primary' : 'is-success'
    let width = 600 / boss.spells.length
    if (width > 150) width = 150
    let height= width
    var cdPercentage = (spell.coolDown - currentCD) / spell.coolDown * 100
    var castPercentage = currentCastTime / spell.cast * 100
    let perc = onCooldown ? cdPercentage : castPercentage
    return <button
    className={`BossSpell button ${spellColour} has-text-centered`}
    style={{position: 'relative', width, height}}>
      <span className="tooltip">
        <span className="tooltiptext">
          <p>{spell.name}</p>
        </span>
      {(onCooldown || currentCastTime > 0)
        ? <span style={{position: 'relative', width, height}} className="CastProgress has-text-centered">
          <Progress
            type="circle"
            percent={Math.round(perc)}
            width={width * 0.9}
            symbolClassName={`ra ${spell.icon}`}
            status={onCooldown ?'danger' : 'success'}
            strokeWidth={10}
            theme={{
              success: {symbol: null, color: 'yellow'},
              danger: {symbol: null, color: 'red'}
            }}
          />
        </span>
        : <i style={{position: 'relative', color: spell.color || 'green', backgroundColor: spell.background || 'white', width, height: width, margin: 'auto'}} className={`ra ra-5x ${spell.icon} icon icon-large`} />
      }
    </span>
    </button>
  }
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
