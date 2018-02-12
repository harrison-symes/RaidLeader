import React, {Component} from 'react'
import {connect} from 'react-redux'

class BlackMarketSpells extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  render() {
    return <div className="has-text-centered">
      <span className="title is-3">Sell Spells</span>
    </div>
  }
}

const mapStateToProps = ({spells}) => ({spells})


export default connect(mapStateToProps)(BlackMarketSpells)
