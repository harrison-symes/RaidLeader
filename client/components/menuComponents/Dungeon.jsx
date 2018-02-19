import React from 'react'
import {connect} from 'react-redux'

import {MenuBackground} from '../../utils/dungeonInfo'

class Dungeon extends React.Component {
  constructor(props) {
    super(props)
    this.travelHere = this.travelHere.bind(this)
  }
  travelHere() {
    const {dungeon} = this.props
    this.props.dispatch({type: 'TRAVEL_TO_DUNGEON', dungeon})
  }
  travelButton (levelRestrict) {
    const {dungeon, currentLocation, dungeons, selectDungeon} = this.props
    if (levelRestrict) return <p className="button is-danger is-large is-fullwidth" disabled>Complete {dungeon.requires_complete}</p>
    else if (dungeon.isCompleted && !dungeon.is_repeatable) return <p className="button is-dark is-large is-fullwidth" disabled>Not Repeatable</p>
    else return <p className="button is-primary is-large is-outlined is-fullwidth" onClick={this.travelHere}><i className="icon ra ra-compass" />Travel Here<i className="icon ra ra-compass" /></p>
  }
  clickDungeon() {
    const {dungeon, currentLocation, dungeons, selectDungeon, selected} = this.props
    if (selected == dungeon) return this.props.selectDungeon(null)
    let allowed
    let levelRestrict = !dungeon.requires_complete || !dungeons.find(other => other.name == dungeon.requires_complete).isCompleted
    if (!dungeon.requires_complete) levelRestrict = false
    allowed = !levelRestrict && (!dungeon.isCompleted || dungeon.isCompleted && dungeon.is_repeatable)
    // if (!dungeon.requires_complete) this.props.selectDungeon(dungeon)
    // else if (dungeons.find(other => other.name == dungeon.requires_complete).isCompleted)
    this.props.selectDungeon(dungeon, allowed)
  }
  render() {
    const {dungeon, currentLocation, dungeons, selectDungeon, selected} = this.props
    let levelRestrict = !dungeon.requires_complete || !dungeons.find(other => other.name == dungeon.requires_complete).isCompleted
    if (!dungeon.requires_complete) levelRestrict = false
    const background = MenuBackground(dungeon.name)
    return <div className="box has-text-centered" style={{backgroundColor: background.colour, backgroundImage: `url(${background.background})`}}>
      <div onClick={()=>this.clickDungeon()} style={{cursor: 'pointer'}} className="level">
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
        {/* {selected == dungeon && <p className="delete" onClick={() => selectDungeon(null)} />} */}
      </div>
      {selected == dungeon && <div>
        <div className="box">
          <p className="title is-4">Dungeon Level: {dungeon.level}</p>
          <div className="level">
            <div className="column is-6"><p className="subtitle is-3">{dungeon.max_party} Recruit{dungeon.max_party == 1 ? '':'s'}</p></div>
            <div className="column is-6"><p className="subtitle is-3">{dungeon.max_spells} Spell{dungeon.max_spells == 1 ? '':'s'}</p></div>
          </div>
        </div>
        <p className="subtitle is-4 box">{dungeon.description || 'Mock description goes here'}</p>
        <hr />
        <div className="box" >
          <p className="title is-3">Dungeon Bosses:</p>
          {dungeon.bosses.map((boss, i) => <div className="has-text-centered" key={`dungeon-row-${i}`}>
            <p className="subtitle is-3">{i+1}: {boss.name}</p>
          </div>)}
        </div>
        <hr />
      </div>}
      {selected == dungeon && this.travelButton(levelRestrict)}
    </div>
  }
}

const mapStateToProps = ({location, dungeons}) => {
  return {
    currentLocation: location,
    dungeons
  }
}

export default connect(mapStateToProps)(Dungeon)
