import React, {Component} from 'react'
import {connect} from 'react-redux'

class BlackMarketRecruits extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  render() {
    return <div className="has-text-centered">
      <span className="title is-3">Sell Recruits</span>
    </div>
  }
}

const mapStateToProps = ({recruits}) => ({recruits})


export default connect(mapStateToProps)(BlackMarketRecruits)
