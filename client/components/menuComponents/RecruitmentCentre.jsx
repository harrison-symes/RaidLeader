import React, {Component} from 'react'
import {connect} from 'react-redux'

import randomName from '../../utils/randomName'

import {earnGold} from '../../actions/gold'
import {addRecruit} from '../../actions/recruits'
import {get, set} from '../../utils/localstorage'

class RecruitmentCentre extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showChoices: !!JSON.parse(get('offeredRecruits')),
      offeredRecruits: JSON.parse(get('offeredRecruits')) || []
    }
    console.log(this.state);
    this.showOptions = this.showOptions.bind(this)
  }
  solveOptions() {
    const classes = ['Paladin', 'Priest', 'Monk', 'Mage', 'Rogue', 'Warlock', 'Warrior']
    const offeredRecruits = []
    while (offeredRecruits.length < 3) {
      let heroClass = classes[Math.floor(Math.random() * classes.length)]
      if (!offeredRecruits.find(c => c.heroClass == heroClass)) offeredRecruits.push({name: randomName(), heroClass})
    }
    console.log({offeredRecruits});
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
    this.setState({offeredRecruits: [], showChoices: null})
  }
  render() {
    const {close, gold} = this.props
    const {offeredRecruits, showChoices} = this.state
    return <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title is-1">Recruitment Centre</p>
          <button onClick={close} className="delete" aria-label="close"></button>
        </header>
        <section style={{backgroundColor: '#A9A9A9'}} className="modal-card-body">
          <p className="title is-1">Welcome to the Recruitment Centre!</p>
          <p className="subtitle is-3">Here you can recruit new members to join your party in Dungeons</p>
          <p className="subtitle is-3">It costs 500 Gold to recruit a new Level 1 member</p>
          {showChoices
            ? (<div>
              <p className="title is-3">Choose a Recruit:</p>
              <hr />
              {offeredRecruits.map((recruit, i) => <div key={`offered-recruit-${i}`} className="level">
                <p className="title is-4">{recruit.name} the {recruit.heroClass}</p>
                <button onClick={() => this.recruit(recruit)} className="button is-success">Choose</button>
              </div>)}
            </div>)
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
