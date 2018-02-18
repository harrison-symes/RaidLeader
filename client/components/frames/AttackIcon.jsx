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
      show: true
    }
  }
  componentDidMount() {
    this.startTick()
  }
  startTick() {
    setTimeout(() => this.endTick(), 10)
  }
  componentDidUpdate(state) {
    console.log({state});
    if (!state.show) this.props.deleteSVG(this.props.svg)
  }
  endTick() {
    let {y, x, targetY, targetX, speedY, speedX, show} = this.state
    if (!show) return
    if (y > targetY) y-=speedY
    if (x > targetX) x-=speedX
    if (y <= targetY && x <= targetX) {
      this.setState({show: false})
    }
    else {
      this.startTick()
      this.setState({y, x})
    }
  }
  render() {
    return this.state.show
      ? <i className={`ra ra-sword`} style={{position: 'fixed', top: this.state.y, left: this.state.x}}/>
      : null
  }
}

export default AttackIcon
