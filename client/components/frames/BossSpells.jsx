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
    const {spell, dispatch, boss} = this.props
    const power = this.props.boss.power * spell.powerRatio
    switch(spell.name) {
      case 'Bite':
        return dispatch({type: 'DAMAGE_FRIENDLY_TARGET', target, power})
      case 'Swipe':
        return dispatch({type: 'DAMAGE_ALL_FRIENDLY', power})
      case 'Protect':
        return dispatch({type: 'BOSS_GAIN_ARMOR', power: spell.powerRatio})
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
    console.log("finished casting");
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
  componentWillReceiveProps(nextProps) {
    const {spell, started, boss} = nextProps
    if (started && ((spell.singleTarget && boss.bossTarget) || !spell.singleTarget) && !this.state.onCooldown && !boss.isCasting && spell.cost <= boss.mana && boss.wantsToCast == spell.name) {
      console.log("conditions met, start casting");
      this.startCasting()
    }
  }
  render() {
    const {spell, dispatch, boss} = this.props
    const {onCooldown, currentCD, currentCastTime, castInterval} = this.state
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

export default connect(mapStateToProps)(PlayerSpell)
