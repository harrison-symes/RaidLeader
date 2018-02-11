import React, {Component} from 'react'
import {connect} from 'react-redux'

import randomName from '../../utils/randomName'

import {earnGold} from '../../actions/gold'
import {addRecruit} from '../../actions/recruits'
import {get, set} from '../../utils/localstorage'
import {PowerIcon, SpeedIcon, HealthIcon, GoldIcon, ClassIcon, ZodiacIcon} from '../icons/StatIcons'

import createClass from '../../utils/createClass'
import {classTraits, startingBuff, classIcons} from '../../utils/classText'
import {getZodiacs} from '../../utils/zodiacs'

class RecruitmentCentre extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showChoices: !!JSON.parse(get('offeredRecruits')),
      offeredRecruits: JSON.parse(get('offeredRecruits')) || [],
      selectedRecruit: null,
      recruited: null
    }
    this.showOptions = this.showOptions.bind(this)
  }
  solveOptions() {
    const zodiacs = getZodiacs()
    const classes = ['Paladin', 'Priest', 'Monk', 'Mage', 'Rogue', 'Warlock', 'Warrior', 'Hunter', 'Shaman']
    const offeredRecruits = []
    while (offeredRecruits.length < 3) {
      let heroClass = classes[Math.floor(Math.random() * classes.length)]
      let zodiac = zodiacs[Math.floor(Math.random() * zodiacs.length)]
      if (!offeredRecruits.find(c => c.heroClass == heroClass)) offeredRecruits.push({name: randomName(), heroClass, zodiac})
    }
    return offeredRecruits
  }
  showOptions() {
    this.props.dispatch(earnGold(-500))
    const offeredRecruits = this.solveOptions()
    set('offeredRecruits', JSON.stringify(offeredRecruits))
    this.setState({showChoices: true, offeredRecruits})
  }
  recruit(recruit) {
    this.props.dispatch(addRecruit(recruit))
    set('offeredRecruits', null)
    this.setState({offeredRecruits: [], showChoices: null, selectedRecruit: null, recruited: createClass(recruit)})
  }
  reset() {
    this.setState({offeredRecruits: [], showChoices: null, selectedRecruit: null, recruited: null})
  }
  selectRecruit(selectedRecruit) {
    this.setState({selectedRecruit})
  }
  showMore(recruit) {
    recruit.level = 1
    let moreInfo = createClass(recruit)
    return <div>
      <div className="has-text-centered">
        <p className="title is-5">Starting Buff</p>
        <p className="content is-large">{startingBuff(moreInfo.heroClass)}</p>
      </div>
      <br />
      <div className="has-text-centered">
        <p className="title is-5">Class Traits:</p>
        <p className="content is-large">{classTraits(moreInfo.heroClass)}</p>
      </div>
      <br />
      <div className="title is-4">Stats</div>
      <div className="columns">
        <div className="column is-4"><p className="subtitle is-4"><HealthIcon value={moreInfo.hp} /></p></div>
        <div className="column is-4"><p className="subtitle is-4"><PowerIcon value={moreInfo.power} /></p></div>
        <div className="column is-4"><p className="subtitle is-4"> <SpeedIcon value={moreInfo.speed} /></p></div>
      </div>
      <br />
      <button className="button is-fullwidth is-large is-success" onClick={() => this.recruit(recruit)}>Recruit "{recruit.name}"&nbsp;<i className={`icon ra ${classIcons(recruit.heroClass)} ra-fw`} /></button>
      <hr />
    </div>
  }
  render() {
    const {close, gold} = this.props
    const {offeredRecruits, showChoices, selectedRecruit, recruited} = this.state
    return <div className="Modal modal is-active">
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title is-1"><i className="icon ra ra-guarded-tower"/>&nbsp;Recruitment Centre&nbsp;<icon className="icon ra ra-guarded-tower ra-fw" /></p>
          <button onClick={close} className="delete" aria-label="close"></button>
        </header>
        <section className="modal-card-body">
          {recruited != null
            ? <div className="has-text-centered box">
              <div>
                <p className="title is-3">{recruited.name} the {recruited.heroClass}<ClassIcon heroClass={recruited.heroClass} /></p>
                <p className="subtitle is-1">Has joined your party!</p>
                <div className="columns">
                  <div className="column is-4"><span className="subtitle is-4"><HealthIcon value={recruited.hp} /></span></div>
                  <div className="column is-4"><span className="subtitle is-4"><PowerIcon value={recruited.power} /></span></div>
                  <div className="column is-4"><span className="subtitle is-4"> <SpeedIcon value={recruited.speed} /></span></div>
                </div>
              </div>
              <br />
              <a onClick={() => this.reset()} className="button is-large is-fullwidth is-info is-outlined">Recruit Another?</a>
            </div>
            : <div>
              <p className="title is-3">Welcome to the Recruitment Centre!</p>
              <p className="content is-large">Here you can recruit new members to join your party in Dungeons</p>
              <p className="content is-large">It costs <GoldIcon value={500} /> to recruit a new Level 1 member</p>
              {showChoices
                ? <div>
                  <hr />
                  <p className="title is-3">Choose a Recruit:</p>
                  <br />
                  {offeredRecruits.map((recruit, i) => {
                    recruit.level = 1
                    return <div key={`offered-recruit-${i}`} className="box">
                      <div className="level">
                        <span className="title is-3">{recruit.name} <ClassIcon heroClass={recruit.heroClass} /><ZodiacIcon zodiac={recruit.zodiac} /></span>
                        {selectedRecruit != recruit
                          ? <button onClick={() => this.selectRecruit(recruit)} className="button Info-Button is-success is-focused">Details</button>
                          : <button onClick={() => this.selectRecruit(null)} className="button Info-Button is-warning is-focused">Hide</button>
                        }
                      </div>
                      <hr />
                      {selectedRecruit != recruit && <div className="columns">
                        <div className="column is-4"><p className="subtitle is-4"><HealthIcon value={createClass(recruit).hp} /></p></div>
                        <div className="column is-4"><p className="subtitle is-4"><PowerIcon value={createClass(recruit).power} /></p></div>
                        <div className="column is-4"><p className="subtitle is-4"> <SpeedIcon value={createClass(recruit).speed} /></p></div>
                      </div>}
                      {selectedRecruit == recruit && this.showMore(recruit)}
                      <br />
                  </div>
                })}
                </div>
                : (gold >= 500
                  ? <button onClick={this.showOptions} className="button is-large is-fullwidth">Recruit now! (<GoldIcon value={`-500`} />)</button>
                  : <button className="is-danger is-large button is-fullwidth" disabled>Not Enough &nbsp;<GoldIcon /></button>
                )
              }

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

const mapStateToProps = ({gold}) => {
  return {
    gold
  }
}

export default connect(mapStateToProps)(RecruitmentCentre)
