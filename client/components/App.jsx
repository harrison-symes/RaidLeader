import React from 'react'
import {HashRouter as Router, Route, Switch} from 'react-router-dom'
import {connect} from 'react-redux'

import Home from './Home'
import Game from './Game'
import Menu from './Menu2'
import Town from './menuComponents/Town'
import Welcome from './Welcome'
import WhatsNew from './WhatsNew'

import {getRecruits} from '../actions/recruits'
import {getSpells} from '../actions/spells'
import {getDungeons} from '../actions/dungeons'
import {getPlayerGold} from '../actions/gold'
import {getWeapons} from '../actions/weapons'
import {getExperience} from '../actions/experience'
import {getGems} from '../actions/gems'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      game: (props) => <Game {...props} />
    }
  }
  componentDidMount() {
    this.requestData(this.props)
  }
  requestData(props) {
    if (props.auth.isAuthenticated) {
      this.props.dispatch(getRecruits())
      this.props.dispatch(getSpells())
      this.props.dispatch(getDungeons())
      this.props.dispatch(getPlayerGold())
      this.props.dispatch(getWeapons())
      this.props.dispatch(getExperience())
      this.props.dispatch(getGems())
    } else props.dispatch({type: 'RECEIVE_RECRUITS', recruits: []})
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.started && !nextProps.started){
      this.setState({game: (props) => <Game {...props} />})
    }
    if (!this.props.auth.isAuthenticated && nextProps.auth.isAuthenticated) this.requestData(nextProps)
  }
  render() {
    const {auth, currentLocation, showWelcome} = this.props
    const {game} = this.state
    return <Router>
      <div className='app-container'>
        <Switch>
          <Route path="/new" component={WhatsNew} />
          {auth.isAuthenticated
            ? <Switch>
              <Route path="/game" component={Game} />
              {showWelcome
                ? <Route path='/' component={Welcome} />
                : currentLocation.name == 'Town'
                ? <Route exact path='/' component={Town} />
                : <Route path='/' component={Menu} />
              }
            </Switch>
            : <Home />
          }
        </Switch>
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
