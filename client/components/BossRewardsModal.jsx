import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'

import weaponSwitch from '../utils/weaponSwitch'

import {earnGold} from '../actions/gold'
import {addWeapon} from '../actions/weapons'
import {HealthIcon, PowerIcon, ManaIcon, SpeedIcon, ManaRegenIcon, GoldIcon} from './icons/StatIcons'

class BossRewardsModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showRewards: false,
      goldReward: Math.ceil(props.boss.goldReward * (0.9 + (Math.random() * 0.4))),
      weaponReward: this.solveWeaponReward(props.boss)
    }
    this.showRewards = this.showRewards.bind(this)
    this.showRewards = this.showRewards.bind(this)
  }
  solveWeaponReward(boss) {
    const {currentLocation} = this.props
    const giveWeapon = Math.random() < boss.weaponChance
    if (!giveWeapon) return null
    const weapons = boss.weaponRewards
    // const weapons = boss.weaponRewards.concat(currentLocation.weaponRewards)
    let reward = weapons[Math.floor(Math.random() * weapons.length)]
    reward = weaponSwitch[reward](boss.level)
    return reward
  }
  componentDidMount() {
    this.getReward()
  }
  getReward() {
    const {goldReward, weaponReward} = this.state
    this.props.dispatch(earnGold(goldReward))
    if (weaponReward) this.props.dispatch(addWeapon(weaponReward))
  }
  showRewards() {
    this.setState({showRewards: true})
  }
  backToMenu() {
    this.props.dispatch({type: 'RETURN_TO_MENU', boss: this.props.boss})
    this.props.history.push('/')
  }
  weaponInfo(weapon) {
    return <div className="">
      <p className="title is-3">You found a Weapon!</p>
      <hr />
      <div className="box">
        <h1 className="title is-3">{weapon.name} <i className={`icon ra ra-fw ${weapon.icon}`} /></h1>
        <div className="title is-4">{weapon.class} Weapon!</div>
        <div className="subtitle is-5">{weapon.description}</div>
        {weapon.class == 'Player'
          ? <div className="columns is-multiline">
            <div className="column is-4"><span className="subtitle is-4"><HealthIcon value={weapon.hp} /></span></div>
            <div className="column is-4"><span className="subtitle is-4"><ManaIcon value={weapon.mana} /></span></div>
            <div className="column is-4"><span className="subtitle is-4"><ManaRegenIcon value={weapon.manaRegen} /></span></div>
          </div>
          : <div className="columns is-multiline">
            <div className="column is-4"><span className="subtitle is-4"><HealthIcon value={`${weapon.hp > 0 ? '+' : ''}${weapon.hp * 100}%`} /></span></div>
            <div className="column is-4"><span className="subtitle is-4"><PowerIcon value={`${weapon.power > 0 ? '+' : ''}${weapon.power * 100}%`} /></span></div>
            <div className="column is-4"><span className="subtitle is-4"><SpeedIcon value={`${weapon.speed > 0 ? '+' : ''}${weapon.speed * 100}%`} /></span></div>
          </div>
        }
        {weapon.bonusEffect && <div className="box content is-large">Bonus: {weapon.effectDescription}</div>}
      </div>
    </div>
  }
  render() {
    const {showRewards, goldReward, weaponReward} = this.state
    const {boss} = this.props
    return <div className="Town-Buttons Menu-Buttons Town Menu Modal modal is-active">
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title title is-1 has-text-centered">{boss.name} Defeated! </p>
        </header>
        <section className="modal-card-body">
          {showRewards
            ? <div className="has-text-centered">
              <p className="title is-2">Your Rewards</p>
              <span className="subtitle is-1"><GoldIcon value={goldReward} /></span>
              {weaponReward && this.weaponInfo(weaponReward)}
              <button onClick={() => this.backToMenu()} className="button is-info is-large is-fullwidth">Back to Dungeon Menu</button>
            </div>
            : <button onClick={this.showRewards} className="button is-large is-fullwidth is-success"><i className="fas fas-gift" /></button>
          }
        </section>
        <footer className="modal-card-foot">

        </footer>
      </div>
    </div>
  }
}

const mapStateToProps = ({location}) => {
  return {
    currentLocation: location
  }
}

export default withRouter(connect(mapStateToProps)(BossRewardsModal))
