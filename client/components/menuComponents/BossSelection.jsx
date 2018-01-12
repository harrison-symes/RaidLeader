import React from 'react'
import {connect} from 'react-redux'

class BossSelection extends React.Component {
  constructor(props) {
    super(props)

  }
  render() {
    const {currentLocation} = this.props
    return <div className="has-text-centered">
      {currentLocation.bosses.map((boss, i) => {
        <div className="button is-danger is-large">{boss.name}</div>
      })}
    </div>
  }
}

const mapStateToProps = ({location}) => {
  return {
    currentLocation: location
  }
}


export default connect(mapStateToProps)(BossSelection)
