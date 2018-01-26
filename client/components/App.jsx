import React from 'react'
import {HashRouter as Router, Route, Switch} from 'react-router-dom'
import {connect} from 'react-redux'

import Home from './Home'
import Game from './Game'
import Menu from './Menu'

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
    const {auth} = this.props
    const {game} = this.state
    return <Router>
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
  }
}

const mapStateToProps = ({auth, started}) => {
  return {
    auth,
    started
  }
}

export default connect(mapStateToProps)(App)
