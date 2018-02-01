import React from 'react'
import {HashRouter as Router, Route, Switch} from 'react-router-dom'
import {connect} from 'react-redux'

import Home from './Home'
import Game from './Game'
import Menu from './Menu'
import Town from './menuComponents/Town'
import Welcome from './Welcome'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      game: (props) => <Game {...props} />
    }
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.started && !nextProps.started){
      this.setState({game: (props) => <Game {...props} />})
    }
  }
  render() {
    const {auth, currentLocation, showWelcome} = this.props
    const {game} = this.state
    return <Router>
      <div className='app-container'>
        {auth.isAuthenticated
          ? <Switch>
            <Route path="/game" component={Game} />
            {showWelcome && <Route path='/' component={Welcome} />}
            {currentLocation.name == 'Town'
              ? <Route exact path='/' component={Town} />
              : <Route path='/' component={Menu} />
            }
          </Switch>
          : <Home />
        }
      </div>
    </Router>
  }
}

const mapStateToProps = ({auth, started, location, showWelcome}) => {
  return {
    auth,
    started,
    currentLocation: location,
    showWelcome
  }
}

export default connect(mapStateToProps)(App)
