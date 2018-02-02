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
    const {dungeon, location, dungeons} = this.props
    const atDungeon = location.name == dungeon.name
    if (atDungeon) return <p className="button is-primary is-large is-fullwidth">You are Here</p>
    else if (levelRestrict) return <p className="button is-danger is-large is-fullwidth" disabled>Complete "{dungeon.requires_complete}" to Unlock</p>
    else if (dungeon.isCompleted && !dungeon.is_repeatable) return <p className="button is-dark is-large is-fullwidth" disabled>Not Repeatable</p>
    else return <p className="button is-primary is-large is-outlined is-fullwidth" onClick={this.travelHere}><i className="icon ra ra-compass" />Travel Here<i className="icon ra ra-compass" /></p>
  }
  render() {
    const {dungeon, location, dungeons} = this.props
    let levelRestrict = !dungeon.requires_complete || !dungeons.find(other => other.name == dungeon.requires_complete).isCompleted
    if (!dungeon.requires_complete) levelRestrict = false
    return <div className="box has-text-centered">
      <div onClick={this.toggleShow} style={{cursor: 'pointer'}} className="level">
        <p  className="title is-2">{dungeon.name} </p>
        {dungeon.isCompleted
          ? <span className={`icon is-large has-text-${dungeon.is_repeatable ? 'success' : 'dark'}` }><i className="ra ra-3x ra-skull-trophy" /></span>
          : !levelRestrict
            ? <span className="icon is-large has-text-dark">
              <i className="ra ra-monster-skull ra-3x" />
            </span>
            : ""
        }
        {levelRestrict && <span className="icon is-large has-text-danger">
          <i className="ra ra-3x ra-locked-fortress" aria-hidden="true"></i>
        </span>}
        {this.state.showMore && <p className="delete" onClick={this.toggleShow} />}
      </div>
      {this.state.showMore && <div>
        <p className="subtitle is-4">{dungeon.description || 'Mock description goes here'}</p>
        <hr />
        <p className="title is-4">Dungeon Level: {dungeon.level}</p>
        <p className="title is-3">Dungeon Bosses:</p>
        {dungeon.bosses.map((boss, i) => <div className="has-text-centered" key={`dungeon-row-${i}`}>
          <p className="subtitle is-3">{i+1}: {boss.name}</p>
        </div>)}
        <hr />
      </div>}
      {this.state.showMore && this.travelButton(levelRestrict)}
    </div>
  }
}

const mapStateToProps = ({location, dungeons}) => {
  return {
    location,
    dungeons
  }
}

export default connect(mapStateToProps)(Dungeon)
