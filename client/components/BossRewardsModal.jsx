import React, {Component} from 'react'
import {connect} from 'react-redux'

class BossRewardsModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showRewards: false,
      goldReward: props.boss.goldReward || 100,
      weaponReward: Math.random() < props.boss.weaponChance ? this.solveWeaponReward(props.boss) : null
    }
  }
  solveWeaponReward(boss) {
    const {currentLocation} = this.props
    const weapons = boss.weaponRewards.concat(currentLocation.weaponRewards)
    let reward = weapons[Math.floor(Math.random() * weapons.length)]
    return {name: weapons, type: 'weapon'}
  }
  render() {
    const {showRewards, goldReward, weaponReward}
    return <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title title is-1">{boss.name} Defeated! </p>
        </header>
        <section className="modal-card-body">
          {showRewards
            ? <div className="has-text-centered">
              <p className="title is-2">Your Rewards</p>
              <p className="subtitle is-1">{goldReward} Gold</p>
              {weaponReward && <div>
                <p className="title is-3">You found a Weapon!</p>
                <h1>weaponReward</h1>
              </div>}
            </div>
            : <button className="button is-large is-success">Collect Rewards</button>
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

export default connect(mapStateToProps)(BossRewardsModal)
