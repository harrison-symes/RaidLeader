import React, {Component} from 'react'
import {connect} from 'react-redux'

import createClass from '../../utils/createClass'
import {earnGold} from '../../actions/gold'
import {levelUpRecruit} from '../../actions/recruits'
import {classIcons} from '../../utils/classText'
import {PowerIcon, SpeedIcon, HealthIcon, GoldIcon, GemIcon} from '../icons/StatIcons'

class MageTower extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  render() {
    const {close, gems} = this.props
    return <div className="Modal modal is-active">
      <div className="modal-background"></div>
      <div className="modal-card Modal">
        <header className="modal-card-head">
          <span className="modal-card-title level">
            <p className=" is-pulled-left">Mage Tower</p>
            <p className=" is-pulled-right">
              <GemIcon value={gems} />
              &nbsp;
              <button onClick={close} className="delete" aria-label="close"></button>
            </p>
          </span>
        </header>
        <section className="modal-card-body">
          <div className="has-text-centered">
            <p className="title is-3">Welcome to the Mage Tower</p>
            <p className="content is-large">Here you can spend your Gems to empower your Player Character</p>
            <p className="content is-large">Choose Wisely, as you cannot refund your choices.</p>
          </div>
        </section>
        <footer className="modal-card-foot">
          <a onClick={close} className="button is-large is-dark is-outlined is-fullwidth">
            <span>Leave&nbsp;</span>
            <span className="icon is-large">
              <i className={`ra ra-bottom-right ra-lg` }></i>
            </span>
          </a>
        </footer>
      </div>
    </div>
  }
}

const mapStateToProps = ({gold, dungeons, recruits, gems}) => {
  return {
    dungeons,
    recruits,
    gold,
    gems
  }
}

export default connect(mapStateToProps)(MageTower)
