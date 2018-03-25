import React, {Component} from 'react'
import {connect} from 'react-redux'

import randomName from '../utils/randomName'

import createClass from '../utils/createClass'
import {getStarted} from '../actions/welcome'
import {getZodiacs} from '../utils/zodiacs'

import CombatTutorial from './CombatTutorial'

class Welcome extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stage: 1,
      paladinName: randomName(),
      zodiac: getZodiacs()[Math.floor(Math.random() * getZodiacs().length)]
    }
    this.nextStage = this.nextStage.bind(this)
    this.getStarted = this.getStarted.bind(this)
  }
  nextStage () {
    this.setState({stage: this.state.stage + 1})
  }
  getStarted() {
    this.props.dispatch(getStarted({name: this.state.paladinName, heroClass: 'Paladin', zodiac: this.state.zodiac}))
  }
  stageOne() {
    return <div className="section has-text-centered">
      <div className="Town-Banner">
        <p className="title is-1">Welcome!</p>
      </div>
      <div className="box Town-Buttons">
        <div style={{color: 'black'}}>
          <div className="content is-large">You are about to begin your journey.</div>
          <div className="content is-large">I'm not gonna tell you how to play this thing, you can figure that out for yourself.</div>
          <div className="content is-large">I can however, get you started...</div>
          <button className="button is-large is-success is-outlined" onClick={this.nextStage}>Exciting!</button>
        </div>
      </div>
    </div>
  }
  stageTwo() {
    const {paladinName} = this.state
    return <div className="section has-text-centered">
      <div className="Town-Banner">
        <p className="subtitle is-1">Along the road you encounter <b>{paladinName}</b></p>
      </div>
      <div className="box Town-Buttons" style={{color: 'black'}}>
        <p className="content is-large"><b>{paladinName}</b> is a <b>Paladin</b>, a Devout Warrior of the light.</p>

        <p className="content is-large">Upon approaching them, they tell you of their encounter with a fearsome <b>Dragon</b>, and how they barely made it away</p>
        <p className="content is-large">On closer inspection, you can see that the Paladin is quite badly injured</p>
        <button className="button is-large is-success is-outlined" onClick={this.nextStage}>Help the Poor Soul</button>
      </div>
    </div>
  }
  stageThree() {
    const {paladinName} = this.state
    return <div className="section has-text-centered">
      <div className="Town-Banner">
        <p className="title is-1">"You look hurt! How can I help?"</p>
      </div>
      <div className="box Town-Buttons" style={{color: 'black'}}>
        <p className="content is-large"><b>{paladinName}</b> smiles. "Thank you kind soul"</p>
        <p className="content is-large">"I had a friend who would support me in my adventures, healing me of any injury. Unfortunately, they are currently being digested by that beastly creature"</p>
        <p className="content is-large">"I was however able to salvage his <b>Training Staff</b>, maybe you can harness the powers within to restore me!"</p>
        <button className="button is-large is-success is-outlined" onClick={this.nextStage}>Grab the Staff</button>
      </div>
    </div>
  }
  stageFour() {
    const {paladinName} = this.state
    return <div className="section has-text-centered">
      <div className="Town-Banner">
        <p className="title is-1">You take hold of the <b>Training Staff</b></p>
      </div>
      <div className="box Town-Buttons" style={{color: 'black'}}>
        <p className="content is-large">Upon holding the <b>Training Staff</b> you feel a soothing power surge through your soul.</p>
        <p className="content is-large">"I don't really know how it works, but maybe you can figure it out" <b>{paladinName}</b> says.</p>
        <button className="button is-large is-success is-outlined" onClick={this.nextStage}>Direct your power towards {paladinName}</button>
      </div>
    </div>
  }
  stageFive() {
    const {paladinName} = this.state
    return <div className="section has-text-centered">
      <div className="Town-Banner">
        <p className="title is-1">Heal {paladinName}</p>
      </div>
      <div className="box" style={{color: 'black'}}>
        <CombatTutorial paladinName={paladinName} />
      </div>
    </div>
  }
  // stageFive() {
  //   return <div className="section has-text-centered">
  //     <div className="Town-Banner">
  //       <p className="title is-1">You learned the spell "Heal"!</p>
  //     </div>
  //     <div className="box Town-Buttons" style={{color: 'black'}}>
  //       <p className="content is-large">...And that's all you need to get started!</p>
  //       <p className="content is-large">I will drop you off in "Town".</p>
  //       <p className="content is-large">From there, open up your "Dungeon Map" and Travel to "The Hunt" for your first encounter.</p>
  //       <p className="content is-large">Good Luck!</p>
  //       <button onClick={this.getStarted} className="button is-large is-success is-outlined">I'm sure I'll need it!</button>
  //     </div>
  //   </div>
  // }
  stageSwitch() {
    const {stage} = this.state
    switch (stage) {
      case 1: return this.stageOne()
      case 2: return this.stageTwo()
      case 3: return this.stageThree()
      case 4: return this.stageFour()
      case 5: return this.stageFive()
    }
  }
  render() {
    return <div className="Town">
      {this.stageSwitch()}
    </div>
  }
}

export default connect()(Welcome)
