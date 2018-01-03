import React, {Component} from 'react'
import {connect} from 'react-redux'

class BossFrame extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <div>
      Boss
    </div>
  }
}

const mapStateToProps = state => {
  return {

  }
}

const mapDispatchToProps = dispatch => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BossFrame)
