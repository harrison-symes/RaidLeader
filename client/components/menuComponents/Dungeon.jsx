import React from 'react'
import {connect} from 'react-redux'

import {WeaponIcon, GemIcon} from '../icons/StatIcons'

import jump from 'jump.js'

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
    // jump('#' + dungeon.name)
  }
  render() {
    const {dungeon, currentLocation, dungeons, selectDungeon, selected} = this.props
    let levelRestrict = !dungeon.requires_complete || !dungeons.find(other => other.name == dungeon.requires_complete).isCompleted
    if (!dungeon.requires_complete) levelRestrict = false
    const background = MenuBackground(dungeon.name)
    console.log({currentLocation});
    return <div className="box has-text-centered" id={dungeon.name} style={{backgroundColor: background.colour, backgroundImage: `url(${background.background})`}}>
      <div onClick={()=>this.clickDungeon()} style={{cursor: 'pointer'}} className="level">
        <p style={{textDecoration: 'none'}} className="title is-2 box"><i className={`ra ra-fw ${background.icon}`}/>&nbsp; {dungeon.name} &nbsp; </p>
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
      {selected == dungeon && !levelRestrict && <div>
        <div className="box">
          <p className="title is-2">Dungeon Level {dungeon.level}</p>
          <hr />
          <p className="subtitle is-3">You May Bring:</p>
          <div className="level">
            <div className="column is-6"><p className="subtitle is-3">{dungeon.max_party} Recruit{dungeon.max_party == 1 ? '':'s'}</p></div>
            <div className="column is-6"><p className="subtitle is-3">{dungeon.max_spells} Spell{dungeon.max_spells == 1 ? '':'s'}</p></div>
          </div>
        </div>
        <div className="box">
          <p className="title is-3">Rewards:</p>
          <span className="content is-large">{Math.floor(dungeon.gemChance * 100)}% chance of a <GemIcon /> per Boss.</span>
          <br />
          <span className="content">(Chance is reduced for every Recruit that is above level {dungeon.level})</span>
          <hr />
          <span className="title is-4">Weapons:</span>
          <br />
          <div className="columns has-text-centered">
            {dungeon.rewards.map(reward => <p className="column subtitle is-3"><WeaponIcon name={reward.name} /></p>)}
          </div>
        </div>
        <p className="subtitle is-4 box">{dungeon.description || 'Mock description goes here'}</p>
        <hr />
        <div className="box" >
          <p className="title is-3">Dungeon Bosses:</p>
          {dungeon.bosses.map((boss, i) => <div className="has-text-centered" key={`dungeon-row-${i}`}>
            <p className="subtitle is-3">{boss.name} <i className={`ra ra-fw ${boss.icon}`} /></p>
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
