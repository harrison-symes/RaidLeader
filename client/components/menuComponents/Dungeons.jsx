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
      <thead className="thead">
        <td className="th is-left" style={{cursor: 'pointer'}}>
          <p onClick={this.toggleShow} className="subtitle is-1">{dungeon.name}</p>
        </td>
        <td className="th">
          <p className="subtitle is-1" style={{float: 'right'}}>Level {dungeon.min_level}</p>
        </td>
      </thead>
      <tbody className="tbody">
        {this.state.showMore && dungeon.bosses.map((boss, i) => <tr className="tr is-large is-info">
          <td className="td">
            <p className="title is-3">Boss {i+1}:</p>
          </td>
          <td className="td">
            <p className="title is-3" style={{float: 'right'}}>{boss.name}</p>
          </td>
        </tr>)}
        <tfoot className="tfoot has-text-centered" >
          <tr className="tr has-text-centered">
            <td className="td">
              {this.state.showMore && <p className="button is-primary is-large">Travel Here</p>}
            </td>
          </tr>
        </tfoot>
      </tbody>
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
