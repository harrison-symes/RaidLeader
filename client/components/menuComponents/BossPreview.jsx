import React from 'react'
import {connect} from 'react-redux'

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
          <p className="title is-3">Stats</p>
          <ul className="columns is-multiline">
            {renderStat(`Health: ${boss.hp} / ${boss.initHp}`)}
            {renderStat(`Mana: ${boss.mana} / ${boss.maxMana} ${boss.manaRegen != 0 ? `(1 per ${boss.manaRegen} s)` : ''}`)}
            {renderStat(`Power: ${boss.power}`)}
            {renderStat(`Armor: ${boss.armor} / ${boss.initArmor} ${boss.armorRegen != 0 ? `(1 per ${boss.armorRegen} s)` : ''}`)}
          </ul>
          <hr />
          <p className="title is-4">Boss Abilities:</p>
          <hr />
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
          <button onClick={() => this.targetBoss(boss)} className={`button is-large ${colour}`} disabled={colour != 'is-success'}>
            {colour != 'is-success'
              ? colour == 'is-danger'
                ? `Requires ${boss.progress_required - defeatedBossCount} More Boss Defeats`
                : 'Already Defeated'
              : 'Set Target'
            }
          </button>
          <button onClick={() => this.changeModal(false, null)} className="button is-large">Cancel</button>
        </footer>
      </div>
    </div>
  }
  changeModal (showModal, boss) {
    this.setState({showModal, boss})
  }
  componentDidMount() {
    // document.getElementById('bossModalID').addEventListener('keyPress', (e) => console.log("key pressed", e))
  }
  render() {
    const {bosses} = this.props.currentLocation
    const {showModal} = this.state
    const {boss} = this.props
    const defeatedBossCount = bosses.filter(boss => boss.isDefeated).length
    let colour = !boss.isDefeated ? defeatedBossCount >= boss.progress_required ? 'is-success' : 'is-danger' : 'is-dark'
    return <div>
      {showModal && this.renderBossModal()}
      <button onClick={() => this.changeModal(true, boss)} key={`location-boss-preview-${boss.id}`} className={`is-fullwidth button is-large ${colour}`}>{boss.name}</button>
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
