import React, {Component} from 'react'
import {connect} from 'react-redux'

class BlackMarketWeapons extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  render() {
    return <div className="has-text-centered">
      <span className="title is-3">Sell Weapons</span>
    </div>
  }
}

const mapStateToProps = ({weapons}) => ({weapons})


export default connect(mapStateToProps)(BlackMarketWeapons)
