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
    return <div className="column is-4">
      <button onClick={this.toggleShow} className={`button is-large ${dungeon.isCompleted ? 'is-success' : 'is-warning'}`}>{dungeon.name} <p className="tag is-large">({dungeon.min_level})</p></button>
      {this.state.showMore && dungeon.bosses.map((boss, i) => <div className="tag is-large is-info">{boss.name}</div>)}
      {this.state.showMore && <button className="button is-primary">Travel Here</button>}
    </div>
  }
}

const Dungeons = ({dungeons}) => {
  return <div>
    <p className="subtitle is-1">Dungeons:</p>
    <div className="columns is-multiline">
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
