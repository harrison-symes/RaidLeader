import React from 'react'
import {connect} from 'react-redux'

import RecruitModal from './RecruitModal'
import {ClassIcon} from '../icons/StatIcons'

class RecruitFrame extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showMore: false
    }
    this.toggleShow = this.toggleShow.bind(this)
  }
  toggleShow() {
    this.setState({showMore: !this.state.showMore})
  }
  render() {
    const {recruit, playerParty, currentLocation, addRecruit, removeRecruit, inParty} = this.props
    const {showMore} = this.state
    return <tbody className="tbody box">
      <p className="subtitle is-4">
        {recruit.name}
        &nbsp;
        <ClassIcon heroClass={recruit.heroClass} />
        &nbsp; (Level {recruit.level})
      </p>
      {showMore && <RecruitModal recruit={recruit} close={this.toggleShow} />}
      <div className="level">
        {inParty && <button className="Table-Button button is-fullwidth" onClick={()=>removeRecruit(recruit)}>Remove</button>}
        {!showMore &&
          <button onClick={this.toggleShow} className="Table-Button  button is-fullwidth">Details</button>
        }
        {playerParty.length < currentLocation.max_party && !inParty && <button className="Table-Button button is-fullwidth" onClick={() => addRecruit(recruit)}>Add</button>}
      </div>
    </tbody>
  }
}

const mapStateToProps = ({playerParty, location}) => ({
  playerParty,
  currentLocation: location
})

export default connect(mapStateToProps)(RecruitFrame)
