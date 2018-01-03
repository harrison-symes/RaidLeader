import React, {Component} from 'react'
import {connect} from 'react-redux'

import HealthBar from './HealthBar'
import ManaBar from './ManaBar'

class BossFrame extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {boss} = this.props
    const {name, hp, initHp, mana, maxMana} = boss
    return <div className="section BossFrame">
      <div className="columns">
        <div className="column is-4 has-text-centered">
          <h1 className="title is-2">{name}</h1>

        </div>
        <div className="column is-4">
          <ManaBar mana={mana} maxMana={maxMana} />
        </div>
      </div>
      <HealthBar hp={hp} maxHP={initHp} />
    </div>
  }
}

const mapStateToProps = ({boss}) => {
  return {
    boss
  }
}

const mapDispatchToProps = dispatch => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BossFrame)
