import React, {Component} from 'react'
import {connect} from 'react-redux'

class RecruitmentCentre extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  render() {
    const {close} = this.props
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
          <button className="button is-large is-fullwidth">Recruit now! (-500 Gold)</button>
        </section>
        <footer className="modal-card-foot">
          <button onClick={close} className="button is-large is-info is-outlined is-fullwidth">Leave</button>
        </footer>
      </div>
    </div>
  }
}

const mapStateToProps = (state) => {
  return {

  }
}

export default connect(mapStateToProps)(RecruitmentCentre)
