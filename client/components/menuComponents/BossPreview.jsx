import React from 'react'
import {connect} from 'react-redux'

import weaponSwitch from '../../utils/weaponSwitch'
import {HealthIcon, ManaIcon, ManaRegenIcon, PowerIcon, ArmorIcon, WeaponIcon} from '../icons/StatIcons'

class BossPreview extends React.Component {
  targetBoss(boss) {
    this.props.close()
    this.props.dispatch({type: "TARGET_BOSS", boss})
  }
  renderBossModal () {
    const {boss, back} = this.props
    const {bosses} = this.props.currentLocation
    const defeatedBossCount = bosses.filter(boss => boss.isDefeated).length
    let colour = !boss.isDefeated ? defeatedBossCount >= boss.progress_required ? 'is-success' : 'is-danger' : 'is-dark'
    if (boss == this.props.targetBoss) colour='is-primary'
    const renderStat = (text) => <li className="column is-6 has-text-centered"><p className="subtitle is-4">{text}</p></li>
    console.log({boss});
    return <div className="Modal modal is-active">
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title title is-2">{boss.name}</p>
          <button onClick={back} className="delete" aria-label="close"></button>
        </header>
        <section className="modal-card-body">
          <p className="subtitle is-5">{boss.description}</p>
          <hr />
          <p className="title is-2">Rewards:</p>
          <p className="title is-4">{boss.goldReward} Gold</p>
          {boss.weaponRewards.length > 0 && <div className="columns is-multiline">
            {boss.weaponRewards.map((reward, i) => <span className="column is-3"><p className="subtitle is-3"><WeaponIcon name={reward} level={boss.level} /></p></span>)}
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
          <button onClick={back} className="button is-fullwidth is-large is-outlined is-info">Cancel</button>
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
  renderPreview() {
    const {bosses} = this.props.currentLocation
    const {boss, defeated, targetBoss, selectBoss} = this.props
    const defeatedBossCount = bosses.filter(boss => boss.isDefeated).length
    let colour = !boss.isDefeated ? defeatedBossCount >= boss.progress_required ? 'is-success' : 'is-danger' : 'is-dark'
    return <div>
      <button onClick={() => selectBoss(boss)} key={`location-boss-preview-${boss.id}`} className={`is-fullwidth button is-large is-outlined ${colour}`}>
        <span>
          {boss.name}&nbsp;
          <i className={`has-text-${colour} icon ra ra-fw
          ${targetBoss && targetBoss.name == boss.name
            ? 'ra-archery-target'
            : boss.isDefeated
              ? 'ra-broken-skull'
              : defeatedBossCount >= boss.progress_required
                ? 'ra-skull'
                : 'ra-locked-fortress'}
            `} />
        </span>
      </button>
    </div>
  }
  render() {
    const {showMore} = this.props
    return showMore
      ? this.renderBossModal()
      : this.renderPreview()
  }
}

const mapStateToProps = ({location, boss}) => {
  return {
    currentLocation: location,
    targetBoss: boss
  }
}


export default connect(mapStateToProps)(BossPreview)
