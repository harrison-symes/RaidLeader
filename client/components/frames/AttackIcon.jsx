import React, {Component} from 'react'

class AttackIcon extends Component {
  constructor(props) {
    super(props)
    var bossFrame = document.getElementById('BossIcon').getBoundingClientRect()
    this.state = {
      x: props.svg.startX || 10,
      y: props.svg.startY || 10,
      targetX: bossFrame.left,
      targetY: bossFrame.top
    }
  }
  componentDidMount() {
    this.startTick()
  }
  startTick() {
    setTimeout(() => this.endTick(), 10)
  }
  endTick() {
    let {y, targetY} = this.state
    y--
    if (y <= targetY) this.props.deleteSVG(this.props.svg)
    else {
      this.setState({y})
      this.startTick()
    }
  }
  render() {
    return <i className={`ra ra-sword`} style={{position: 'fixed', top: this.state.y, left: this.state.x}}/>
  }
}

export default AttackIcon
