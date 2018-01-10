import React from 'react'
import {connect} from 'react-redux'
import {HashRouter as Router, Route, Link} from 'react-router-dom'

import Spellbook from './menuComponents/Spellbook'
import Party from './menuComponents/Party'
import Inventory from './menuComponents/Inventory'
import BossSelection from './menuComponents/BossSelection'

import {getRecruits} from '../actions/recruits'

class Menu extends React.Component {
  componentDidMount() {
    this.props.dispatch(getRecruits())
  }
  render() {
    return <div className="section has-text-centered">
      <div className="columns">
        <div className="column is-6">
          <Link className="button is-large" to="/spellbook">Spell Book</Link>
          <Link className="button is-large" to="/party">Party</Link>
          <Link className="button is-large" to="/selectboss">Select Boss</Link>
          {/* <Link className="button is-large" to="/inventory">Inventory</Link> */}
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

export default connect()(Menu)
