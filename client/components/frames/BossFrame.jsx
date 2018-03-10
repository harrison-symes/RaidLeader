import React, {Component} from 'react'
import {connect} from 'react-redux'

import HealthBar from './HealthBar'
import ManaBar from './ManaBar'

import BossSpellBar from './BossSpellBar'
import BossHealthBar from './BossHealthBar'

import {PowerIcon} from '../icons/StatIcons'
import {MenuBackground} from '../../utils/dungeonInfo'

class BossFrame extends Component {
  constructor(props) {
    super(props)
    this.state = {
      manaInterval: null,
      armorInterval: null
    }
  }
  findTarget({dispatch, party, player}) {
    if (this.props.started) {
      let target = null
      party.forEach(member => {
        if (member.isAlive) {
          if (!target) target = member
          else if (target.hp > member.hp) target = member
        }
      })
      if (!target) target = player
      dispatch({type: 'BOSS_CHANGE_TARGET', target})
    }
  }
  startCast(props) {
    const {spells, speed, mana} = props.boss
    let spellToCast = this.solveSpell(spells, props.boss)
    if (spellToCast && props.started) setTimeout(() => {
       props.dispatch({type: 'BOSS_WANTS_TO_CAST', spell: this.solveSpell(spells, props.boss)})
    }, 10000 / speed)
  }
  gainArmor() {
    if (this.props.started) {
      this.props.dispatch({type: 'BOSS_GAIN_ARMOR', amount: 1})
      this.castArmorGain()
    }
  }
  castArmorGain() {
    if (this.props.boss.armorRegen) setTimeout(() => this.gainArmor(), 1000 * this.props.boss.armorRegen)
  }
  gainMana() {
    if (this.props.started) {
      this.props.dispatch({type: 'BOSS_GAIN_MANA', amount: 1})
      this.castManaGain()
    }
  }
  castManaGain() {
    if (this.props.boss.manaRegen) setTimeout(() => this.gainMana(), 1000 * this.props.boss.manaRegen)
  }
  startTicking(dispatch) {
    this.castManaGain()
    this.castArmorGain()
  }
  componentWillReceiveProps(nextProps) {
    const {started, boss} = nextProps
    console.log({boss});
    if (!this.props.started && nextProps.started) this.startTicking(nextProps.dispatch)
    if (started && (!boss.bossTarget || (boss.bossTarget && !boss.bossTarget.isAlive))) this.findTarget(nextProps)
    if (started && !boss.wantsToCast && !boss.isCasting) this.startCast(nextProps)
  }
  render() {
    const {boss} = this.props
    const background = MenuBackground(this.props.currentLocation.name)
    const {name, hp, initHp, mana, maxMana, armor, initArmor, spells, power} = boss
    return <div className="section BossFrame" style={{backgroundImage: `url(${background.background})`, backgroundColor: background.colour}}>
      <div className="columns">
        <div className="column is-3 has-text-centered box">
          <h1 className="title is-3">{name}</h1>
          <br />
          <div className="level">
            <p className="subtitle is-1"><PowerIcon value={boss.power} /></p>
            <p className="subtitle is-1"><i id="BossIcon" style={{color: 'black'}} className={`icon ra ra-2x ${boss.icon}`}/>&nbsp;&nbsp;&nbsp;</p>
          </div>
        </div>
        <div className="column is-5">
          <BossSpellBar />
        </div>
      </div>
      <BossHealthBar boss={{...boss}} />
    </div>
  }
}

export default (BossFrame)
