import React from 'react'
import {connect} from 'react-redux'

class Inventory extends React.Component {
  constructor(props) {
    super(props)

  }
  render() {
    return <div>
      Inventory
    </div>
  }
}


export default connect()(Inventory)
