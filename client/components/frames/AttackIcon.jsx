import React, {Component} from 'react'

export class AttackIcon extends Component {
  getTargetFrame(target) {
    return document.getElementById(target ? `Recruit-${target.id}`: 'BossIcon' ).getBoundingClientRect()

  }
  constructor(props) {
    super(props)
    const {startX, startY, info, target} = props.svg

    var targetFrame = this.getTargetFrame(target)

    this.state = {
      x: startX || 10,
      y: startY || 10,
      targetX: targetFrame.left,
      targetY: targetFrame.top,
      speedY: (startY - targetFrame.top) / 100,
      speedX: (startX - targetFrame.left) / 100,
      rotation: info.rotation
    }
    this.interval = false
  }
  componentDidMount() {
    this.interval = setInterval(() => this.endTick(), 10)
  }
  componentWillUnmount() {
    if (this.interval) clearInterval(this.interval)
    this.interval = false
  }
  endTick() {
    let {y, x, targetY, targetX, speedY, speedX, rotation} = this.state
    if (this.interval) {
      if (y > targetY) y-=speedY
      if (x > targetX) x-=speedX
      if (y <= targetY && x <= targetX) {
        this.props.deleteSVG(this.props.svg)
      }
      else {
        // this.startTick()
        if (this.props.svg.info.rotates) rotation+=30
        this.setState({y, x, rotation})
      }
    }
  }
  render() {
    const {colour, icon} = this.props.svg.info
    return <i className={`ra ${icon} ra-2x`} style={{transform: `rotate(${this.state.rotation}deg)`, color: colour, position: 'fixed', top: this.state.y, left: this.state.x}} />
  }
}

export default AttackIcon
