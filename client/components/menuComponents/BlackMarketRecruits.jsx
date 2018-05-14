import React, {Component} from 'react'
import {connect} from 'react-redux'

class BlackMarketRecruits extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  render() {
    const {recruits, gold} = this.state

    return <div className="has-text-centered">
      <span className="title is-3">Sell Recruits</span>
    </div>
  }
}

const mapStateToProps = ({
  recruits,
  gold
}) => ({
  recruits,
  gold
})


export default connect(mapStateToProps)(BlackMarketRecruits)
