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
  render() {
    const {dungeon, location} = this.props
    return <table className="table is-fullwidth is-hoverable has-text-centered" style={{marginBottom: '10%'}}>
      <thead className="thead">
        <td className="th is-left" style={{cursor: 'pointer'}}>
          <p onClick={this.toggleShow} className="subtitle is-1">{dungeon.name}</p>
        </td>
        <td className="th">
          <p className="subtitle is-1" style={{float: 'right'}}>Level {dungeon.min_level}</p>
        </td>
      </thead>
      <tbody className="tbody">
        {this.state.showMore && dungeon.bosses.map((boss, i) => <tr className="tr is-large is-info" key={`dungeon-row-${i}`}>
          <td className="td">
            <p className="title is-3">Boss {i+1}:</p>
          </td>
          <td className="td">
            <p className="title is-3" style={{float: 'right'}}>{boss.name}</p>
          </td>
        </tr>)}
      </tbody>
      <tfoot className="tfoot has-text-centered" >
        <tr className="tr has-text-centered">
          <td className="td">
            {this.state.showMore && location != dungeon && <p className="button is-primary is-large" onClick={this.travelHere}>Travel Here</p>}
          </td>
        </tr>
      </tfoot>
    </table>
  }
}

const mapStateToProps = ({location}) => {
  return {
    location
  }
}

export default connect(mapStateToProps)(Dungeon)
