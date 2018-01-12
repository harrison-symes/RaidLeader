import React from 'react'
import {connect} from 'react-redux'

class BossSelection extends React.Component {
  constructor(props) {
    super(props)

  }
  render() {
    const {currentLocation} = this.props
    const {bosses} = currentLocation
    return <div className="has-text-centered">
      {currentLocation.bosses.map((boss, i) => {
        let colour = !boss.isDefeated ? (i > 0 && bosses[i-1].isDefeated) || i == 0 ? 'is-success' : 'is-danger' : 'is-dark'
        return <div>
          <button key={`location-boss-preview-${i}`} className={`is-fullwidth button is-large ${colour}`} disabled={colour != 'is-success'}>{boss.name}</button>
        </div>
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
