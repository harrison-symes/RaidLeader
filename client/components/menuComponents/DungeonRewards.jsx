import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'

import BossPreview from './BossPreview'

import weaponSwitch from '../../utils/weaponSwitch'
import {addWeapon} from '../../actions/weapons'
import {earnGold} from '../../actions/gold'
import {completeDungeon} from '../../actions/dungeons'

class DungeonRewards extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showRewards: false,
      goldReward: props.currentLocation.gold_reward,
      weaponReward: this.solveWeaponReward()
    }
    this.showRewards = this.showRewards.bind(this)
    this.returnToTown = this.returnToTown.bind(this)
  }
  returnToTown() {
    this.props.dispatch({type: 'TRAVEL_TO_TOWN'})
    this.props.history.push('/')
  }
  solveWeaponReward() {
    const {currentLocation} = this.props
    if (!currentLocation.rewards) return
    const weapons = JSON.parse(currentLocation.rewards)
    const roll = Math.random()
    // const weapons = boss.weaponRewards.concat(currentLocation.weaponRewards)
    let reward = null
    weapons.forEach(weapon => {
      if (weapon.min <= roll && weapon.max > roll) reward = weaponSwitch[weapon.name](currentLocation.level)
    })
    return reward
  }
  weaponInfo(weapon) {
    return <div className="">
      <p className="title is-3">You found a Weapon!</p>
      <hr />
      <div className="box">
        <h1 className="title is-3">{weapon.name}</h1>
        <div className="title is-4">{weapon.class} Weapon!</div>
        <div className="subtitle is-5">{weapon.description}</div>
        <div className="columns is-multiline">
          <div className="column subtitle is-4">Health: {weapon.hp}</div>
          <div className="column subtitle is-4">Power: {weapon.power}</div>
          {weapon.class != 'Player' && <div className="column subtitle is-4">Speed: {weapon.speed}</div>}
          {weapon.class == 'Player' && <div className="column subtitle is-4">Mana: {weapon.mana} ({weapon.manaRegen} per second)</div>}
        </div>
        {weapon.bonusEffect && <div className="subtitle is-3">Bonus: {weapon.bonusEffect}</div>}
      </div>
    </div>
  }
  renderRewardsModal() {
    const {currentLocation} = this.props
    const {weaponReward, showRewards} = this.state
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
              {weaponReward && this.weaponInfo(weaponReward)}
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
    const {goldReward, weaponReward} = this.state
    this.props.dispatch({type: 'DUNGEON_CHEST_OPENED'})
    this.props.dispatch(completeDungeon(currentLocation))
    this.props.dispatch(earnGold(goldReward))
    if (weaponReward) this.props.dispatch(addWeapon(weaponReward))
    this.setState({showRewards: true})
  }
  render() {
    const {currentLocation} = this.props
    const bossesDefeated = currentLocation.bosses.filter(boss => boss.isDefeated)
    const {showRewards} = this.state
    return <div className="has-text-centered">
      <p className="title is-3">Dungeon Progress:</p>
      <hr />
      <p className="subtitle is-3">Bosses Defeated: {bossesDefeated.length} / {currentLocation.bosses.length}</p>
      {bossesDefeated.length == currentLocation.bosses.length && this.renderRewardsModal()}
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
