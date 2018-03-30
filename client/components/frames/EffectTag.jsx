import React, {Component} from 'react'
import {connect} from 'react-redux'

export class EffectTag extends Component {
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
    const {party, effect, target, started, dispatch} = this.props
    if (started && target.isAlive) {
      const remaining = this.state.remaining -1
      if (!party.find(p => p.id == target.id).effects.find(eff => eff.name == effect.name)) return
      let ticks = this.state.ticks
      if (ticks == effect.tickRate) {
        dispatch({type: effect.type, target, power: effect.power, percentage: effect.percentage})
        ticks = 0
      } else {
        ticks++
      }

      if (remaining <= 0) {
        return dispatch({type: 'REMOVE_EFFECT_FROM_TARGET', target, effect})
      }
      this.startSecond()
      this.setState({remaining, ticks: ticks})

    } else dispatch({type: 'REMOVE_EFFECT_FROM_TARGET', target, effect})

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
      let {remaining} = this.state
      remaining+=nextProps.effect.duration
      if (remaining > nextProps.effect.duration * 2) {
        remaining = nextProps.effect.duration * 2
      }
      this.setState({remaining})
    }
  }
  render() {
    const {effect, target} = this.props
    const {name, duration, colour, icon} = effect
    const {remaining} = this.state
    return <div style={{backgroundColor: colour, borderColor: 'black'}} className="tag is-medium"><i className={`ra ${icon} ra-fw`} style={{color: 'black'}} />{remaining}</div>
  }
}

export const mapStateToProps = ({party, started}) => ({party, started})

export default connect(mapStateToProps)(EffectTag)
