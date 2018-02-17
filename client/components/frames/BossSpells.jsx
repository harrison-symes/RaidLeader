import React, {Component} from 'react'
import {connect} from 'react-redux'

import { Progress } from 'react-sweet-progress';

import {poisonConstructor, renewConstructor} from '../../utils/effectConstructors'

class BossSpell extends Component {
  constructor(props) {
    super(props)
    this.state = {
      onCooldown: false,
      currentCD: 0,
      cooldownInterval: null,
      castInterval: null,
      currentCastTime: 0,
      target: null,
      ticks: 0
    }
    this.tickCast = this.tickCast.bind(this)
    this.tickCD = this.tickCD.bind(this)
  }
  tickSwitch() {
    let {spell, dispatch, party, boss} = this.props
    let power = boss.power * spell.tickPower
    let target = party.find(other => other.id == boss.bossTarget.id)
    let aliveTargets = party.filter(member => member.isAlive)
    // if (aliveTargets.length == 0) power*=2
    switch(spell.name) {
      case 'Boil':
        let randomTarget = aliveTargets[Math.floor(Math.random() * aliveTargets.length)]
        console.log({randomTarget});
        return dispatch({type: 'DAMAGE_FRIENDLY_TARGET', target: randomTarget, power})
      case 'Unleash Flames':
        return dispatch({type: 'DAMAGE_ALL_FRIENDLY', power})
      case 'Exhaust Heat':
        return dispatch({type: 'DAMAGE_ALL_FRIENDLY', power})
      default: return
    }
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
        dispatch({type: 'PERCENT_DAMAGE_BOSS', percentage: 0.05})
        dispatch({type: 'PERCENT_DAMAGE_PLAYER', percentage: 0.05})
        return dispatch({type: 'PERCENT_DAMAGE_DAMAGE_ALL_FRIENDLY', percentage: spell.percentage})
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
          dispatch({type: 'PERCENT_DAMAGE_FRIENDLY_TARGET', target, percentage: spell.percentage})
          return dispatch({type: 'ADD_EFFECT_TO_TARGET', target, effect: poisonConstructor()})
        }
      case 'Ravage':
        dispatch({type: 'PERCENT_DAMAGE_DAMAGE_ALL_FRIENDLY', percentage: spell.percentage})
        dispatch({type: 'PERCENT_DAMAGE_PLAYER', percentage: 0.03})
        return dispatch({type: 'BOSS_GAIN_POWER', amount: spell.power})
      case 'Ingest Plague':
        dispatch({type: 'BOSS_GAIN_ARMOR', amount: spell.armor})
        dispatch({type: 'HEAL_BOSS', power: spell.health})
        return dispatch({type: 'BOSS_GAIN_POWER', amount: spell.power})
      case 'Spread Plague':
        return dispatch({type: 'ADD_EFFECT_TO_ALL_FRIENDLY', effect: poisonConstructor()})
      case 'Heat Up':
        dispatch({type: 'BOSS_GAIN_POWER', amount: spell.power})
        return dispatch({type: 'BOSS_GAIN_MANA', amount: spell.mana})
      case 'Unleash Flames':
        return dispatch({type: 'BOSS_CHANGE_STAGE', stage: boss.stageTwo})
      case 'Flame':
        dispatch({type: 'DAMAGE_FRIENDLY_TARGET', power, target})
        dispatch({type: 'BOSS_GAIN_POWER', amount: spell.power})
        return dispatch({type: 'DAMAGE_PLAYER', power})
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
    let {currentCastTime, target, castInterval, ticks} = this.state
    const {spell} = this.props
    let newCastTime = currentCastTime + 0.1
    if (spell.isChanneled) {
      let tickInterval = spell.cast / spell.ticks
      let newTickTIme = tickInterval * (ticks + 1)
      if (currentCastTime < newTickTIme && newCastTime >= newTickTIme) {
        this.setState({ticks: ticks + 1})
        this.tickSwitch()
        console.log("tick", {tickInterval, newTickTIme, currentCastTime, newCastTime})
      }
    }
    if (newCastTime >= this.props.spell.cast) {
      this.castSwitch(target)
      this.props.dispatch({type: 'BOSS_FINISH_CASTING', spell: this.props.spell, target})
      clearInterval(castInterval)
      this.setState({currentCD: 0, currentCastTime: 0, ticks: 0, castInterval: null, onCooldown: true})
      this.startCooldown()
    } else this.setState({currentCastTime: newCastTime})
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
      <span className="BossTooltip tooltip">
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
            status={onCooldown ?'danger' : 'casting'}
            strokeWidth={10}
            theme={{
              casting: {symbol: null, color: 'yellow'},
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
