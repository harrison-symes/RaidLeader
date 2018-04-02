import React, {Component} from 'react'
import {connect} from 'react-redux'

import { Line, Circle } from 'rc-progress';

import {solveLevelByExperience, solveExperienceNeeded, levelExperienceRequired} from '../../utils/experienceRequired'

const createState = exp => ({
  exp,
  level: solveLevelByExperience(exp),
  expNeeded: solveExperienceNeeded(exp),
  totalToLevel: levelExperienceRequired(solveLevelByExperience(exp)),
  expConsumed: levelExperienceRequired(solveLevelByExperience(exp) - 1)
})

class AnimatedExpBar extends Component {
  constructor(props) {
    super(props)
    let totalToMove = 1000
    this.state = {
      currentExperience: createState(props.currentExperience.exp),
      currentExpMovement: 0,
      totalToMove,
      expPerTick: Math.ceil(totalToMove) / 50,
      gems: 0,
      overLap: 0
    }
    this.timeout = null
  }
  tickExpMovement() {
    let {currentExpMovement, totalToMove, expPerTick, currentExperience, nextExperience} = this.state
    currentExpMovement+=expPerTick
    if (currentExpMovement > totalToMove) currentExpMovement = totalToMove
    this.setState({currentExpMovement, currentExperience: createState(currentExperience.exp + expPerTick)})
    if (currentExpMovement < totalToMove) this.startTick()
  }
  startTick() {
    this.timeout = setTimeout(() => this.tickExpMovement(), 100)
  }
  componentDidMount() {
    this.startTick()
  }
  render() {
    const {currentExperience, currentExpMovement, overLap} = this.state
    let percent = (currentExperience.exp - currentExperience.expConsumed) / currentExperience.totalToLevel * 100
    console.log({currentExperience});
    // if (overLap == 1) percent = ((currentExperience.expNeeded - (currentExperience.exp + currentExpMovement)) + )
    return <div>
      <Line percent={percent} strokeWidth={`${4}`} strokeColor={'blue'} strokeLinecap="square"  trailWidth={`${5}`}/>
      <p className="subtitle is-4">Level {solveLevelByExperience(currentExperience.exp)}: {currentExperience.exp - currentExperience.expConsumed} / {currentExperience.totalToLevel} Exp</p>
    </div>
  }
}

export default connect()(AnimatedExpBar)
