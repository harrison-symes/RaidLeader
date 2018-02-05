import React from 'react'
import {connect} from 'react-redux'

import {HealthIcon, ManaIcon, ManaRegenIcon, PowerIcon, ArmorIcon} from '../icons/StatIcons'

class BossPreview extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
      boss: null
    }
  }
  targetBoss(boss) {
    this.setState({showModal: false, boss})
    this.props.dispatch({type: "TARGET_BOSS", boss})
  }
  renderBossModal () {
    const {boss} = this.state
    const {bosses} = this.props.currentLocation
    const defeatedBossCount = bosses.filter(boss => boss.isDefeated).length
    let colour = !boss.isDefeated ? defeatedBossCount >= boss.progress_required ? 'is-success' : 'is-danger' : 'is-dark'
    if (boss == this.props.targetBoss) colour='is-primary'
    const renderStat = (text) => <li className="column is-6 has-text-centered"><p className="subtitle is-4">{text}</p></li>
    return <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title title is-2">{boss.name}</p>
          <button onClick={() => this.changeModal(false, null)} className="delete" aria-label="close"></button>
        </header>
        <section className="modal-card-body">
          <p className="subtitle is-5">{boss.description}</p>
          <hr />
          <p className="title is-2">Rewards:</p>
          <p className="title is-4">{boss.goldReward} Gold</p>
          {boss.weaponRewards.length > 0 && <div>
            <p className="title is-4">{boss.weaponChance * 100}% Chance:</p>
            {boss.weaponRewards.map((reward, i) => <p className="title is-5">{i == boss.weaponRewards.length - 1 && boss.weaponRewards.length > 1 ? "or " : ""}{reward}</p>)}

          </div>}
          <hr />
          <div className="box">
            <p className="title is-3">Stats</p>
            <div className="columns has-text-centered">
              <li className="column is-6 has-text-centered"><p className="subtitle is-2"><HealthIcon value={`${boss.hp}/${boss.initHp}`} /></p></li>
              <li className="column is-6 has-text-centered"><p className="subtitle is-2"><ArmorIcon value={`${boss.armor}/${boss.initArmor}`} /></p></li>
            </div>
            <div className="columns">
              <li className="column is-4 has-text-centered"><p className="subtitle is-3"><PowerIcon value={`${boss.power}`} /></p></li>
              <li className="column is-4 has-text-centered"><p className="subtitle is-3"><ManaIcon value={`${boss.mana}/${boss.maxMana}`} /></p></li>
              <li className="column is-4 has-text-centered"><p className="subtitle is-3"><ManaRegenIcon value={`${boss.manaRegen}`} /></p></li>
              </div>
          </div>
          <br />
          <p className="title is-4">Boss Abilities:</p>
          <br />
          <ul>
            {boss.spells.map(spell => <div className="section box">
              <p className="title is-4" style={{textDecoration: 'underline'}}>{spell.name}</p>
              <div className="columns">
                <p className="subtitle column is-4">Cast: {spell.cast} s</p>
                <p className="subtitle column is-4">Cost: {spell.cost} mana</p>
                <p className="subtitle column is-4">CD: {spell.coolDown} s</p>
              </div>
              <p className="content subtitle is-5">{spell.description}</p>
            </div>)}
          </ul>
        </section>
        <footer className="modal-card-foot">
          <button onClick={() => this.changeModal(false, null)} className="button is-fullwidth is-large is-outlined is-info">Cancel</button>
          <button onClick={() => this.targetBoss(boss)} className={`button is-large ${colour == 'is-success' ? 'is-outlined' : ''} is-fullwidth ${colour}`} disabled={colour != 'is-success'}>
            {colour != 'is-success'
              ? colour == 'is-danger'
                ? `${boss.progress_required - defeatedBossCount} More Defeat${boss.progress_required - defeatedBossCount < 2 ? "": "s"}`
                : 'Already Defeated'
              : 'Set Target'
            }
          </button>
        </footer>
      </div>
    </div>
  }
  changeModal (showModal, boss) {
    this.setState({showModal, boss})
  }
  render() {
    const {bosses} = this.props.currentLocation
    const {showModal} = this.state
    const {boss, defeated, targetBoss} = this.props
    const defeatedBossCount = bosses.filter(boss => boss.isDefeated).length
    let colour = !boss.isDefeated ? defeatedBossCount >= boss.progress_required ? 'is-success' : 'is-danger' : 'is-dark'
    return <div>
      {showModal && this.renderBossModal()}
      <button onClick={() => this.changeModal(true, boss)} key={`location-boss-preview-${boss.id}`} className={`is-fullwidth button is-large is-outlined ${colour}`}>
        <span>
          {boss.name}&nbsp;
          <i className={`has-text-${colour} icon ra ra-fw
          ${targetBoss && targetBoss.name == boss.name
            ? 'ra-archery-target'
            : defeated
            ? 'ra-broken-skull'
            : defeatedBossCount >= boss.progress_required
            ? 'ra-skull'
            : 'ra-locked-fortress'}
            `} />
        </span>
      </button>
    </div>
  }
}

const mapStateToProps = ({location, boss}) => {
  return {
    currentLocation: location,
    targetBoss: boss
  }
}


export default connect(mapStateToProps)(BossPreview)
