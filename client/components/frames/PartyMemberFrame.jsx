import React, {Component} from 'react'
import {connect} from 'react-redux'

import HealthBar from './HealthBar'

class MemberFrame extends Component {
  constructor(props) {
    super(props)
    this.state = {
      interval: null
    }
  }
  physicalAttack() {
    console.log("attack");
    this.props.dispatch({type: 'PARTY_ATTACK', power: this.props.member.power})
  }
  startFighting () {
    let attackType = 'physical'
    const interval = setInterval(this.physicalAttack.bind(this), 10000 / this.props.member.speed)
    this.setState({interval})
  }
  componentWillReceiveProps(nextProps) {
    if (!this.state.interval || (!this.props.started) && nextProps.started) this.startFighting()
  }
  render() {
    const {member} = this.props
    const {initHp, hp, name} = member
    console.log({member});
    return <div className="box MemberFrame">
      <h1 className="title is-3">{name}</h1>
      <div className="columns">

      </div>
      <HealthBar maxHP={initHp} hp={hp} />
    </div>
  }
}

const mapStateToProps = ({started}) => {
  return {
    started
  }
}

const mapDispatchToProps = dispatch => {
  return {

  }
}

export default connect(mapStateToProps)(MemberFrame)
