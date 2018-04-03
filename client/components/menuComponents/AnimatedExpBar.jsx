import React, {Component} from 'react'
import {connect} from 'react-redux'

import { Line, Circle } from 'rc-progress';

import {solveLevelByExperience, solveExperienceNeeded, levelExperienceRequired, experienceForLevel} from '../../utils/experienceRequired'

const createState = exp => ({
  exp,
  level: solveLevelByExperience(exp),
  expNeeded: solveExperienceNeeded(exp),
  totalToLevel: levelExperienceRequired(solveLevelByExperience(exp)),
  expConsumed: experienceForLevel(solveLevelByExperience(exp) - 1)
})

class AnimatedExpBar extends Component {
  constructor(props) {
    super(props)
    let totalToMove = props.experienceGained
    let currentExperience = props.experience
    this.state = {
      currentExperience,
      startingLevel: currentExperience.level,
      currentExpMovement: 0,
      totalToMove,
      expPerTick: Math.ceil(totalToMove / 50),
      overLap: 0,
      gems: 0
    }
    this.timeout = null
  }
  tickExpMovement() {
    let {currentExpMovement, totalToMove, expPerTick, currentExperience, nextExperience, startingLevel, gems} = this.state
    currentExpMovement+=expPerTick
    if (currentExpMovement > totalToMove) currentExpMovement = totalToMove
    currentExperience = createState(currentExperience.exp + expPerTick)
    console.log({currentExperience});
    if (currentExperience.level > startingLevel + gems) {
      gems++
      this.props.addGem()
    }
    this.setState({currentExpMovement, currentExperience, gems})
    if (currentExpMovement < totalToMove) this.startTick()
    else this.props.finishExpAnimation()
  }
  startTick() {
    this.timeout = setTimeout(() => this.tickExpMovement(), 100)
  }
  componentDidMount() {
    console.log("mounting");
    this.startTick()
  }
  render() {
    const {currentExperience, currentExpMovement, overLap} = this.state
    let percent = (currentExperience.exp - currentExperience.expConsumed) / currentExperience.totalToLevel * 100
    return <div>
      <Line percent={percent} strokeWidth={`${4}`} strokeColor={'blue'} strokeLinecap="square"  trailWidth={`${5}`}/>
      <span className="level">
        <p className="is-pulled-left title is-3">Level: {solveLevelByExperience(currentExperience.exp)}</p>
        <p className="is-pulled-right subtitle is-3"> {currentExperience.exp - currentExperience.expConsumed} / {currentExperience.totalToLevel} Exp</p>
      </span>
      <hr />
    </div>
  }
}

const mapStateToProps = ({experience}) => ({experience})

export default connect(mapStateToProps)(AnimatedExpBar)
