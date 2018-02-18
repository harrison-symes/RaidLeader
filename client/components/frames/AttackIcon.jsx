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
      speedY: (startY - bossFrame.top) / 30,
      speedX: (startX - bossFrame.left) / 30,
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
    if (!this.interval) return
    if (y > targetY) y-=speedY
    if (x > targetX) x-=speedX
    if (y <= targetY && x <= targetX) {
      this.setState({show: false})
      this.props.deleteSVG(this.props.svg)
    }
    else {
      // this.startTick()
      this.setState({y, x})
    }
  }
  render() {
    return <i className={`ra ra-sword`} style={{position: 'fixed', top: this.state.y, left: this.state.x}} />
  }
}

export default AttackIcon
