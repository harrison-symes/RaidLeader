import React from 'react'
import Login from './Login'
import Register from './Register'

import {ClassIcon} from './icons/StatIcons'

const classes = [
  'Paladin',
  'Warrior',
  'Rogue',
  'Mage',
  'Hunter',
  'Warlock',
  'Priest',
  'Monk',
  'Shaman',
  'Bard'
]

import {HashRouter as Router, Route, Link} from 'react-router-dom'

export default function Home (props) {
  return <Router>
    <div className="Town">
      <div className="Town-Banner has-text-centered">
        <Link to="/" className="title is-1">Raid Leader v0.3</Link>
      </div>
      <div className="Town-Buttons" >
        <div className="subtitle is-1 has-text-centered">
          {classes.map(heroClass => <ClassIcon heroClass={heroClass} />)}
        </div>
        <Route exact path='/' component={() => <div style={{marginTop: '10%'}}>
          <Link to="/login" className="column is-6 is-offset-3 button is-large is-fullwidth is-info is-outlined">Login</Link>
          <Link to="/register" className="column is-6 is-offset-3 button is-large is-fullwidth is-primary is-outlined">Register</Link>
          <Link to="/about" className="column is-6 is-offset-3 button is-large is-fullwidth is-warning is-outlined" disabled>About (WIP)</Link>
        </div>} />
        <Route path="/login" component={Login} />
        <Route path="/Register" component={Register} />
      </div>
    </div>
  </Router>
}
