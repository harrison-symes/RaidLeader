import React, {Component} from 'react'
import {connect} from 'react-redux'

import BossFrame from './frames/BossFrame'
import PlayerFrame from './frames/PlayerFrame'
import PartyFrame from './frames/PartyFrame'

class Game extends Component {
  constructor(props) {
    super(props)
    this.state = {
      started: false,
      interval: null
    }
    this.startGame = this.startGame.bind(this)
  }
  startGame () {
    this.setState({started: true})
  }
  render () {
    const {started} = this.state
    return <div className="game">
      <BossFrame />
      <PartyFrame />
      <PlayerFrame />
      {!started && <button onClick={this.startGame}>Start</button>}
    </div>
  }
}

const mapStateToProps = state => {
  return {

  }
}

const mapDispatchToProps = dispatch => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game)
