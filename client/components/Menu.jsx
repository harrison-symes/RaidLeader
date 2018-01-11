import React from 'react'
import {connect} from 'react-redux'
import {HashRouter as Router, Route, Link} from 'react-router-dom'

import Spellbook from './menuComponents/Spellbook'
import Party from './menuComponents/Party'
import Inventory from './menuComponents/Inventory'
import Dungeons from './menuComponents/Dungeons'

import RecruitFrame from './menuComponents/RecruitFrame'
import SpellFrame from './menuComponents/SpellFrame'

import {getRecruits} from '../actions/recruits'
import {getSpells} from '../actions/spells'
import {getDungeons} from '../actions/dungeons'

class Menu extends React.Component {
  constructor(props) {
    super(props)
    this.loadGame = this.loadGame.bind(this)
    this.goToTown = this.goToTown.bind(this)
  }
  componentDidMount() {
    this.props.dispatch(getRecruits())
    this.props.dispatch(getSpells())
    this.props.dispatch(getDungeons())
  }
  loadGame() {
    const {playerParty, playerSpells} = this.props
    this.props.dispatch({type: 'LOAD_GAME', playerParty, playerSpells})
  }
  renderStartGameButton () {
    const {playerParty, playerSpells} = this.props
    if (!playerParty.length == 0 && !playerSpells.length == 0) return <Link className="button is-large is-info" onClick={this.loadGame} to="/game">Start Game</Link>
    else return <Link disabled className="button is-large is-danger" to="/game">Start Game</Link>
  }
  renderMenuLink (path, display) {
    const {pathname} = this.props.location
    return <Link to={pathname == path ? '/' : path} className={`button is-large ${pathname == path ? 'is-success' : 'is-info is-outlined'}`}>{display}</Link>
  }
  goToTown() {
    this.props.dispatch({type: "TRAVEL_TO_TOWN"})
  }
  render() {
    const {playerParty, playerSpells, currentLocation} = this.props
    console.log(this.props);
    return <div className="section has-text-centered">
      <div className="level">
        <div className="level-left">
          {currentLocation.name != 'Town' && <button className="button is-info is-large is-outlined" onClick={this.goToTown}>Travel to Town</button>}
          {this.renderMenuLink('/dungeons', 'Dungeon Map')}
        </div>
        <div className="level-right">
          {currentLocation.name != 'Town'
            ? this.renderMenuLink('/party', 'Assemble Party')
            : <button className="button is-large is-info isoutlined" disabled>Assemble Party</button>
          }
          {currentLocation.name != 'Town'
            ? this.renderMenuLink('/spellbook', 'Spell Book')
            : <button className="button is-large is-info isoutlined" disabled>Choose Spells</button>
          }
          {this.renderStartGameButton()}
        </div>
      </div>
      <hr />
      <div className="columns" >
        <div className="column" style={{overflowY: 'scroll', maxHeight: '80vh'}}>
          <div className="has-text-centered">
            <p className="subtitle is-1">Your Party: ({playerParty.length}/3)</p>
            <div className="columns is-multiline" style={{overflowX:'scroll'}}>
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
          <div className="has-text-centered">
            <p className="subtitle is-1">Your Location: {currentLocation && currentLocation.name}</p>
            <hr />
          </div>
        </div>
        {this.props.location.pathname != '/' && <div className="column">
          <Router>
            <div>
              <Route path="/spellbook" component={Spellbook} />
              <Route path="/party" component={Party} />
              <Route path="/dungeons" component={Dungeons} />
              <Route path="/inventory" component={Inventory} />
            </div>
          </Router>
        </div>}
      </div>
    </div>
  }
}

const mapStateToProps = ({playerParty, playerSpells, location}) => {
  return {
    playerParty,
    playerSpells,
    currentLocation: location
  }
}

export default connect(mapStateToProps)(Menu)
