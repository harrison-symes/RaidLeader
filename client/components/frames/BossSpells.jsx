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
      currentCastTime: 0,
      target: null,
      ticks: 0
    }
    this.mounted = false
    this.castInterval = false
    this.cooldownInterval = false
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
      //furnace
      case 'Boil':
        let randomTarget = aliveTargets[Math.floor(Math.random() * aliveTargets.length)]
        return dispatch({type: 'DAMAGE_FRIENDLY_TARGET', target: randomTarget, power})
      case 'Unleash Flames':
        return dispatch({type: 'DAMAGE_ALL_FRIENDLY', power})
      case 'Exhaust Heat':
        return dispatch({type: 'DAMAGE_ALL_FRIENDLY', power})

      //conveyer
      case 'Activate':
        return dispatch({type: 'BOSS_GAIN_POWER', amount: 10})
      case 'Discharge':
        return dispatch({type: 'PERCENT_DAMAGE_DAMAGE_ALL_FRIENDLY', percentage: spell.tickPercentage})
      case 'Power Drill':
        return dispatch({type: 'DAMAGE_FRIENDLY_TARGET', target, power})
      case 'Repair':
        dispatch({type: 'BOSS_GAIN_MANA', amount: spell.mana / spell.ticks})
        dispatch({type: 'BOSS_GAIN_POWER', amount: spell.power / spell.ticks})
        return dispatch({type: 'BOSS_GAIN_ARMOR', amount: spell.armor / spell.ticks})
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
      //Dragon
      case 'Roar':
        return dispatch({type: 'BOSS_GAIN_POWER', amount: spell.powerRatio})
      case 'Weakened Bite':
        dispatch({type: 'DAMAGE_FRIENDLY_TARGET', target, power})
        return dispatch({type: 'PHYSICAL_ATTACK_BOSS', power: 100})
      case 'Feeble Fire':
        dispatch({type: 'DAMAGE_ALL_FRIENDLY', power})
        return dispatch({type: 'PHYSICAL_ATTACK_BOSS', power: 200})

      //Wilds
      case 'Bite':
        return dispatch({type: 'DAMAGE_FRIENDLY_TARGET', target, power})
      case 'Swipe':
        return dispatch({type: 'DAMAGE_ALL_FRIENDLY', power})
      case 'Protect':
        return dispatch({type: 'BOSS_GAIN_ARMOR', amount: spell.powerRatio})

      //Turtle
      case 'Trample':
        dispatch({type: 'DAMAGE_FRIENDLY_TARGET', target, power})
        return dispatch({type: 'DAMAGE_PLAYER', power})

      //Spider
      case 'Spit':
        return dispatch({type: 'DAMAGE_PLAYER', power})
      case 'Feed':
        return dispatch({type: 'BOSS_GAIN_POWER', amount: spell.powerRatio})

      //Swamp
      case 'Regenerate':
        dispatch({type: 'BOSS_GAIN_ARMOR', amount: spell.armor})
        return dispatch({type: 'HEAL_BOSS', power: spell.health})

      //Slime
      case 'Sludge Bomb':
      dispatch({type: 'DAMAGE_FRIENDLY_TARGET', power, target})
      return dispatch({type: 'ADD_EFFECT_TO_TARGET', effect: poisonConstructor(), target})
      case 'Seep':
        dispatch({type: 'PERCENT_DAMAGE_BOSS', percentage: 0.05})
        dispatch({type: 'PERCENT_DAMAGE_PLAYER', percentage: 0.05})
        return dispatch({type: 'PERCENT_DAMAGE_DAMAGE_ALL_FRIENDLY', percentage: spell.percentage})

      //Deer
      case 'Plague Bite':
        dispatch({type: "DAMAGE_FRIENDLY_TARGET", target, power})
        return dispatch({type: 'ADD_EFFECT_TO_TARGET', effect: poisonConstructor(), target})
      case 'Decay':
        dispatch({type: 'ADD_EFFECT_TO_ALL_FRIENDLY', effect: poisonConstructor()})
        return dispatch({type: 'PHYSICAL_ATTACK_BOSS', power})

      //Locusts
      case 'Overwhelm':
        return dispatch({type: 'DAMAGE_ALL_FRIENDLY', power})
      case 'Lunge':
        aliveTargets = party.filter(member => member.isAlive && !member.effects.find(eff => eff.name == 'Poison'))
        if (aliveTargets.length) {
          target = aliveTargets[Math.floor(Math.random() * aliveTargets.length)]
          dispatch({type: 'PERCENT_DAMAGE_FRIENDLY_TARGET', target, percentage: spell.percentage})
          return dispatch({type: 'ADD_EFFECT_TO_TARGET', target, effect: poisonConstructor()})
        }

      //Piltherer
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

      //Furnace
      case 'Heat Up':
        dispatch({type: 'BOSS_GAIN_POWER', amount: spell.power})
        return dispatch({type: 'BOSS_GAIN_MANA', amount: spell.mana})
      case 'Unleash Flames':
        return dispatch({type: 'BOSS_CHANGE_STAGE', stage: boss.stageTwo})
      case 'Flame':
        dispatch({type: 'DAMAGE_FRIENDLY_TARGET', power, target})
        dispatch({type: 'BOSS_GAIN_POWER', amount: spell.power})
        return dispatch({type: 'DAMAGE_PLAYER', power})

      //conveyer
        //stage 0
      case 'Activate':
        return dispatch({type: 'BOSS_CHANGE_STAGE', stage: boss[spell.stage]})

        //stage 1
      case 'Recharge':
        return dispatch({type: 'BOSS_GAIN_MANA', amount: spell.mana})
      case 'Short Cicuit':
        return dispatch({type: 'SET_RECRUIT_PERCENTAGE', percentage: spell.percentage})

        //stage 2
      case 'Payload':
        return dispatch({type: 'DAMAGE_FRIENDLY_TARGET', target, power})
      case 'Power Up': return dispatch({type: 'BOSS_GAIN_POWER', amount: spell.power})

        //stage 3
      case 'Repair': return
      case 'Speed Up':
        dispatch({type: 'BOSS_SPELLS_REDUCE_COOLDOWN', percentage: spell.percentage})
        return dispatch({type: 'BOSS_SPELLS_REDUCE_CAST', percentage: spell.percentage})

      case 'Change Gears':
        let stage = boss[spell.stage]
        if (boss.mana == spell.manaRequired) stage = boss['stageThree']
        return dispatch({type: 'BOSS_CHANGE_STAGE', stage})
      default: return
    }
  }
  tickCD() {
    let {currentCD} = this.state
    const {spell, started, boss} = this.props
    if (!this.cooldownInterval || !this.mounted) return clearInterval(this.cooldownInterval)
    currentCD+= 0.1
    if (currentCD >= spell.coolDown && started) {
      clearInterval(this.cooldownInterval)
      this.setState({currentCD: 0, currentCastTime: 0, onCooldown: false})
      this.props.dispatch({type: 'BOSS_SPELL_FINISH_COOLDOWN', spell: this.props.spell})
    } else if (started) this.setState({currentCD})
  }
  startCooldown() {
    this.cooldownInterval = setInterval(this.tickCD, 100)
  }
  tickCast() {
    let {currentCastTime, target, ticks} = this.state
    const {spell} = this.props
    if (!this.castInterval || !this.mounted) return clearInterval(this.castInterval)
    let newCastTime = currentCastTime + 0.1
    if (spell.isChanneled) {
      let tickInterval = spell.cast / spell.ticks
      let newTickTIme = tickInterval * (ticks + 1)
      if (currentCastTime < newTickTIme && newCastTime >= newTickTIme) {
        this.setState({ticks: ticks + 1})
        this.tickSwitch()
      }
    }
    if (newCastTime >= this.props.spell.cast && this.castInterval) {
      console.log({intervalId: this.castInterval});
      clearInterval(this.castInterval)
      if (!this.mounted) return clearInterval(this.cooldownInterval)
      this.castSwitch(target)
      this.props.dispatch({type: 'BOSS_FINISH_CASTING', spell: this.props.spell, target})
      this.setState({currentCD: 0, currentCastTime: 0, ticks: 0, onCooldown: true})
      this.startCooldown()
    } else if (this.castInterval) this.setState({currentCastTime: newCastTime})
  }
  startCasting() {
    this.props.dispatch({type: 'BOSS_START_CASTING', spell: this.props.spell})
    this.castInterval = setInterval(this.tickCast, 100)
    this.setState({target: this.props.boss.bossTarget})
  }
  stopCasting() {
    this.props.dispatch({type: 'BOSS_FINISH_CASTING', spell: this.props.spell, target: null})
    clearInterval(this.castInterval)
    this.setState({currentCd: 0, currentCastTime: 0, onCooldown: false})
  }
  componentDidMount() {
    console.log(this.props.spell.name, 'mounting');
    this.mounted = true
    this.setState({
      onCooldown: false,
      currentCD: 0,
      currentCastTime: 0,
      target: null
    })
    clearInterval(this.castInterval)
    clearInterval(this.cooldownInterval)
  }
  componentWillUnmount() {
    console.log(this.props.spell.name, 'unmounting');
    this.mounted = false
    clearInterval(this.castInterval)
    clearInterval(this.cooldownInterval)
  }
  componentWillReceiveProps(nextProps) {
    const {spell, started, boss} = nextProps
    if (!boss.spells.find(bossSpell => bossSpell.name == this.props.spell.name)) {
      console.log("spell not found");
      clearInterval(this.castInterval)
      return clearInterval(this.cooldownInterval)
    }
    if (nextProps.spell !== this.props.spell) {
      console.log("Spell changed");
      this.setState({
        onCooldown: false,
        currentCD: 0,
        currentCastTime: 0,
        target: null
      })
      clearInterval(this.castInterval)
      return clearInterval(this.cooldownInterval)
    }
    if (!nextProps.started && this.props.started) {
      clearInterval(this.castInterval)
      clearInterval(this.cooldownInterval)
      this.stopCasting()
    }
    if (this.props.boss.bossTarget && this.props.boss.bossTarget.isAlive && !boss.bossTarget.isAlive && this.castInterval) this.stopCasting()
    else if (started && ((spell.singleTarget && boss.bossTarget) || !spell.singleTarget) && !nextProps.spell.onCooldown && !boss.isCasting && spell.cost <= boss.mana && boss.wantsToCast == spell.name) {
      this.startCasting()
    }
  }
  render() {
    const {spell, dispatch, boss} = this.props
    const {onCooldown, currentCD, currentCastTime} = this.state
    const spellColour = onCooldown || boss.mana < spell.cost ? 'is-danger' : this.castInterval ? 'is-primary' : 'is-success'
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


const mapStateToProps = ({started, player, boss, party, friendlyTarget, idx}) => {
  return {
    started,
    player,
    boss,
    party,
    friendlyTarget
  }
}

export default connect(mapStateToProps)(BossSpell)
