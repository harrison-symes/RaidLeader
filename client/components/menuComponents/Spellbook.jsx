import React from 'react'
import {connect} from 'react-redux'

class Spellbook extends React.Component {
  constructor(props) {
    super(props)

  }
  render() {
    return <div>
      Spell Book
    </div>
  }
}


export default connect()(Spellbook)
