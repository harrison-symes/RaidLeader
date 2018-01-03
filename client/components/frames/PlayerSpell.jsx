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
      this.props.dispatch({type: 'CAST_SPELL', spell: this.props.spell, target})
      if (this.props.spell.type == 'heal') this.props.dispatch({type: 'HEAL_FRIENDLY_TARGET', target, power: this.props.player.power})
      clearInterval(castInterval)
      this.setState({currentCD: 0, currentCastTime: 0, castInterval: null, onCooldown: true, target: null})
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
    if (this.props.friendlyTarget) {
      this.startCasting()
    }
  }
  render() {
    const {spell, selectedSpell, dispatch, idx} = this.props
    const {onCooldown} = this.state
    return <div className={`PlayerSpell button ${onCooldown ? 'is-danger' : selectedSpell == spell ? 'is-info' : 'is-success'}`} onClick={() => this.clickSpell()}>
      <p className="title is-3">({idx}) {spell.name}</p>
    </div>
  }
}

const mapStateToProps = ({player, selectedSpell, friendlyTarget}) => {
  return {
    player,
    selectedSpell,
    friendlyTarget
  }
}

export default connect(mapStateToProps)(PlayerSpell)
