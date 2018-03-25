import React, {Component} from 'react'

import {ClassIcon, HealthIcon, PlayerIcon, PowerIcon} from './icons/StatIcons'
import RecruitHealthBar from './frames/RecruitHealthBar'
import HealthBar from './frames/HealthBar'
import ManaBar from './frames/ManaBar'

import { Line, Circle } from 'rc-progress';

export default class CombatTutorial extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hp: 10,
      initHp: 70,
      mana: 10,
      maxMana: 10,
      power: 20,
      manaRegen: 0,
      target: null,
      step: 1
    }
  }
  targetPaladin() {
    this.setState({target: this.props.paladinName})
  }
  targetPlayer() {
    this.setState({target: 'Player'})
  }
  renderTutorialMessage() {

  }
  renderHealthBar () {
    const {hp, initHp} = this.state
    const percent = hp/initHp * 100
    const colourClass = percent >= 25
      ? percent >= 50
        ? 'hsl(171, 100%, 41%)'
        : 'hsl(48, 100%, 67%)'
      : 'hsl(348, 100%, 61%)'
    return <div className="columns">
      <div className="column is-6" style={{heigth: '15px'}}>
        <Line percent={percent} strokeWidth={`10`} strokeColor={colourClass} strokeLinecap="square"  trailWidth={`10`}/>
      </div>
      <div className="column is-desktop-only">
        <p className="subtitle is-1">
          <HealthIcon value={`${Math.round(hp)} / ${Math.round(initHp)}`} />
        </p>
      </div>
    </div>
  }
  renderPaladin() {
    const {paladinName} = this.props
    const {hp, initHp, mana, power, manaRegen, target} = this.state

    return <div className={`column is-6 is-offset-3 button MemberFrame ${target == paladinName ? 'is-success' : ''}`} style={{height: '25vh'}} onClick={() => this.targetPaladin()}>
      <div className="columns has-text-centered">
        <div className="column is-6">
          <h1 className={`subtitle is-1`} style={{color: 'black'}}>
            {paladinName}
            <ClassIcon id={`Recruit-1`} heroClass={'Paladin'} />
          </h1>
        </div>
      </div>
      <br />
      {this.renderHealthBar()}
    </div>
  }
  renderPlayer() {
    const {mana, power, maxMana, manaRegen, target} = this.state
    const hp = 100
    const initHp = 100
    return <div className="section PlayerFrame">
      <div className="columns is-mobile">
        <div className="column is-4">
          <div
            style={{cursor: 'pointer', backgroundColor: target == 'Player' ? 'lightgreen' : 'white'}}
            className="PlayerBox box"
            onClick={() => this.targetPlayer()}>
            <div className="level">
              <p className="subtitle is-1"><PowerIcon value={Math.floor(power * 10) / 10} /></p>
              <p className="subtitle is-1"><PlayerIcon player={{name: 'Player'}} />&nbsp;&nbsp;&nbsp;</p>
            </div>
            <div className="columns is-mobile">
              <div className="column is-6">
                <HealthBar hp={hp} maxHP={initHp} />
              </div>
              <div className="column is-6">
                <ManaBar mana={mana} maxMana={maxMana} />
              </div>
            </div>
          </div>
        </div>
        <div className="column is-8">
            {/* <PlayerSpellBar spells={spells}/> */}
        </div>
      </div>
    </div>
  }
  render() {
    const {paladinName} = this.props
    const {hp, initHp, mana, power, manaRegen, target} = this.state
    return <div>
      {this.renderTutorialMessage()}
      {this.renderPaladin()}
      {this.renderPlayer()}
    </div>
  }
}
