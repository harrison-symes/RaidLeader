import React, {Component} from 'react'
import {connect} from 'react-redux'

class BossFrame extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {boss} = this.props
    return <div>
      <h1>Boss</h1>
      <p>boss hp: {boss.hp}</p>
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
