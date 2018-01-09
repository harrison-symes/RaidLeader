import React from 'react'
import {connect} from 'react-redux'

class Party extends React.Component {
  constructor(props) {
    super(props)

  }
  moveToParty(recruit) {
    this.props.dispatch({type: 'ADD_RECRUIT_TO_PARTY', recruit})
  }
  render() {
    console.log(this.props);
    const {recruits, playerParty} = this.props
    return <div className="columns">
      <div className="column is-6">
        <h1 className="title is-2">Recruits</h1>
        {recruits.map((recruit, i) => {
          return <div onClick={() => this.moveToParty(recruit)} className="box is-large">{recruit.name}</div>
        })}
      </div>
      <div className="column is-6">
        <h1 className="title is-2">Party</h1>
        {playerParty.map((recruit, i) => {
          return <div className="tag is-large">{recruit.name}</div>
        })}
      </div>
    </div>
  }
}

const mapStateToProps = ({recruits, playerParty}) => {
  return {
    recruits,
    playerParty
  }
}

export default connect(mapStateToProps)(Party)
