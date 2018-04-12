import React from 'react'
import Login from './Login'
import Register from './Register'
import WhatsNew from './WhatsNew'

import {ClassIcon} from './icons/StatIcons'
import {connect} from 'react-redux'

const classes = [
  'Necromancer',
  'Beast Master',
  'Rogue',
  'Warrior',
  'Mage',
  'Priest',
  'Hunter',
  'Monk',
  'Shaman',
  'Bard',
  'Warlock',
  'Paladin',
]

import {HashRouter as Router, Route, Link} from 'react-router-dom'

function Home ({version}) {
  return <Router>
    <div className="Town">
      <div className="Town-Banner has-text-centered">
        <Link to="/" className="title is-1">Raid Leader v{version}!</Link>
      </div>
      <div className="Town-Buttons has-text-centered" >

        <Route exact path='/' component={() => <div>
          <div className="subtitle is-1 has-text-centered">
            {classes.map(heroClass => <ClassIcon heroClass={heroClass} />)}
          </div>
          <Link to='/new' className="subtitle has-text-info is-3">What's New?</Link>
          <hr />
          <Link to="/login" className="column is-6 is-offset-3 button is-large is-fullwidth is-info is-outlined">Login</Link>
          <Link to="/register" className="column is-6 is-offset-3 button is-large is-fullwidth is-primary is-outlined">Register</Link>
          <Link to="/" className="column is-6 is-offset-3 button is-large is-fullwidth is-warning is-outlined" disabled>About (WIP)</Link>
        </div>} />
        <Route path="/login" component={Login} />
        <Route path="/Register" component={Register} />
        {/* <Route path="/new" component={WhatsNew} /> */}
      </div>
    </div>
  </Router>
}

const mapStateToProps = ({version}) => ({version})

export default connect(mapStateToProps)(Home)
