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
    if (spell.type == 'heal') {
      switch(spell.name) {
        case 'circle':
          return dispatch({type: 'HEAL_ALL_FRIENDLY', power: this.props.player.power})
        default:
          return dispatch({type: 'HEAL_FRIENDLY_TARGET', target, power: this.props.player.power})
      }
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
    console.log("start casting");
    this.props.dispatch({type: 'START_CASTING', spell: this.props.spell})
    const interval = setInterval(this.tickCast, 100)
    this.setState({castInterval: interval, target: this.props.friendlyTarget})
  }
  clickSpell() {
    console.log("click spell");
    if (((this.props.spell.singleTarget && this.props.friendlyTarget) || !this.props.spell.singleTarget) && !this.state.onCooldown) {
      this.startCasting()
    }
  }
  render() {
    const {spell, selectedSpell, dispatch, idx} = this.props
    const {onCooldown, currentCD, currentCastTime, castInterval} = this.state
    return <div className={`PlayerSpell button ${onCooldown ? 'is-danger' : selectedSpell == spell ? 'is-info' : 'is-success'}`} onClick={() => this.clickSpell()}>
      <table className="table">
        <thead className='thead'>
          <th className="th title is-3">({idx}) {spell.name}</th>
        </thead>
        <tfoot className="tfoot">
          <tr>
            <td>
              {onCooldown && <CoolDownBar spell={spell} currentCD={currentCD} />}
              {castInterval && <CastBar spell={spell} currentCastTime={currentCastTime} />}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  }
}

function CoolDownBar ({spell, currentCD}) {
  const percent = 100 - (currentCD / spell.coolDown * 100)
  return <progress className={`SpellCooldDown progress is-danger`} max="100" value={percent}>{percent}%</progress>
}

function CastBar ({spell, currentCastTime}) {
  const percent = (currentCastTime / spell.cast * 100)
  return <progress className={`SpellCooldDown progress is-primary`} max="100" value={percent}>{percent}%</progress>
}

const mapStateToProps = ({player, selectedSpell, friendlyTarget}) => {
  return {
    player,
    selectedSpell,
    friendlyTarget
  }
}

export default connect(mapStateToProps)(PlayerSpell)
