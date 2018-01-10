import React from 'react'
import {connect} from 'react-redux'

class Spellbook extends React.Component {
  constructor(props) {
    super(props)

  }
  render() {
    console.log(this.props);
    return <div>
      Spell Book
    </div>
  }
}

const mapStateToProps = ({playerSpells, spellBook}) => {
  return {
    playerSpells,
    spellBook
  }
}


export default connect(mapStateToProps)(Spellbook)
