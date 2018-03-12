import React from 'react'
import Login from './Login'
import Register from './Register'

import {HashRouter as Router, Route, Link} from 'react-router-dom'

export default function Home (props) {
  return <div className="">
    <div className="hero is-fullheight is-bold is-light has-text-centered">
      <div className="hero-head has-text-centered">
      </div>
      <div className="hero-body has-text-centered">
        <Router>
          <div>
            <div className="container" style={{width: '50vw', marginLeft: '25vw'}}>
              <h1 className="title is-1">Welcome to Raid Leader v0.3</h1>
              <Route exact path='/' component={() => <div className=" has-text-centered" >
                <Link to="/login" className="button is-large is-fullwidth is-info">Login</Link>
                <Link to="/register" className="button is-large is-fullwidth is-primary">Register</Link>
              </div>} />
              <Route path="/login" component={Login} />
              <Route path="/Register" component={Register} />
            </div>
          </div>
        </Router>
      </div>
    </div>

  </div>
}
