import React, {Component} from 'react'
import {connect} from 'react-redux'

class PlayerFrame extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {player} = this.props
    console.log({player});
    return <div className="container">
      <h1>Player</h1>
      <h1>Hp: {player.hp}</h1>
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
