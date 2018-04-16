import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'

import BossPreview from './BossPreview'

import weaponSwitch from '../../utils/weaponSwitch'
import {addWeapon} from '../../actions/weapons'
import {earnGold} from '../../actions/gold'
import {completeDungeon} from '../../actions/dungeons'
import {gainExperience} from '../../actions/experience'
import {gainGems} from '../../actions/gems'

import {solveLevelByExperience, solveExperienceNeeded, levelExperienceRequired} from '../../utils/experienceRequired'

import AnimatedExpBar from './AnimatedExpBar'

import {GoldIcon, PowerIcon, ManaIcon, ManaRegenIcon, HealthIcon, WeaponIcon, SpeedIcon, GemIcon} from '../icons/StatIcons'

const createState = exp => ({
  exp,
  level: solveLevelByExperience(exp),
  expNeeded: solveExperienceNeeded(exp),
  totalToLevel: levelExperienceRequired(solveLevelByExperience(exp))
})

class DungeonRewards extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showRewards: false,
      goldReward: Math.ceil(props.currentLocation.gold_reward * (0.9 + (Math.random() * 0.4))),
      weaponReward: this.solveWeaponReward(),
      gems: 0,
      animationDone: false
    }
    this.showRewards = this.showRewards.bind(this)
    this.returnToTown = this.returnToTown.bind(this)
    this.addGem = this.addGem.bind(this)
    this.finishExpAnimation = this.finishExpAnimation.bind(this)
  }
  addGem() {
    this.setState({gems: this.state.gems + 1})
  }
  finishExpAnimation() {
    this.props.dispatch(gainExperience(this.state.goldReward))
    if (this.state.gems > 0) this.props.dispatch(gainGems(this.state.gems))
    this.setState({animationDone: true})
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
          <div className="column subtitle is-3"><HealthIcon value={weapon.hp} /></div>
          <div className="column subtitle is-3"><PowerIcon value={weapon.power} /></div>
          {weapon.class != 'Player' && <div className="column subtitle is-3"><SpeedIcon value={weapon.speed} /></div>}
          {weapon.class == 'Player' && <div className="column subtitle is-3"><ManaIcon value={weapon.mana}/></div>}
          {weapon.class == 'Player' && <div className="column subtitle is-3"><ManaRegenIcon value={weapon.manaRegen} /></div>}
        </div>
        {weapon.bonusEffect && <div className="content is-large box">{weapon.effectDescription}</div>}
      </div>
    </div>
  }
  renderRewardsModal() {
    const {currentLocation} = this.props
    const {weaponReward, showRewards, goldReward, gems} = this.state
    return <div className="Modal modal is-active">
      <div className="modal-background"></div>
      <div className="modal-card">
        <section className="modal-card-body">
          <p className="title is-1">{currentLocation.name} Completed!</p>
          <hr />
          {showRewards
            ? <div className="has-text-centered">
              <AnimatedExpBar experienceGained={goldReward} finishExpAnimation={this.finishExpAnimation} addGem={this.addGem} />
              <p className="title is-2">Your Rewards:</p>
              {gems > 0
                ? <span className="column is-8 is-offset-2 columns">
                  <span className="column is-6"><p className="subtitle is-1"><GemIcon value={gems} /></p></span>
                  <span className="column is-6"><p className="subtitle is-1"><GoldIcon value={goldReward} /></p></span>
                </span>
                : <span className="subtitle is-1"><GoldIcon value={goldReward} /></span>
              }
              {weaponReward && this.weaponInfo(weaponReward)}
            </div>
            : <button onClick={this.showRewards} className="button is-large is-fullwidth is-success">Open Chest</button>
          }
        </section>
        {showRewards && <footer className="modal-card-foot">
          {this.state.animationDone && <div onClick={this.returnToTown} className="button is-success is-fullwidth is-large">Return to Town</div>}
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
      {currentLocation.bosses.map((boss, i) => <i key={i} className={`title has-text-${i + 1 <= bossesDefeated.length ? 'success' : 'danger'} is-2 icon ${i + 1 <= bossesDefeated.length ? 'ra-broken-skull' : 'ra-skull'} ra ra-fw is-large`} />)}
      {bossesDefeated.length == currentLocation.bosses.length && this.renderRewardsModal()}
    </span>
  }
}

const mapStateToProps = ({location, party}) => {
  return {
    currentLocation: location,
    party
  }
}

export default withRouter(connect(mapStateToProps)(DungeonRewards))
