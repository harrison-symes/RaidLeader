import React, {Component} from 'react'
import {connect} from 'react-redux'

class EffectTag extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentDuration: 0,
      maxDuration: props.effect.duration,
      interval: null,
      ticks: 0
    }
  }
  tickSecond() {
    const {effect, target} = this.props
    const currentDuration = this.state.currentDuration + 1
    if (currentDuration % effect.tickRate === 0) {
      // this.setState({ticks: this.state.ticks+1})
      console.log("TICK EFFECT", effect)
      this.props.dispatch({type: effect.type, target, power: effect.power})
    }
    if (currentDuration >= this.state.maxDuration) {
      clearInterval(this.state.interval)
      this.props.dispatch({type: 'REMOVE_EFFECT_FROM_TARGET', target, effect})
    } else this.setState({currentDuration})
  }
  startEffect() {
    if (this.state.interval) clearInterval(this.state.interval)
    let interval = setInterval(() => this.tickSecond(), 1000)
    this.setState({currentDuration: 0, interval, ticks: 0})
  }
  componentDidMount() {
    this.startEffect()
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.effect != nextProps.effect) {
      let {maxDuration, currentDuration} = this.state
      maxDuration+= nextProps.effect.duration
      if (maxDuration > nextProps.effect.duration * 1.5) maxDuration = Math.floor(nextProps.effect.duration * 1.5)
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

export default connect()(EffectTag)
