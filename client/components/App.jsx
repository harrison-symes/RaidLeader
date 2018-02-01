import React from 'react'
import {HashRouter as Router, Route, Switch} from 'react-router-dom'
import {connect} from 'react-redux'

import Home from './Home'
import Game from './Game'
import Menu from './Menu'
import Town from './menuComponents/Town'
import Welcome from './Welcome'

import {getRecruits} from '../actions/recruits'
import {getSpells} from '../actions/spells'
import {getDungeons} from '../actions/dungeons'
import {getPlayerGold} from '../actions/gold'
import {getWeapons} from '../actions/weapons'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      game: (props) => <Game {...props} />
    }
  }
  componentDidMount() {
    this.props.dispatch(getRecruits())
    this.props.dispatch(getSpells())
    this.props.dispatch(getDungeons())
    this.props.dispatch(getPlayerGold())
    this.props.dispatch(getWeapons())
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
