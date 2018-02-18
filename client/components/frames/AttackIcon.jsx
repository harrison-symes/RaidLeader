import React, {Component} from 'react'

class AttackIcon extends Component {
  constructor(props) {
    super(props)
    this.state = {
      x: props.svg.startX || 10,
      y: props.svg.startY || 10
    }
  }
  render() {
    return <i className={`ra ra-sword`} style={{position: 'fixed', top: this.state.y, left: this.state.x}}/>
  }
}

export default AttackIcon
