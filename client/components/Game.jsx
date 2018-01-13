import React, {Component} from 'react'
import {connect} from 'react-redux'

import {Link} from 'react-router-dom'

import bossSwitch from './bosses/utils/bossSwitch'
import PlayerFrame from './frames/PlayerFrame'
import PartyFrame from './frames/PartyFrame'
import BossRewardsModal from './BossRewardsModal'

class Game extends Component {
  constructor(props) {
    super(props)
    this.state = {
      interval: null,
      startModal: true,
      winModal: false,
      loseModal: false
    }
    this.startGame = this.startGame.bind(this)
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.started && nextProps.boss.hp <= 0) this.gameWon()
    else if (this.props.started && nextProps.player.hp <= 0) this.gameLost()
    if (nextProps.player.spells.length == 0 || nextProps.party.length == 0 || !nextProps.boss) return this.props.location.push('/')
    if (!this.props.started && nextProps.started) {
      let interval = setInterval(() => this.props.dispatch({type: 'TICK_ONE_SECOND'}), 1000)
      this.setState({interval})
    }
  }
  startGame () {
    this.props.dispatch({type: 'START'})
  }
  renderStartModal() {
    return <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-content has-text-centered">
        <button onClick={() => this.startGame()} className="button is-large is-fullwidth is-success">START</button>
      </div>
    </div>
  }
  runToTown() {
    this.props.dispatch({type: 'TRAVEL_TO_TOWN'})
    this.props.history.push('/')
  }
  loseModal() {
    return <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-content has-text-centered">
        <h1 className="title">You Died</h1>
        <button onClick={() => this.runToTown()} className="button is-large is-fullwidth is-info">Return To Town</button>
      </div>
    </div>
  }
  gameWon() {
    this.props.dispatch({type: 'GAME_WON'})
    this.setState({winModal: true})
  }
  gameLost() {
    this.props.dispatch({type: 'GAME_LOST'})
    this.setState({loseModal: true})
  }
  render () {
    const {started, boss, player, party} = this.props
    const {loseModal, winModal} = this.state
    if (player.spells.length == 0 || party.length == 0 || !boss) return <div className="Game hero is-fullheight has-text-centered">
      <div className="hero">
        <h1 className="title is-1">Game not ready</h1><br />
        <Link to="/" className="button is-large is-success">Return to Menu</Link>
      </div>
    </div>
    return <div className="Game">
      {winModal && <BossRewardsModal boss={this.props.boss} />}
      {loseModal && this.loseModal()}
      {!started && !loseModal && !winModal && this.renderStartModal()}
      {bossSwitch(boss)}
      <PartyFrame />
      <PlayerFrame />
    </div>
  }
}

const mapStateToProps = ({started, boss, player, party}) => {
  return {
    started,
    boss,
    player,
    party
  }
}


export default connect(mapStateToProps)(Game)
