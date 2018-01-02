import React from 'react'
import {HashRouter as Router, Route, Switch} from 'react-router-dom'
import {connect} from 'react-redux'

import Login from './Login'
import Register from './Register'
import Home from './Home'
import Nav from './Nav'

const App = ({auth}) => (
  <Router>
    <div className='app-container'>
      <h1>Hello World</h1>
      <Route path="/" component={Nav} />
      {auth.isAuthenticated
        ? <Switch>
          <Route path="/" component={Home} />
        </Switch>
        : <div>
          <Route path="/login" component={Login} />
          <Route path="/Register" component={Register} />
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
