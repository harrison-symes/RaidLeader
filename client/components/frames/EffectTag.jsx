import React, {Component} from 'react'
import {connect} from 'react-redux'

class EffectTag extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentDuration: 0,
      remaining: props.effect.duration,
      ticks: 0,
      interval: null
    }
  }
  tickSecond() {
    const {party, effect, target, started} = this.props
    if (started && target.isAlive) {
      const remaining = this.state.remaining -1
      if (!party.find(p => p.id == target.id).effects.find(eff => eff.name == effect.name)) return
      if (this.state.ticks == effect.tickRate) {
        this.props.dispatch({type: effect.type, target, power: effect.power, percentage: effect.percentage})
        this.setState({ticks: 0})
      }
      if (remaining <= 0) {
        this.props.dispatch({type: 'REMOVE_EFFECT_FROM_TARGET', target, effect})
      } else {
        this.startSecond()
        this.setState({remaining, ticks: this.state.ticks + 1})
      }
    } else this.props.dispatch({type: 'REMOVE_EFFECT_FROM_TARGET', target, effect})

  }
  startSecond() {
    const {party, target, effect} = this.props
    if (party.find(p => p.id == target.id).effects.find(eff => eff.name == effect.name)) setTimeout(() => this.tickSecond(), 1000)
  }
  startEffect() {
    this.startSecond()
    this.setState({currentDuration: 0, remaining: this.props.effect.duration, ticks: 0})
  }
  componentDidMount() {
    this.startEffect()
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.effect != nextProps.effect && nextProps.effect) {
      let {maxDuration, currentDuration, remaining, ticks} = this.state
      remaining+=nextProps.effect.duration
      if (remaining > nextProps.effect.duration * 2) {
        remaining = nextProps.effect.duration * 2
      }
      // if (maxDuration > nextProps.effect.duration * 2) maxDuration = Math.floor(nextProps.effect.duration * 2)
      this.setState({remaining})
    }
  }
  render() {
    const {effect, target} = this.props
    const {name, duration, colour} = effect
    const {currentDuration, maxDuration, remaining} = this.state
    return <div>
      <div style={{backgroundColor: colour, borderColor: 'black'}} className="tag is-medium">{name} ({remaining})</div>
    </div>
  }
}

const mapStateToProps = ({party, started}) => ({party, started})

export default connect(mapStateToProps)(EffectTag)
