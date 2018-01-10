import React from 'react'
import {connect} from 'react-redux'
import {HashRouter as Router, Route, Link} from 'react-router-dom'

import Spellbook from './menuComponents/Spellbook'
import Party from './menuComponents/Party'
import Inventory from './menuComponents/Inventory'
import BossSelection from './menuComponents/BossSelection'

import RecruitFrame from './menuComponents/RecruitFrame'
import SpellFrame from './menuComponents/SpellFrame'

import {getRecruits} from '../actions/recruits'
import {getSpells} from '../actions/spells'

class Menu extends React.Component {
  constructor(props) {
    super(props)
    this.loadGame = this.loadGame.bind(this)
  }
  componentDidMount() {
    this.props.dispatch(getRecruits())
    this.props.dispatch(getSpells())
  }
  loadGame() {
    const {playerParty, playerSpells} = this.props
    this.props.dispatch({type: 'LOAD_GAME', playerParty, playerSpells})
  }
  renderMenuLink (path, display) {
    const {pathname} = this.props.location
    return <Link to={pathname == path ? '/' : path} className={`button is-large ${pathname == path ? 'is-success' : 'is-info is-outlined'}`}>{display}</Link>
  }
  render() {
    const {playerParty, playerSpells} = this.props
    console.log(this.props);
    return <div className="section has-text-centered">
      <div className="columns">
        <div className="column">
          <div className="level">
            {this.renderMenuLink('/spellbook', 'Spell Book')}
            {this.renderMenuLink('/party', 'Assemble Party')}
            {this.renderMenuLink('/selectboss', 'Select Boss')}
            <Link className="button is-large is-info" onClick={this.loadGame} to="/game">Start Game</Link>
          </div>
          <hr />
          <div className="has-text-centered">
            <p className="subtitle is-1">Your Party: ({playerParty.length}/3)</p>
            <div className="columns is-multiline">
              {playerParty.map((recruit, i) => <table key={`recruit-in-party-main-${i}`} className="column is-4 table box">
                <RecruitFrame recruit={recruit}  />
              </table>)}
            </div>
            <hr />
          </div>
          <div className="has-text-centered">
            <p className="subtitle is-1">Your Spells: ({playerSpells.length}/3)</p>
            <div className="columns is-multiline">
              {playerSpells.map((spell, i) => <table key={`spell-in-bar-main-${i}`} className="column is-4 table box">
                <SpellFrame spell={spell}  />
              </table>)}
            </div>
            <hr />
          </div>
        </div>
        {this.props.location.pathname != '/' && <div className="column">
          <Router>
            <div>
              <Route path="/spellbook" component={Spellbook} />
              <Route path="/party" component={Party} />
              <Route path="/selectboss" component={BossSelection} />
              <Route path="/inventory" component={Inventory} />
            </div>
          </Router>
        </div>}
      </div>
    </div>
  }
}

const mapStateToProps = ({playerParty, playerSpells}) => {
  return {
    playerParty,
    playerSpells
  }
}

export default connect(mapStateToProps)(Menu)
