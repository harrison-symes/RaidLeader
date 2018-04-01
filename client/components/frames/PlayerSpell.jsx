import React, {Component} from 'react'
import {connect} from 'react-redux'

import {poisonConstructor, renewConstructor} from '../../utils/effectConstructors'

import CircularProgressbar from 'react-circular-progressbar'
import { Progress } from 'react-sweet-progress';
import KeyHandler, {KEYPRESS} from 'react-key-handler';


class PlayerSpell extends Component {
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
  componentWillReceiveProps(nextProps) {
    const {target, spell} = this.props
    if (target && target.isAlive && !nextProps.friendlyTarget && spell.name == "Guardian Angel" && this.state.currentCastTime !== 0) {
      this.setState({currentCastTime:spell.cast})
      this.props.dispatch({type: 'RESURRECT_TARGET', target, health: power})
    }
  }
  tickSwitch() {
    let {spell, dispatch, player, party} = this.props
    let power = this.props.player.power * spell.tickPower
    let target = this.state.target
    if (target) target = party.find(other => other.id == target.id)
    if (player.bonusEffect == 'firePower' && spell.element == 'Fire') power*=2
    switch(spell.name) {
      case 'Drain Life':
        dispatch({type: 'PLAYER_ATTACK_BOSS', power})
        return dispatch({type: 'HEAL_PLAYER', power: power * 2})
      case 'Siphon Life':
        return dispatch({type: 'DAMAGE_ALL_FRIENDLY', power})
      case 'Tranquility':
        return dispatch({type: 'HEAL_ALL_FRIENDLY', power})
      case 'Ring of Fire':
        dispatch({type: 'DAMAGE_PLAYER', power})
        return dispatch({type: 'DAMAGE_ALL_FRIENDLY', power})
      case 'Restore':
        return dispatch({type: 'HEAL_FRIENDLY_TARGET', power, target})
      case 'Guardian Angel':
        if (!target.isAlive) {
          this.setState({currentCastTime:spell.cast})
          dispatch({type: 'RESURRECT_TARGET', target, health: power})
        }
        return
      case 'Cauterize':
        return dispatch({type: 'PERCENT_DAMAGE_FRIENDLY_TARGET', target, percentage: spell.tickPercentage})
      case 'Mass Cauterize':
        return dispatch({type: 'PERCENT_DAMAGE_DAMAGE_ALL_FRIENDLY'   , percentage: spell.tickPercentage})
      case 'Life Funnel':
        let health = player.initHp * spell.tickPercentage
        dispatch({type: 'DAMAGE_PLAYER', power: health})
        return dispatch({type: 'HEAL_FRIENDLY_TARGET', power: health, target})
      case 'Arcane Torrent':
        let damagedRecruits = party.filter(recruit => recruit.hp < recruit.initHp)
        if (!player.spells.find(spell => spell.element == 'Life')) power*=2
        if (damagedRecruits.length == 0) return dispatch({
          type: 'PHYSICAL_ATTACK_BOSS',
          power
        })
        return dispatch({
          type: 'HEAL_FRIENDLY_TARGET',
          power,
          target: damagedRecruits[Math.floor(Math.random() * damagedRecruits.length)]
        })
      default: return
    }
  }
  castSwitch(target) {
    const {spell, dispatch, player, party, boss} = this.props
    let power = this.props.player.power * spell.powerRatio
    console.log({target, party});
    // if (target) target = party.find(other => other.id == target.id)
    if (!this.props.started) return
    if (player.bonusEffect == "curePoison" && spell.singleTarget) dispatch({type: 'REMOVE_EFFECT_FROM_TARGET', target, effect: {name: 'Poison'}})
    else if (player.bonusEffect == 'Poison' && spell.singleTarget) dispatch({type: 'ADD_EFFECT_TO_TARGET', target, effect: poisonConstructor()})
    else if (player.bonusEffect == 'shadowPower' && spell.element == 'Shadow') dispatch({type: 'PERCENT_INCREASE_RECRUIT_POWER', percentage: 0.01})
    else if (player.bonusEffect == 'lifePower' && spell.element == 'Life') dispatch({type: 'PERCENT_HEAL_ALL_FRIENDLY', percentage: 0.05})
    else if (player.bonusEffect == 'firePower' ** spell.element == 'Fire') power*=2

    switch(spell.name) {
      case 'Heal':
        return dispatch({type: 'HEAL_FRIENDLY_TARGET', target, power})
      case 'Lesser Heal':
        return dispatch({type: 'HEAL_FRIENDLY_TARGET', target, power})
      case 'Greater Heal':
        return dispatch({type: 'HEAL_FRIENDLY_TARGET', target, power})
      case 'Healing Ring':
        return dispatch({type: 'HEAL_ALL_FRIENDLY', power})
      case 'Blossom':
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
        return
      case 'Harvest Life':
        dispatch({type: 'PLAYER_ATTACK_BOSS', power})
        return dispatch({type: 'HEAL_ALL_FRIENDLY', power})
      case 'Life Tap':
        dispatch({type: 'PLAYER_GAIN_MANA', power: spell.mana})
        return dispatch({type: 'DAMAGE_PLAYER', power: Math.round(player.initHp * 0.05)})
      case 'Evocate':
        return dispatch({type: 'PLAYER_GAIN_MANA', power: Math.round(player.maxMana / 100 * spell.powerRatio)})
      case 'Drain Soul':
        dispatch({type: 'PLAYER_GAIN_MANA', power: spell.mana})
        dispatch({type: 'HEAL_PLAYER', power})
        return dispatch({type: 'PLAYER_ATTACK_BOSS', power})
      case 'Renew':
        return dispatch({type: 'ADD_EFFECT_TO_TARGET', effect: renewConstructor(), target})
      case 'Greater Renew':
        return dispatch({type: 'ADD_EFFECT_TO_ALL_FRIENDLY', effect: renewConstructor()})
      case 'Siphon Life':
        return dispatch({type: 'HEAL_ALL_FRIENDLY', power})
      case 'Tranquility':
        dispatch({type: 'REMOVE_EFFECTS_FROM_ALL'})
        return dispatch({type: 'HEAL_ALL_FRIENDLY', power})
      case 'Ring of Fire':
        return dispatch({type: 'PLAYER_ATTACK_BOSS', power})
      case 'Purge':
        let healAmount = target.effects.length * (player.spells.find(spell => spell.element == 'Life') ? 0.1 : 0.2)
        dispatch({type: 'PERCENT_HEAL_FRIENDLY_TARGET', target, percentage: healAmount})
        return dispatch({type: 'REMOVE_EFFECTS_FROM_TARGET', target})
      case 'Restore':
        return dispatch({type: 'ADD_EFFECT_TO_TARGET', target, effect: renewConstructor()})
      case 'Guardian Angel':
        if (target.isALive) dispatch({type: 'HEAL_FRIENDLY_TARGET', power})
        return
      case 'Calibrate':
        let percentage = party.reduce((perc, member) => {
          if (member.isAlive) perc += ((member.hp / member.initHp) * 100)
          return perc
        }, 0)
        percentage = percentage / party.filter(member => member.isAlive).length
        return dispatch({type: 'SET_RECRUIT_PERCENTAGE', percentage})
      case 'Drain Mana':
        let bossMana = boss.mana
        if (bossMana < 0) bossMana = 0
        else if (bossMana > spell.max) bossMana = 5
        console.log({bossMana});
        if (!player.spells.find(spell => spell.element == 'Life')) dispatch({type: 'PERCENT_HEAL_ALL_FRIENDLY', percentage: spell.percentage})
        dispatch({type: 'BOSS_GAIN_MANA', amount: bossMana * -1})
        return dispatch({type: 'PLAYER_GAIN_MANA', power: bossMana})
      case 'Cauterize':
        percentage = spell.percentage
        if (!player.spells.find(spell => spell.element == 'Life')) percentage = spell.greaterPercentage
        return dispatch({type: 'PERCENT_HEAL_FRIENDLY_TARGET', target, percentage})
      case 'Alignment':
        return dispatch({type: 'SET_RECRUIT_PERCENTAGE', percentage: player.spells.find(spell => spell.element == 'Life') ? spell.percentage : spell.greaterPercentage})
      case 'Mass Cauterize':
        percentage = spell.percentage
        if (!player.spells.find(spell => spell.element == 'Life')) percentage = spell.greaterPercentage
        return dispatch({type: 'PERCENT_HEAL_ALL_FRIENDLY', percentage: percentage})
      case 'Life Soul':
        return dispatch({
          type: 'PERCENT_INCREASE_POWER',
          percentage: player.spells.find(spell => spell.element != 'Life')
            ? spell.percentage
            : spell.greaterPercentage
        })
      case 'Arcane Soul':
        if (!player.spells.find(spell => spell.element != 'Arcane')) {
          dispatch({type: 'REDUCE_SPELL_COOLDOWN', percentage: 0.1})
          dispatch({type: 'REDUCE_SPELL_CAST', percentage: 0.1})
        }
        return dispatch({type: 'REDUCE_SPELL_COST', reduction: 1})
      case 'Fire Soul':
        if (!player.spells.find(spell => spell.element != 'Fire')) {
          dispatch({type: 'PERCENT_INCREASE_POWER', percentage: 0.1})
        }
        dispatch({type: 'REDUCE_SPELL_COOLDOWN', percentage: 0.1})
        return dispatch({type: 'REDUCE_SPELL_CAST', percentage: 0.1})
      case 'Shadow Soul':
        if (!player.spells.find(spell => spell.element != 'Shadow')) dispatch({type: 'HEAL_PLAYER', power: player.initHp * 0.1})
        else dispatch({type: 'DAMAGE_PLAYER', power: player.initHp * 0.1})
        return dispatch({type: 'PERCENT_INCREASE_RECRUIT_POWER', percentage: 0.1})
      case 'Chosen Champion':
        if (!player.spells.find(spell => !spell.singleTarget)) {
          dispatch({type: 'HEAL_FRIENDLY_TARGET', target, power})
          dispatch({type: 'HEAL_ALL_FRIENDLY', power: this.props.player.power * spell.altPowerRatio})
        }
        dispatch({type: 'HEAL_FRIENDLY_TARGET', target, power})
        return dispatch({type: 'HEAL_ALL_FRIENDLY', power: this.props.player.power * spell.altPowerRatio})
      case 'Imbue':
        if (!player.spells.find(spell => !spell.singleTarget)) dispatch({type: 'PERCENT_HEAL_FRIENDLY_TARGET', target, percentage: spell.greaterPercentage})
        dispatch({type: 'PERCENT_INCREASE_TARGET_RECRUIT_SPEED', target, percentage: spell.percentage})
        return dispatch({type: 'PERCENT_INCREASE_TARGET_RECRUIT_POWER', target, percentage: spell.percentage})
      case 'Containment':
        if (!player.spells.find(playerSpell => playerSpell.singleTarget || playerSpell.name == spell.name)) {
          let aliveTargets = party.filter(recruit => recruit.isAlive)
          if (aliveTargets.length > 0) dispatch({type: 'DAMAGE_FRIENDLY_TARGET', target: aliveTargets[Math.floor(Math.random() * aliveTargets.length)], power: 10000000})
        }
        dispatch({type: 'PERCENT_INCREASE_RECRUIT_SPEED', percentage: spell.percentage})
        dispatch({type: 'PERCENT_INCREASE_RECRUIT_HEALTH', percentage: spell.percentage})
        return dispatch({type: 'PERCENT_INCREASE_RECRUIT_POWER', percentage: spell.greaterPercentage})
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
    let {currentCastTime, target, castInterval, ticks} = this.state
    const {spell, dispatch} = this.props
    let newCastTime = currentCastTime + 0.1
    if (spell.isChanneled) {
      let tickInterval = spell.cast / spell.ticks
      let newTickTIme = tickInterval * (ticks + 1)
      if (currentCastTime < newTickTIme && newCastTime >= newTickTIme) {
        this.setState({ticks: ticks + 1})
        this.tickSwitch()
      }
    }
    if (newCastTime >= spell.cast) {
      this.castSwitch(target)
      dispatch({type: 'CAST_SPELL', spell: spell, target})
      clearInterval(castInterval)
      this.setState({currentCD: 0, ticks: 0, currentCastTime: 0, castInterval: null, onCooldown: true})
      this.startCooldown()
    } else this.setState({currentCastTime: newCastTime})
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
    if (started && ((spell.singleTarget && friendlyTarget && (!spell.recruitOnly || spell.recruitOnly && friendlyTarget && friendlyTarget.id != 0)) || !spell.singleTarget) && !this.state.onCooldown && !player.isCasting && spell.cost <= player.mana) {
      this.startCasting()
    }
  }
  render() {
    const {spell, selectedSpell, dispatch, idx, player} = this.props
    const {onCooldown, currentCD, currentCastTime, castInterval} = this.state
    const spellColour = onCooldown || player.mana < spell.cost ? 'is-danger' : selectedSpell == spell ? 'is-info' : 'is-success'
    var cdPercentage = (spell.coolDown - currentCD) / spell.coolDown * 100
    var castPercentage = currentCastTime / spell.cast * 100
    let perc = onCooldown ? cdPercentage : castPercentage
    var text = Math.round(perc * (onCooldown ? spell.coolDown: spell.cast) / 100)
    let width = 800 / player.spells.length
    if (width > 200) width = 200
    return <button
    className={`PlayerSpell ${spellColour}`}
    style={{position: 'relative', width, height: width}}
    >
      {(onCooldown || currentCastTime > 0)
      ? <span style={{position: 'relative', width, height: width}} className="CastProgress">
        <Progress
          type="circle"
          percent={Math.round(perc)}
          width={width * 0.9}
          symbolClassName={`ra ${spell.icon}`}
          status={onCooldown ? 'danger' : 'casting'}
          strokeWidth={10}
          theme={{
            casting: {symbol: null, color: 'blue'},
            danger: {symbol: null, color: 'red'}
          }}
        />
      </span>
      : <i onClick={() => this.clickSpell()} style={{position: 'relative', color: spell.color || 'green', backgroundColor: spell.background || 'white', width: '90%', height: '90%', margin: 'auto'}} className={`ra ra-5x ${spell.icon} icon icon-large`}
      />}
      <KeyHandler keyEventName={'keydown'} keyValue={this.props.idx.toString()} onKeyHandle={this.clickSpell.bind(this)} />
    </button>
  }
}

const mapStateToProps = ({started, player, party, selectedSpell, friendlyTarget, boss}) => {
  return {
    started,
    player,
    selectedSpell,
    friendlyTarget,
    party,
    boss
  }
}

export default connect(mapStateToProps)(PlayerSpell)
