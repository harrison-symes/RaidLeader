import React from 'react'
import {connect} from 'react-redux'

class Party extends React.Component {
  constructor(props) {
    super(props)

  }
  render() {
    return <div>
      Party Menu
    </div>
  }
}


export default connect()(Party)
