import React, {Component} from 'react'
import {connect} from 'react-redux'

import bossSwitch from './bosses/utils/bossSwitch'
import PlayerFrame from './frames/PlayerFrame'
import PartyFrame from './frames/PartyFrame'

class Game extends Component {
  constructor(props) {
    super(props)
    this.state = {
      interval: null
    }
    this.startGame = this.startGame.bind(this)
  }
  componentWillReceiveProps(nextProps) {
    if (!this.props.started && nextProps.started) {
      let interval = setInterval(() => this.props.dispatch({type: 'TICK_ONE_SECOND'}), 1000)
      this.setState({interval})
    }
  }
  startGame () {
    this.props.dispatch({type: 'START'})
  }
  render () {
    const {started, boss} = this.props
    return <div className="Game">
      {bossSwitch(boss)}
      <PartyFrame />
      <PlayerFrame />
      {!started && <button onClick={this.startGame}>Start</button>}
    </div>
  }
}

const mapStateToProps = ({started, boss}) => {
  return {
    started,
    boss
  }
}


export default connect(mapStateToProps)(Game)
