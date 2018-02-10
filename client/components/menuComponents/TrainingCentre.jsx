import React, {Component} from 'react'
import {connect} from 'react-redux'

import createClass from '../../utils/createClass'
import {earnGold} from '../../actions/gold'
import {levelUpRecruit} from '../../actions/recruits'
import {classIcons} from '../../utils/classText'
import {PowerIcon, SpeedIcon, HealthIcon} from '../icons/StatIcons'

class TrainingCentre extends Component {
  constructor(props) {
    super(props)
    this.state = {
      levelUpgrade: 0
    }
    this.setLevel = this.setLevel.bind(this)
    this.renderRecruit = this.renderRecruit.bind(this)
  }
  setLevel(e) {
    this.setState({levelUpgrade: e.target.value || null})
  }
  upgradeRecruit(recruit) {
    this.props.dispatch(earnGold((recruit.level) * -500))
    this.props.dispatch(levelUpRecruit(recruit.level + 1, recruit.id))
  }
  renderLevelOption(requires, level) {
    const {dungeons} = this.props
    return dungeons.find(dungeon => dungeon.name == requires && dungeon.isCompleted)
      ? <option value={level}>
        <span className="content">Train Recruits to Level {level}</span>
      </option>
      : <option value={2} disabled className="content">
        Complete "{requires}" to Unlock Level {level} Training
      </option>

  }
  renderLevelOptions() {
    const {levelUpgrade} = this.state
    return <p className="select is-large is-rounded is-info is-focused">
      <select className="" name="levelUpgrade" value={levelUpgrade || null} onChange={this.setLevel}>
        <option value={0}>Train to Which Level?</option>
        {this.renderLevelOption('The Cursed Wilds', 2)}
        {this.renderLevelOption('The Swamp', 3)}
        {this.renderLevelOption('The Armory', 4)}
        {this.renderLevelOption('The Foundry', 5)}
        {this.renderLevelOption('The Lair', 6)}
      </select>
    </p>
  }
  renderRecruit(recruit, i) {
    const {gold} = this.props
    let nextLevel = {...recruit}
    nextLevel.level++
    nextLevel = createClass(nextLevel)
    const speedDiff = Math.round((nextLevel.speed - recruit.speed) * 10) / 10
    const powerDiff = Math.round(nextLevel.power - recruit.power)
    const healthDiff = Math.round(nextLevel.hp - recruit.hp)
    const cost = recruit.level * 500
    return <div key={`level-up-recruit-${recruit.name}-${i}`} className="box">
      <div className="subtitle is-3">{recruit.name} &nbsp;
        <span className="tooltip">
          <span className="tooltiptext">{recruit.heroClass}</span>
          <i className={`icon ra ra-fw ${classIcons(recruit.heroClass)}`} />
        </span>
      </div>
      <div className="columns">
        <div className="column is-4"><p className="subtitle is-4"><HealthIcon value={`${recruit.hp} ${healthDiff ? `(+${healthDiff})` : ""}`}/></p></div>
        <div className="column is-4"><p className="subtitle is-4"><PowerIcon value={`${recruit.power} ${powerDiff ? `(+${powerDiff})` : ""}`}/></p></div>
        <div className="column is-4"><p className="subtitle is-4"><SpeedIcon value={`${recruit.speed} ${speedDiff ? `(+${speedDiff})` : ""}`}/></p></div>
      </div>
      {gold >= cost
        ? <button onClick={() => this.upgradeRecruit(recruit)} className="button is-success is-outlined is-large">Upgrade to Level {this.state.levelUpgrade} (-{cost} Gold)</button>
        : <button disabled className="button is-danger is-large">Insufficient Funds (Costs {cost} Gold)</button>
      }
    </div>
  }
  renderRecruits() {
    const {levelUpgrade} = this.state
    const recruits = this.props.recruits.filter(recruit => recruit.level == levelUpgrade - 1)
    return <div>
      {recruits.length > 0
        ? recruits.map(this.renderRecruit)
        : <p className="title is-2">You have no Level {levelUpgrade - 1} Recruits</p>
      }
    </div>
  }
  render() {
    const {close} = this.props
    const {levelUpgrade} = this.state
    return <div className="Modal modal is-active">
      <div className="modal-background"></div>
      <div className="modal-card Modal">
        <header className="modal-card-head">
          <p className="modal-card-title is-1"><i className="icon ra ra-muscle-up ra-fw" />Training Centre<i className="icon ra ra-muscle-up ra-fw" /></p>
          <button onClick={close} className="delete" aria-label="close"></button>
        </header>
        <section className="modal-card-body">
          {this.renderLevelOptions()}
          <hr />
          {this.state.levelUpgrade != 0
            ? this.renderRecruits()
            : <div className="has-text-centered">
              <p className="title is-3">Welcome to the Training Centre</p>
              <p className="content is-large">Here you can spend your Gold to increase the Levels of your Recruits</p>
              <p className="content is-large">Higher Level Recruits have more Power and Health</p>
            </div>
          }
        </section>
        <footer className="modal-card-foot">
          <a onClick={close} className="button is-large is-dark is-outlined is-fullwidth">
            <span>Leave&nbsp;</span>
            <span className="icon is-large">
              <i className={`ra ra-bottom-right ra-2x` }></i>
            </span>
          </a>
        </footer>
      </div>
    </div>
  }
}

const mapStateToProps = ({dungeons, recruits, gold}) => {
  return {
    dungeons,
    recruits,
    gold
  }
}

export default connect(mapStateToProps)(TrainingCentre)
