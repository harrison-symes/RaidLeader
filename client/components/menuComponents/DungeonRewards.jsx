import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'

import BossPreview from './BossPreview'

import weaponSwitch from '../../utils/weaponSwitch'
import {addWeapon} from '../../actions/weapons'
import {earnGold} from '../../actions/gold'
import {completeDungeon} from '../../actions/dungeons'

import {GoldIcon, PowerIcon, ManaIcon, ManaRegenIcon, HealthIcon, WeaponIcon, SpeedIcon} from '../icons/StatIcons'

class DungeonRewards extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showRewards: false,
      goldReward: Math.ceil(props.currentLocation.gold_reward * (0.9 + (Math.random() * 0.4))),
      weaponReward: this.solveWeaponReward()
    }
    console.log(this.state);
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
    const weapons = currentLocation.rewards
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
        <h1 className="title is-3">{weapon.name}&nbsp;<WeaponIcon name={weapon.name} /></h1>
        <div className="title is-4">{weapon.class} Weapon!</div>
        <div className="subtitle is-5">{weapon.description}</div>
        <div className="columns is-multiline">
          <div className="column subtitle is-4"><HealthIcon value={weapon.hp} /></div>
          <div className="column subtitle is-4"><PowerIcon value={weapon.power} /></div>
          {weapon.class != 'Player' && <div className="column subtitle is-4"><SpeedIcon value={weapon.speed} /></div>}
          {weapon.class == 'Player' && <div className="column subtitle is-4"><ManaIcon value={weapon.mana}/> (<ManaRegenIcon value={weapon.manaRegen} />)</div>}
        </div>
        {weapon.bonusEffect && <div className="content is-large box">{weapon.effectDescription}</div>}
      </div>
    </div>
  }
  renderRewardsModal() {
    const {currentLocation} = this.props
    const {weaponReward, showRewards} = this.state
    return <div className="Modal modal is-active">
      <div className="modal-background"></div>
      <div className="modal-card">
        <section className="modal-card-body">
          <p className="title is-1">{currentLocation.name} Completed!</p>
          <hr />
          {showRewards
            ? <div>
              <p className="title is-2">Rewards:</p>
              <p className="title is-3"><GoldIcon value={this.state.gold_reward} /></p>
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
    return <span className=" is-large">
      {currentLocation.bosses.map((boss, i) => <i key={i} className={`title has-text-${i + 1 <= bossesDefeated.length ? 'success' : 'danger'} is-2 icon ${i + 1 <= bossesDefeated.length ? 'ra-broken-skull' : 'ra-skull'} ra ra-fw`} />)}
      {bossesDefeated.length == currentLocation.bosses.length && this.renderRewardsModal()}
    </span>
  }
}

const mapStateToProps = ({location}) => {
  return {
    currentLocation: location
  }
}

export default withRouter(connect(mapStateToProps)(DungeonRewards))
