import React from 'react'
import {connect} from 'react-redux'

class Dungeon extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showMore: false
    }
    this.toggleShow = this.toggleShow.bind(this)
    this.travelHere = this.travelHere.bind(this)
  }
  toggleShow() {
    this.setState({showMore: !this.state.showMore})
  }
  travelHere() {
    const {dungeon} = this.props
    this.props.dispatch({type: 'TRAVEL_TO_DUNGEON', dungeon})
  }
  travelButton (levelRestrict) {
    const {dungeon, location, partyLevel, dungeons} = this.props
    const atDungeon = location.name == dungeon.name
    if (atDungeon) return <p className="button is-primary is-large is-fullwidth">You are Here</p>
    else if (levelRestrict) return <p className="button is-danger is-outlined is-large is-fullwidth" disabled>Complete "{dungeon.requires_complete}" to Unlock</p>
    else if (dungeon.isCompleted && !dungeon.is_repeatable) return <p className="button is-dark is-outlined is-large is-fullwidth" disabled>Not Repeatable</p>
    else return <p className="button is-primary is-large is-fullwidth" onClick={this.travelHere}>Travel Here</p>
  }
  render() {
    const {dungeon, location, partyLevel, dungeons} = this.props
    let levelRestrict = !dungeon.requires_complete || !dungeons.find(other => other.name == dungeon.requires_complete).isCompleted
    if (!dungeon.requires_complete) levelRestrict = false
    return <table className="table is-fullwidth is-hoverable has-text-centered" style={{marginBottom: '10%'}}>
      <thead className="thead">
        <td className="th is-left" style={{cursor: 'pointer'}}>
          <p onClick={this.toggleShow} className="subtitle is-1">{dungeon.name}{dungeon.isCompleted ? "✔": ""}</p>
        </td>
        {levelRestrict && <td className="th">
          <span className="icon is-large has-text-danger">
            <i className="fa fa-3x fa-lock" aria-hidden="true"></i>
          </span>
        </td>}
        <td className="th">
          <p className="subtitle is-1" style={{float: 'right'}}>Level {dungeon.level}</p>
        </td>
      </thead>
      <tbody className="tbody">
        {this.state.showMore && dungeon.bosses.map((boss, i) => <tr className="tr is-large is-info" key={`dungeon-row-${i}`}>
          <td className="td">
            <p className="title is-3">Boss {i+1}:</p>
          </td>
          {levelRestrict&&<td></td>}
          <td className="td">
            <p className="title is-3" style={{float: 'right'}}>{boss.name}</p>
          </td>
        </tr>)}
      </tbody>
      <tfoot className="tfoot has-text-centered" >
        <tr className="tr has-text-centered">
          <td className="td">
            {this.state.showMore && this.travelButton(levelRestrict)}
          </td>
          {levelRestrict && [
            <td></td>,
            <td></td>
          ]}
        </tr>
      </tfoot>
    </table>
  }
}

const mapStateToProps = ({location, dungeons}) => {
  return {
    location,
    dungeons
  }
}

export default connect(mapStateToProps)(Dungeon)
