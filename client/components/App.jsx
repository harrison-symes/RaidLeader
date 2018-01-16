import React from 'react'
import {HashRouter as Router, Route, Switch} from 'react-router-dom'
import {connect} from 'react-redux'

import Home from './Home'
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
          <Home />
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
