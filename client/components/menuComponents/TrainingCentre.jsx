import React, {Component} from 'react'
import {connect} from 'react-redux'

class TrainingCentre extends Component {
  constructor(props) {
    super(props)
    this.state = {
      levelUpgrade: null
    }
  }
  renderLevelOption(requires, level) {
    const {dungeons} = this.props
    return dungeons.find(dungeon => dungeon.name == requires && dungeon.isCompleted)
      ? <option value={2}>Train Recruits to Level 2</option>
      : <option value={2} disabled>Complete "{requires}" to Unlock Level {level} Training</option>
  }
  renderLevelOptions() {
    const {levelUpgrade} = this.state
    return <select className="input is-large" name="levelUpgrade" value={levelUpgrade}>
      <option value={null}>Train to Which Level?</option>
      {this.renderLevelOption('The Cursed Wilds', 2)}
      {this.renderLevelOption('The Swamp', 3)}
      {this.renderLevelOption('The Armory', 4)}
      {this.renderLevelOption('The Foundry', 5)}
      {this.renderLevelOption('The Lair', 6)}
    </select>
  }
  render() {
    const {close} = this.props
    return <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title is-1">Training Centre</p>
          <button onClick={close} className="delete" aria-label="close"></button>
        </header>
        <section className="modal-card-body">
          {this.renderLevelOptions()}
        </section>
        <footer className="modal-card-foot">
          <button onClick={close} className="button is-large is-info is-outlined is-fullwidth">Leave</button>
        </footer>
      </div>
    </div>
  }
}

const mapStateToProps = ({dungeons}) => {
  return {
    dungeons
  }
}

export default connect(mapStateToProps)(TrainingCentre)
