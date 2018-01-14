import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'

import BossPreview from './BossPreview'

import {earnGold} from '../../actions/gold'

class DungeonRewards extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showRewards: false,
      loot: null
    }
    this.showRewards = this.showRewards.bind(this)
    this.returnToTown = this.returnToTown.bind(this)
  }
  returnToTown() {
    this.props.dispatch({type: 'TRAVEL_TO_TOWN'})
    this.props.history.push('/')
  }
  renderRewardsModal() {
    const {currentLocation} = this.props
    const {loot, showRewards} = this.state
    return <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-card">
        <section className="modal-card-body">
          <p className="title is-1">{currentLocation.name} Completed!</p>
          <hr />
          {showRewards
            ? <div>
              <p className="title is-2">Rewards:</p>
              <p className="title is-3">Gold: {currentLocation.gold_reward}</p>
              {loot && <div>
                <p className="title is-3">{loot}</p>
              </div>}
            </div>
            : <button className="button is-primary is-fullwidth is-large" onClick={this.showRewards}>Open Chest</button>
          }
        </section>
        {showRewards && <footer className="modal-card-foot">
          <div onClick={this.returnToTown} className="button is-success is-fullwidth is-large">Return to Town</div>
        </footer>}
      </div>
    </div>
  }
  showRewards() {
    const {currentLocation} = this.props
    this.props.dispatch(earnGold(currentLocation.gold_reward))
    let loot = JSON.parse(currentLocation.rewards)
    loot = loot[Math.floor(Math.random() * loot.length)]
    this.setState({showRewards: true, loot})
    this.props.dispatch({type: 'DUNGEON_CHEST_OPENED'})
  }
  render() {
    const {currentLocation} = this.props
    console.log({currentLocation});
    const bossesDefeated = currentLocation.bosses.filter(boss => boss.isDefeated)
    const {showRewards} = this.state
    return <div className="has-text-centered">
      <p className="title is-3">Dungeon Progress:</p>
      <hr />
      <p className="subtitle is-3">Bosses Defeated: {bossesDefeated.length} / {currentLocation.bosses.length}</p>
      {bossesDefeated != currentLocation.bosses.length && this.renderRewardsModal()}
      {bossesDefeated.map(boss => <BossPreview boss={boss} i={0} />)}
      <hr />
    </div>
  }
}

const mapStateToProps = ({location}) => {
  return {
    currentLocation: location
  }
}

export default withRouter(connect(mapStateToProps)(DungeonRewards))
