import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

class BossRewardsModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showRewards: false,
      goldReward: props.boss.goldReward || 100,
      weaponReward: this.solveWeaponReward(props.boss)
    }
    console.log(this.state);
    this.showRewards = this.showRewards.bind(this)
    this.showRewards = this.showRewards.bind(this)
  }
  solveWeaponReward(boss) {
    const {currentLocation} = this.props
    console.log({boss});
    const giveWeapon = Math.random() < boss.weaponChance
    if (!giveWeapon) return null
    const weapons = boss.weaponRewards
    // const weapons = boss.weaponRewards.concat(currentLocation.weaponRewards)
    let reward = weapons[Math.floor(Math.random() * weapons.length)]
    console.log({reward, weapons});
    return {name: reward, type: 'weapon'}
  }
  showRewards() {
    this.setState({showRewards: true})
  }
  backToMenu() {
    this.props.dispatch({type: 'RETURN_TO_MENU'})
    this.props.location.push('/')
  }
  render() {
    const {showRewards, goldReward, weaponReward} = this.state
    const {boss} = this.props
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
                <h1>{weaponReward}</h1>
              </div>}
              <button onClick={this.backToMenu} className="button is-info is-large is-fullwidth">Back to Dungeon Menu</button>
            </div>
            : <button onClick={this.showRewards} className="button is-large is-fullwidth is-success">Collect Rewards</button>
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
