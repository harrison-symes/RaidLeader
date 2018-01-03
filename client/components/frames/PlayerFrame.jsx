import React, {Component} from 'react'
import {connect} from 'react-redux'

class PlayerFrame extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <div>
      Player
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

export default connect(mapStateToProps, mapDispatchToProps)(PlayerFrame)
