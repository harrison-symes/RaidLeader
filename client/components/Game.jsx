import React, {Component} from 'react'
import {connect} from 'react-redux'

import BossFrame from './frames/BossFrame'
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
    const {started} = this.props
    console.log(this.props);
    return <div className="Game">
      <BossFrame />
      <PartyFrame />
      <PlayerFrame />
      {!started && <button onClick={this.startGame}>Start</button>}
    </div>
  }
}

const mapStateToProps = ({started}) => {
  return {
    started
  }
}


export default connect(mapStateToProps)(Game)
