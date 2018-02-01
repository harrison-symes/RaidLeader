import React, {Component} from 'react'
import {connect} from 'react-redux'

import randomName from '../../utils/randomName'

import {earnGold} from '../../actions/gold'
import {addRecruit} from '../../actions/recruits'
import {get, set} from '../../utils/localstorage'

import createClass from '../../utils/createClass'
import {classTraits, startingBuff} from '../../utils/classText'

class RecruitmentCentre extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showChoices: !!JSON.parse(get('offeredRecruits')),
      offeredRecruits: JSON.parse(get('offeredRecruits')) || [],
      selectedRecruit: null
    }
    this.showOptions = this.showOptions.bind(this)
  }
  solveOptions() {
    const classes = ['Paladin', 'Priest', 'Monk', 'Mage', 'Rogue', 'Warlock', 'Warrior']
    const offeredRecruits = []
    while (offeredRecruits.length < 3) {
      let heroClass = classes[Math.floor(Math.random() * classes.length)]
      if (!offeredRecruits.find(c => c.heroClass == heroClass)) offeredRecruits.push({name: randomName(), heroClass})
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
    this.setState({offeredRecruits: [], showChoices: null, selectedRecruit: null})
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
        <p className="subtitle is-5">{startingBuff(moreInfo.heroClass)}</p>
      </div>
      <hr />
      <div className="has-text-centered">
        <p className="title is-5">Class Traits:</p>
        <p className="subtitle is-5">{classTraits(moreInfo.heroClass)}</p>
      </div>
      <hr />
      <div className="title is-4">Stats</div>
      <hr />
      <div className="columns">
        <div className="column is-4"><p className="subtitle is-4">Health: {moreInfo.hp}</p></div>
        <div className="column is-4"><p className="subtitle is-4">Power: {moreInfo.power}</p></div>
        <div className="column is-4"><p className="subtitle is-4">Speed: {moreInfo.speed}</p></div>
      </div>
      <hr />
      <button className="button is-fullwidth is-large is-success" onClick={() => this.recruit(recruit)}>Recruit {recruit.name} (-500 Gold)</button>
      <hr />
    </div>
  }
  render() {
    const {close, gold} = this.props
    const {offeredRecruits, showChoices, selectedRecruit} = this.state
    return <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title is-1">Recruitment Centre</p>
          <button onClick={close} className="delete" aria-label="close"></button>
        </header>
        <section className="modal-card-body">
          <p className="title is-1">Welcome to the Recruitment Centre!</p>
          <p className="subtitle is-3">Here you can recruit new members to join your party in Dungeons</p>
          <p className="subtitle is-3">It costs 500 Gold to recruit a new Level 1 member</p>
          {showChoices
            ? <div>
              <p className="title is-3">Choose a Recruit:</p>
              <hr />
              {offeredRecruits.map((recruit, i) => <div>
                <div key={`offered-recruit-${i}`} className="level">
                  <p className="title is-4">{recruit.name} the {recruit.heroClass}</p>
                  {selectedRecruit != recruit
                    ? <button onClick={() => this.selectRecruit(recruit)} className="button is-success">Show More</button>
                    : <button onClick={() => this.selectRecruit(null)} className="button is-warning">Show Less</button>
                  }
                </div>
                {selectedRecruit == recruit && this.showMore(recruit)}
              </div>)}
            </div>
            : (gold >= 500
              ? <button onClick={this.showOptions} className="button is-large is-fullwidth">Recruit now! (-500 Gold)</button>
              : <button className="is-danger is-large button is-fullwidth" disabled>Not Enough Gold</button>
            )
          }
        </section>
        <footer className="modal-card-foot">
          <button onClick={close} className="button is-large is-info is-outlined is-fullwidth">Leave</button>
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
