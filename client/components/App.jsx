import React from 'react'
import {HashRouter as Router, Route} from 'react-router-dom'

import Login from './Login'
import Register from './Register'
import Nav from './Nav'

const App = () => (
  <Router>
    <div className='app-container'>
      <h1>Hello World</h1>
      <Route path="/" component={Nav} />
      <Route path="/login" component={Login} />
      <Route path="/Register" component={Register} />
    </div>
  </Router>
)

export default App
