import React, {Component} from 'react'
import {connect} from 'react-redux'

class EffectTag extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentDuration: 0,
      maxDuration: props.effect.duration,
      interval: null
    }
  }
  tickSecond() {
    const {party, effect, target} = this.props
    const currentDuration = this.state.currentDuration + 1
    if (!party.find(p => p.id == target.id).effects.find(eff => eff.name == effect.name)) return
    if (currentDuration % effect.tickRate === 0) {
      this.props.dispatch({type: effect.type, target, power: effect.power})
    }
    if (currentDuration >= this.state.maxDuration) {
      this.props.dispatch({type: 'REMOVE_EFFECT_FROM_TARGET', target, effect})
    } else {
      this.startSecond()
      this.setState({currentDuration})
    }
  }
  startSecond() {
    const {party, target, effect} = this.props
    if (party.find(p => p.id == target.id).effects.find(eff => eff.name == effect.name)) setTimeout(() => this.tickSecond(), 1000)
  }
  startEffect() {
    this.startSecond()
    this.setState({currentDuration: 0, ticks: 0})
  }
  componentDidMount() {
    this.startEffect()
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.effect != nextProps.effect && nextProps.effect) {
      let {maxDuration, currentDuration} = this.state
      maxDuration+=nextProps.effect.duration
      // if (maxDuration > nextProps.effect.duration * 2) maxDuration = Math.floor(nextProps.effect.duration * 2)
      this.setState({maxDuration})
    }
  }
  render() {
    const {effect, target} = this.props
    const {name, duration, colour} = effect
    const {currentDuration, maxDuration} = this.state
    return <div>
      <div style={{backgroundColor: colour, borderColor: 'black'}} className="tag is-medium">{name} ({maxDuration - Math.floor(currentDuration)})</div>
    </div>
  }
}

const mapStateToProps = ({party}) => ({party})

export default connect(mapStateToProps)(EffectTag)
