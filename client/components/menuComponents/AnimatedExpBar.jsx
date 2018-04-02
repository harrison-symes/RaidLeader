import React, {Component} from 'react'
import {connect} from 'react-redux'

import { Line, Circle } from 'rc-progress';

class AnimatedExpBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentExperience: props.currentExperience,
      nextExperience: props.nextExperience,
      currentExpMovement: 0,
      totalToMove: props.nextExperience.exp - props.currentExperience.exp,
      expPerTick: Math.ceil((props.nextExperience.exp - props.currentExperience.exp) / 20)
    }
    this.timeout = null
  }
  tickExpMovement() {
    let {currentExpMovement, totalToMove, expPerTick} = this.state
    currentExpMovement+=expPerTick
    if (currentExpMovement > totalToMove) currentExpMovement = totalToMove
    this.setState({currentExpMovement})
    if (currentExpMovement < totalToMove) this.startTick()
  }
  startTick() {
    this.timeout = setTimeout(() => this.tickExpMovement(), 100)
  }
  componentDidMount() {
    this.startTick()
  }
  render() {
    const {currentExperience, currentExpMovement} = this.state
    let percent = (currentExperience.exp + currentExpMovement) / currentExperience.expNeeded * 100
    return <div>
      <Line percent={percent} strokeWidth={`${4}`} strokeColor={'blue'} strokeLinecap="square"  trailWidth={`${5}`}/>
      <p className="subtitle is-4">{currentExperience.exp + currentExpMovement} / {currentExperience.expNeeded} Exp</p>
    </div>
  }
}

export default connect()(AnimatedExpBar)
