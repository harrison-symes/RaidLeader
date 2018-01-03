import React, {Component} from 'react'
import {connect} from 'react-redux'

import HealthBar from './HealthBar'
import ManaBar from './ManaBar'

class PlayerFrame extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {player} = this.props
    const {initHp, hp, maxMana, mana} = player
    return <div className="section PlayerFrame">
      <div className="columns">
        <div className="column is-4">
          haha
        </div>
        <div className="column is-8">
          <h1>Player</h1>
        </div>
      </div>
      <div className="columns">
        <div className="column is-6">
          <HealthBar hp={hp} maxHP={initHp} />
        </div>
        <div className="column is-6">
          <ManaBar mana={mana} maxMana={maxMana} />
        </div>
      </div>
    </div>
  }
}

const mapStateToProps = ({player}) => {
  return {
    player
  }
}

const mapDispatchToProps = dispatch => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerFrame)
