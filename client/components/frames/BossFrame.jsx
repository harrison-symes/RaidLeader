import React, {Component} from 'react'
import {connect} from 'react-redux'

import HealthBar from './HealthBar'
import ManaBar from './ManaBar'

import BossSpellBar from './BossSpellBar'

class BossFrame extends Component {
  constructor(props) {
    super(props)
    this.state = {
      manaInterval: null,
      armorInterval: null
    }
  }
  findTarget({dispatch, party}) {
    dispatch({type: 'BOSS_CHANGE_TARGET', target: party[0]})
  }
  solveSpell(spells, boss) {
    let castSpell = spells.filter(spell => {
      if (!spell.onCooldown && spell.cost <= boss.mana) {
        switch (spell.name) {
          case 'Protect':
            return (boss.armor < boss.initArmor - 1)
          case 'Swipe':
            return true
          case 'Bite': return true
          default: return false
        }
      } else return false
    })[0]
    console.log({castSpell});
    return castSpell
  }
  startCast(props) {
    const {spells, speed, mana} = props.boss
    setTimeout(() => {
      props.dispatch({type: 'BOSS_WANTS_TO_CAST', spell: this.solveSpell(spells, props.boss)})
    }, 10000 / speed)
  }
  startTicking(dispatch) {
    let manaInterval = setInterval(() => dispatch({type: 'BOSS_GAIN_MANA', amount: 1}), 1000 * this.props.boss.manaRegen)
    let armorInterval = setInterval(() => dispatch({type: 'BOSS_GAIN_ARMOR', amount: 1}), 1000 * this.props.boss.armorRegen)
    this.setState({manaInterval, armorInterval})
  }
  componentWillReceiveProps(nextProps) {
    if (!this.props.started && nextProps.started) this.startTicking(nextProps.dispatch)
    if (nextProps.started && !nextProps.boss.bossTarget) this.findTarget(nextProps)
    if (nextProps.started && !nextProps.boss.wantsToCast && !nextProps.boss.isCasting) this.startCast(nextProps)
  }
  render() {
    const {boss} = this.props
    const {name, hp, initHp, mana, maxMana, armor, initArmor, spells} = boss
    return <div className="section BossFrame">
      <div className="columns">
        <div className="column is-3 has-text-centered">
          <h1 className="title is-2">{name}</h1>

        </div>
        <div className="column is-5">
          <BossSpellBar spells={spells}/>
        </div>
        <div className="column is-4 has-text-centered">
          <ManaBar mana={mana} maxMana={maxMana} />
          <h1 className="title is-3">Armor: {armor}/{initArmor}</h1>
        </div>
      </div>
      <HealthBar hp={hp} maxHP={initHp} />
    </div>
  }
}

const mapStateToProps = ({boss, started, party, player}) => {
  return {
    boss,
    started,
    party,
    player
  }
}

export default connect(mapStateToProps)(BossFrame)
