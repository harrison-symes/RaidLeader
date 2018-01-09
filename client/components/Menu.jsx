import React from 'react'
import {connect} from 'react-redux'
import {HashRouter as Router, Route, Link} from 'react-router-dom'

import Spellbook from './menuComponents/Spellbook'
import Party from './menuComponents/Party'

class Menu extends React.Component {
  render() {
    return <div className="section has-text-centered">
      <div className="columns">
        <div className="column is-6">
          <Link className="button is-large" to="/spellbook">Spell Book</Link>
          <Link className="button is-large" to="/party">Party</Link>
        </div>
        <div className="column is-6">
          <Router>
            <div>
              <Route path="/spellbook" component={Spellbook} />
              <Route path="/party" component={Party} />
            </div>
          </Router>
        </div>
      </div>
    </div>
  }
}

export default connect()(Menu)
