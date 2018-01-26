import React from 'react'
import {connect} from 'react-redux'
import SpellFrame from './SpellFrame'

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const grid = 8;
const getItemStyle = (draggableStyle, isDragging) => ({
  userSelect: 'none',
  padding: '5%',
  margin: `5%`,
  width: '90%',
  background: isDragging ? 'lightgreen' : 'white',
  cursor: 'pointer',
  ...draggableStyle,
})

const getListStyle = (isDraggingOver, isFull) => ({
  background: isDraggingOver ? isFull ? '#ff6666' : 'lightblue' : 'lightgrey',
  padding: grid,
  width: '50%',
  maxHeight: '80vh',
  overflow: 'scroll'
});

class PlayerWeapon extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      weapon: null
    }
    this.onDragEnd = this.onDragEnd.bind(this);
  }
  moveToBar(weapon) {
    // this.props.dispatch({type: 'ADD_RECRUIT_TO_PARTY', recruit})
  }
  onDragEnd(result) {
    const {source, destination} = result
    const weapon = this.props.weapons.find(weapon => weapon.id == result.draggableId)
    if (!source || !destination) return
    else if (source.droppableId == 'weapons' && destination.droppableId == 'playerWeapon') this.props.dispatch({type: 'EQUIP_PLAYER_WEAPON', weapon})
    else if (source.droppableId == 'playerWeapon' && destination.droppableId == 'weapons') this.props.dispatch({type: 'EQUIP_PLAYER_WEAPON', weapon: null})
  }
  viewWeapon(weapon) {
    this.setState({weapon})
  }
  WeaponModal() {
    const {weapon} = this.state
    return <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title is-1">{weapon.name}</p>
          <button onClick={() => this.viewWeapon(null)} className="delete" aria-label="close"></button>
        </header>
        <section className="modal-card-body">
          <p className="title is-1">{weapon.name} (Level {weapon.level})</p>
          <hr />
          <p className="subtitle is-5">{weapon.description}</p>
          <div className="columns is-multiline">
            <div className="column subtitle is-4">Health: {weapon.hp}</div>
            <div className="column subtitle is-4">Power: {weapon.power}</div>
            <div className="column subtitle is-4">Mana: {weapon.mana} ({weapon.manaRegen} p/s)</div>
          </div>
          {weapon.bonusEffect && <div className="subtitle is-3">{weapon.effectDescription}</div>}
        </section>
        <footer className="modal-card-foot">
          <button onClick={() => this.viewWeapon(null)} className="button is-large is-info is-outlined is-fullwidth">Close</button>
        </footer>
      </div>
    </div>
  }
  render() {
    const {weapons, playerWeapon, currentLocation} = this.props
    const available = weapons.filter(weapon => weapon.class == "Player" && (!playerWeapon || weapon.id != playerWeapon.id))
    const isFull = !!playerWeapon
    return <div className="has-text-centered">
      {this.state.weapon && this.WeaponModal()}
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div className="columns">
          <Droppable droppableId="weapons">
            {(provided, snapshot) => (
              <div
                className="weapons"
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver, false)}
                >
                <h1 className="subtitle is-2">Weapons ({available.length})</h1>
                <hr />
                {available.map(weapon => (
                  <Draggable key={weapon.id} draggableId={weapon.id}>
                    {(provided, snapshot) => (
                      <div>
                        <table className="table has-text-centered"
                          ref={provided.innerRef}
                          style={getItemStyle(
                            provided.draggableStyle,
                            snapshot.isDragging
                          )}
                          {...provided.dragHandleProps}
                          >
                          <p className="title is-4">{weapon.name} ({weapon.level})</p>
                          <button onClick={() => this.viewWeapon(weapon)} className="button">Show More</button>
                        </table>
                        {provided.placeholder}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
              )}
          </Droppable>
          <Droppable droppableId="playerWeapon">
            {(provided, snapshot) => (
              <div
                className="SpellBar"
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver, isFull)}
                >
                <h1 className="subtitle is-3">Equipped ({playerWeapon ? '1' : '0'}/1)</h1>
                <hr />
                  {playerWeapon && <Draggable key={playerWeapon.id} draggableId={playerWeapon.id}>
                    {(provided, snapshot) => (
                      <div>
                        <table
                          className="table has-text-centered"
                          ref={provided.innerRef}
                          style={getItemStyle(
                            provided.draggableStyle,
                            snapshot.isDragging
                          )}
                          {...provided.dragHandleProps}
                          >
                          <p className="title is-4">{playerWeapon.name} ({playerWeapon.level})</p>
                          <button onClick={() => this.viewWeapon(playerWeapon)} className="button">Show More</button>
                        </table>
                        {provided.placeholder}
                      </div>
                    )}
                  </Draggable>}
                {provided.placeholder}
              </div>
              )}
          </Droppable>
        </div>
      </DragDropContext>
    </div>
  }
}

const mapStateToProps = ({playerWeapon, location, weapons}) => {
  return {
    playerWeapon,
    currentLocation: location,
    weapons
  }
}

export default connect(mapStateToProps)(PlayerWeapon)
