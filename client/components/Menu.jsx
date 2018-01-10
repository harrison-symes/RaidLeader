import React from 'react'
import {connect} from 'react-redux'
import {HashRouter as Router, Route, Link} from 'react-router-dom'

import Spellbook from './menuComponents/Spellbook'
import Party from './menuComponents/Party'
import Inventory from './menuComponents/Inventory'
import BossSelection from './menuComponents/BossSelection'

import {getRecruits} from '../actions/recruits'

class Menu extends React.Component {
  constructor(props) {
    super(props)
    this.loadGame = this.loadGame.bind(this)
  }
  componentDidMount() {
    this.props.dispatch(getRecruits())
  }
  loadGame() {
    const {playerParty} = this.props
    this.props.dispatch({type: 'LOAD_GAME', playerParty})
  }
  render() {
    const {playerParty} = this.props
    return <div className="section has-text-centered">
      <div className="columns">
        <div className="column is-6">
          <div className="level">
            <Link className="button is-large" to="/spellbook">Spell Book</Link>
            <Link className="button is-large" to="/party">Party</Link>
            <Link className="button is-large" to="/selectboss">Select Boss</Link>
            <Link className="button is-large is-info" onClick={this.loadGame} to="/game">Start Game</Link>
          </div>
          <div className="has-text-centered">
            <p className="subtitle is-1">Your Party:</p>
            <div className="columns">
              {playerParty.map(({name, heroClass}, i) => <div key={`player-in-party-main-${i}`} className="tag is-info is-large">{name} the {heroClass}</div>)}
            </div>
          </div>
        </div>
        <div className="column is-6 box">
          <Router>
            <div>
              <Route path="/spellbook" component={Spellbook} />
              <Route path="/party" component={Party} />
              <Route path="/selectboss" component={BossSelection} />
              <Route path="/inventory" component={Inventory} />
            </div>
          </Router>
        </div>
      </div>
    </div>
  }
}

const mapStateToProps = ({playerParty}) => {
  return {
    playerParty
  }
}

export default connect(mapStateToProps)(Menu)
