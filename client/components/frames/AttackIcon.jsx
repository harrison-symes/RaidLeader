import React, {Component} from 'react'

class AttackIcon extends Component {
  constructor(props) {
    super(props)
    const {startX, startY} = props.svg
    var bossFrame = document.getElementById('BossIcon').getBoundingClientRect()
    this.state = {
      x: startX || 10,
      y: startY || 10,
      targetX: bossFrame.left,
      targetY: bossFrame.top,
      speedY: (startY - bossFrame.top) / 50,
      speedX: (startX - bossFrame.left) / 50,
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
    let {y, x, targetY, targetX, speedY, speedX} = this.state
    if (this.interval) {
      if (y > targetY) y-=speedY
      if (x > targetX) x-=speedX
      if (y <= targetY && x <= targetX) {
        this.props.deleteSVG(this.props.svg)
      }
      else {
        // this.startTick()
        this.setState({y, x})
      }
    }
  }
  render() {
    const {colour, icon} = this.props.svg.info
    console.log({colour, icon});
    return <i className={`ra ${icon} ra-3x`} style={{color: colour ,position: 'fixed', top: this.state.y, left: this.state.x}} />
  }
}

export default AttackIcon
