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
    const {effect, target} = this.props
    const currentDuration = this.state.currentDuration + 1
    console.log({effect});
    if (!effect) return
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
    if (this.props.effect) setTimeout(() => this.tickSecond(), 1000)
  }
  startEffect() {
    this.startSecond()
    this.setState({currentDuration: 0, ticks: 0})
  }
  componentDidMount() {
    this.startEffect()
  }
  componentWillReceiveProps(nextProps) {
    console.log("effect", nextProps.effect);
    if (this.props.effect != nextProps.effect && nextProps.effect) {
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
