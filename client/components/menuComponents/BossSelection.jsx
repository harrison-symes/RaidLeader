import React from 'react'
import {connect} from 'react-redux'

class BossSelection extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
      boss: null
    }
  }
  renderBossModal () {
    const {boss} = this.state
    const {bosses} = this.props.currentLocation
    let i = bosses.findIndex(b => b == boss)
    let colour = !boss.isDefeated ? (i > 0 && this.props.currentLocation.bosses[i-1].isDefeated) || i == 0 ? 'is-success' : 'is-danger' : 'is-dark'
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
          <button className={`button is-large ${colour}`} disabled={colour != 'is-success'}>Set Target</button>
          <button onClick={() => this.changeModal(false, null)} className="button is-large">Cancel</button>
        </footer>
      </div>
    </div>
  }
  changeModal (showModal, boss) {
    this.setState({showModal, boss})
  }
  render() {
    const {bosses} = this.props.currentLocation
    const {boss, showModal} = this.state
    return <div className="has-text-centered">
      {showModal && this.renderBossModal()}
      {bosses.map((boss, i) => {
        let colour = !boss.isDefeated ? (i > 0 && bosses[i-1].isDefeated) || i == 0 ? 'is-success' : 'is-danger' : 'is-dark'
        return <div>
          <button onClick={() => this.changeModal(true, boss)} key={`location-boss-preview-${i}`} className={`is-fullwidth button is-large ${colour}`}>{boss.name}</button>
        </div>
      })}
    </div>
  }
}

const mapStateToProps = ({location}) => {
  return {
    currentLocation: location
  }
}


export default connect(mapStateToProps)(BossSelection)
