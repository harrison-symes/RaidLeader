import React, {Component} from 'react'
import {connect} from 'react-redux'

class EffectTag extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentDuration: 0,
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
    if (currentDuration >= effect.duration) {
      clearInterval(this.state.interval)
      this.props.dispatch({type: 'REMOVE_EFFECT_FROM_TARGET', target, effect})
    } else this.setState({currentDuration})
  }
  startEffect() {
    let interval = setInterval(() => this.tickSecond(), 1000)
    this.setState({currentDuration: 0, interval, ticks: 0})
  }
  componentDidMount() {
    this.startEffect()
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.effect != nextProps.effect) this.startEffect()
  }
  render() {
    const {name, duration, colour} = this.props.effect
    const {currentDuration} = this.state
    return <div>
      <div style={{backgroundColor: colour}}  className="tag is-large">{name} ({duration - Math.floor(currentDuration)})</div>
    </div>
  }
}

export default connect()(EffectTag)
