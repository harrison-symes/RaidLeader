import React from 'react'
import {HashRouter as Router, Route, Switch} from 'react-router-dom'
import {connect} from 'react-redux'

import Login from './Login'
import Register from './Register'
import Home from './Home'
import Nav from './Nav'
import Game from './Game'
import Menu from './Menu'

const App = ({auth}) => (
  <Router>
    <div className='app-container'>
      {auth.isAuthenticated
        ? <Switch>
          <Route path="/game" component={Game} />
          <Route path='/' component={Menu} />
        </Switch>
        : <div>
          <Route path="/" component={Nav} />
          <Route path="/login" component={Login} />
          <Route path="/Register" component={Register} />
          <Route path="/" component={Home} />
        </div>
      }
    </div>
  </Router>
)

const mapStateToProps = ({auth}) => {
  return {
    auth
  }
}

export default connect(mapStateToProps)(App)
