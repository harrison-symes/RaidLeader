import React from 'react'
import {connect} from 'react-redux'

class Dungeon extends React.Component {
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
    const {dungeon} = this.props
    return <table className="table is-fullwidth is-hoverable has-text-centered" style={{marginBottom: '10%'}}>
      <tbody className="tbody">
        <td className="th is-left" style={{cursor: 'pointer'}}>
          <p className="subtitle is-1">{dungeon.name}</p>
        </td>
        <td className="th">
          <p className="subtitle is-1" style={{float: 'right'}}>Level {dungeon.min_level}</p>
        </td>
      </tbody>
      {this.state.showMore && dungeon.bosses.map((boss, i) => <div className="tag is-large is-info">{boss.name}</div>)}
      {this.state.showMore && <button className="button is-primary">Travel Here</button>}
    </table>
  }
}

const Dungeons = ({dungeons}) => {
  return <div>
    <p className="subtitle is-1">Dungeons:</p>
    <div className="has-text-centered" style={{overflowY: 'scroll', maxHeight: '70vh'}}>
      {dungeons.map((dungeon, i) => <Dungeon dungeon={dungeon} key={`dungeon-${i}`} />)}
    </div>
  </div>
}

const mapStateToProps = ({dungeons}) => {
  return {
    dungeons
  }
}

export default connect(mapStateToProps)(Dungeons)
