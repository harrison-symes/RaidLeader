import React, {Component} from 'react'

import {ClassIcon, HealthIcon, PlayerIcon, PowerIcon} from './icons/StatIcons'
import RecruitHealthBar from './frames/RecruitHealthBar'
import HealthBar from './frames/HealthBar'
import ManaBar from './frames/ManaBar'

import { Line, Circle } from 'rc-progress';
import {Tooltip} from 'react-tippy'

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
      step: 1,
      spellCast: 2.5,
      coolDown: 2,
      cost: 5,
      currentCast: 0,
      currentCooldown: 0,
      onCooldown: false,
      stepCompleted: false
    }
    this.castInterval = false
    this.cooldownInterval = false
  }
  toggleCompletion() {
    this.setState({stepCompleted: !this.state.stepCompleted})
  }
  completeStep(step) {
    this.setState({stepCompleted: true})
    setTimeout(() => this.setState({stepCompleted: false, step: this.state.step + 1}), 1000)
  }
  targetPaladin() {
    if (this.state.step == 1) this.completeStep(1)
    else if (this.state.step == 3) this.completeStep(3)
    this.setState({target: this.props.paladinName})
  }
  targetPlayer() {
    if (this.state.step == 2) this.completeStep(2)
    this.setState({target: 'Player'})
  }
  messageSwitch() {
    const {step, stepCompleted} = this.state
    switch(step) {
      case 1: return <p style={{color: stepCompleted ? 'lightgreen' : 'orange'}} className="message-content">Click on <b>{this.props.paladinName}</b> to <b>Target</b> them.  </p>
      case 2: return <p style={{color: stepCompleted ? 'lightgreen' : 'orange'}} className="message-content">Great! Now Click on the <b>Player Frame</b> on the <b>Bottom Left</b> to <b>Target</b> Yourself.</p>
      case 3: return <p style={{color: stepCompleted ? 'lightgreen' : 'orange'}} className="message-content">Now you understand <b>Targeting</b>. To cast a spell on a <b>Target</b> you MUST target them first!
        <br />
        Now <b>Target</b> {this.props.paladinName} once more!
      </p>
      case 4: return <p style={{color: stepCompleted ? 'lightgreen' : 'orange'}} className="message-content">This is {this.props.paladinName}'s <b>Health Bar</b>. as you can see, {this.props.paladinName} is <b>Damaged</b></p>
      case 5: return <p style={{color: stepCompleted ? 'lightgreen' : 'orange'}} className="message-content">Here you can see {this.props.paladinName}'s <b>Current Health</b> and <b>Maximum Health</b>. During a <b>Boss Fight</b>, {this.props.paladinName} will take damages, thus losing <b>Health</b></p>
      case 6: return <p style={{color: stepCompleted ? 'lightgreen' : 'orange'}} className="message-content">This here is your <b>Player Power</b>. This value increases the strength of your <b>Spells</b></p>
      case 7: return <p style={{color: stepCompleted ? 'lightgreen' : 'orange'}} className="message-content">This bar represents you <b>Player Health</b>. If this bar runs out, its <b>Game Over</b></p>
      case 8: return <p style={{color: stepCompleted ? 'lightgreen' : 'orange'}} className="message-content">This bar represents you <b>Player Mana</b>. Casting <b>Spells</b> Costs <b>Mana</b>. If you don't have enough Mana, you can't cast the <b>Spell</b>.</p>
      case 9: return <p style={{color: stepCompleted ? 'lightgreen' : 'orange'}} className="message-content">If you hover over this Icon, you can see more information about your <b>Player</b>. (Such as <b>Mana Regen</b>)</p>
    }
  }
  renderTutorialMessage() {
    const {step, stepCompleted} = this.state
    return <div className="message is-info is-large">
      {this.messageSwitch()}
      {(step != 1 ||
        step != 2 ||
        step != 3
      )
        && <button disabled={stepCompleted} onClick={() => this.completeStep(step)} className="button is-large is-info is-fullwidth is-outlined">Continue</button>
      }
    </div>
  }
  renderHealthBar () {
    const {hp, initHp, step} = this.state
    const percent = hp/initHp * 100
    const colourClass = percent >= 25
      ? percent >= 50
        ? 'hsl(171, 100%, 41%)'
        : 'hsl(48, 100%, 67%)'
      : 'hsl(348, 100%, 61%)'
    return <div className="columns">
      <div className="column is-6" style={{heigth: '15px'}}>
        <Tooltip
          animation="scale"
          arrow="true"
          position="bottom"
          intertia="true"
          theme="dark"
          open={step == 4}
          html={this.messageSwitch()}
          class="has-text-centered"
        >
          <Line percent={percent} strokeWidth={`10`} strokeColor={colourClass} strokeLinecap="square"  trailWidth={`10`}/>
        </Tooltip>
      </div>
      <div className="column is-desktop-only">
        <p className="subtitle is-1">
          <Tooltip
            animation="scale"
            arrow="true"
            position="bottom"
            intertia="true"
            theme="dark"
            open={step == 5}
            html={this.messageSwitch()}
            class="has-text-centered"
          >
            <HealthIcon value={`${Math.round(hp)} / ${Math.round(initHp)}`} />
          </Tooltip>
        </p>
      </div>
    </div>
  }
  renderPaladin() {
    const {paladinName} = this.props
    const {hp, initHp, mana, power, manaRegen, target, step} = this.state
    return <span class="has-text-centered">
      <Tooltip
        animation="scale"
        arrow="true"
        position="bottom"
        intertia="true"
        size="big"
        theme="dark"
        open={step == 1 || step == 3}
        html={this.messageSwitch()}
        class="has-text-centered"
      >
        <div className={`column is-6 is-offset-3 button MemberFrame ${target == paladinName ? 'is-success' : ''}`} style={{height: '25vh', borderColor: step == 1 ? 'red' : 'black'}} onClick={() => this.targetPaladin()}>
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
      </Tooltip>
    </span>
  }
  renderPlayerSpell() {
    const {mana, target, cost, spellCast, currentCD, currentCast, onCooldown, coolDown} = this.state

    const spellColour = onCooldown || mana < cost ? 'is-danger' : 'is-success'
    var cdPercentage = (coolDown - currentCD) / coolDown * 100
    var castPercentage = currentCast / spellCast * 100
    let perc = onCooldown ? cdPercentage : castPercentage
    var text = Math.round(perc * (onCooldown ? coolDown: spellCast) / 100)
    let width = 1000 / 1
    if (width > 200) width = 200
    return <div className="columns is-multiline is-mobile PlayerSpellBarContainer has-text-centered">
      <button
        className={`PlayerSpell ${spellColour}`}
        style={{position: 'relative', width, height: width}}
      >
        {(onCooldown || currentCast > 0)
        ? <span style={{position: 'relative', width, height: width}} className="CastProgress">
          <Progress
            type="circle"
            percent={Math.round(perc)}
            width={width * 0.9}
            symbolClassName={`ra ra-sword`}
            status={onCooldown ? 'danger' : 'casting'}
            strokeWidth={10}
            theme={{
              casting: {symbol: null, color: 'blue'},
              danger: {symbol: null, color: 'red'}
            }}
          />
        </span>
        : <i onClick={() => this.clickSpell()} style={{position: 'relative', color: 'green', backgroundColor:'white', width: '90%', height: '90%', margin: 'auto'}} className={`ra ra-5x ra-sword icon icon-large`}
        />}
      </button>
    </div>
  }
  renderPlayer() {
    const {mana, power, maxMana, manaRegen, target, step} = this.state
    const hp = 100
    const initHp = 100
    return <div className="section PlayerFrame">
      <div className="columns is-mobile">
        <div className="column is-4">
          <Tooltip
            animation="scale"
            arrow="true"
            position="top"
            intertia="true"
            size="big"
            theme="dark"
            open={step == 2}
            html={this.messageSwitch()}
            class="has-text-centered"
          >
            <div
              style={{cursor: 'pointer', backgroundColor: target == 'Player' ? 'lightgreen' : 'white', borderColor: step == 2 ? 'red' : 'black'}}
              className="PlayerBox box"
              onClick={() => this.targetPlayer()}>
              <div className="level">
                <p className="subtitle is-1">
                  <Tooltip
                    animation="scale"
                    arrow="true"
                    hideOnClick="true"
                    position="top"
                    intertia="true"
                    theme="dark"
                    open={step == 6}
                    html={this.messageSwitch()}
                    class="has-text-centered"
                  >
                    <PowerIcon value={Math.floor(power * 10) / 10} />
                  </Tooltip>
                </p>
                <Tooltip
                  animation="scale"
                  arrow="true"
                  position="bottom"
                  intertia="true"
                  theme="dark"
                  open={step == 9}
                  html={this.messageSwitch()}
                  class="has-text-centered"
                >
                  <p className="subtitle is-1"><PlayerIcon player={{name: 'Player', manaRegen, power}} />&nbsp;&nbsp;&nbsp;</p>
                </Tooltip>
              </div>
              <div className="columns is-mobile">
                <div className="column is-6">
                  <Tooltip
                    animation="scale"
                    arrow="true"
                    hideOnClick="true"
                    position="top"
                    intertia="true"
                    theme="dark"
                    open={step == 7}
                    html={this.messageSwitch()}
                    class="has-text-centered"
                  >
                    <HealthBar hp={hp} maxHP={initHp} />
                  </Tooltip>
                </div>
                <div className="column is-6">
                  <Tooltip
                    animation="scale"
                    arrow="true"
                    hideOnClick="true"
                    position="top"
                    intertia="true"
                    theme="dark"
                    open={step == 8}
                    html={this.messageSwitch()}
                    class="has-text-centered"
                  >
                    <ManaBar mana={mana} maxMana={maxMana} />
                  </Tooltip>
                </div>
              </div>
            </div>
          </Tooltip>
        </div>
        <div className="column is-8">
          {this.renderPlayerSpell()}
        </div>
      </div>
    </div>
  }
  render() {
    const {paladinName} = this.props
    const {hp, initHp, mana, power, manaRegen, target, stepCompleted} = this.state
    return <div>
      {this.renderPaladin()}
      {this.renderPlayer()}
      {this.renderTutorialMessage()}
    </div>
  }
}
