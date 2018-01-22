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
    this.onDragEnd = this.onDragEnd.bind(this);
  }
  moveToBar(weapon) {
    // this.props.dispatch({type: 'ADD_RECRUIT_TO_PARTY', recruit})
  }
  onDragEnd(result) {
    const {source, destination} = result
    const weapon = this.props.weapons.find(weapon => weapon.id == result.draggableId)
    // if (!source || !destination) return
    // else if (source.droppableId == 'spellBook' && destination.droppableId == 'spellBar' && this.props.playerSpells.length >= this.props.currentLocation.max_spells) this.props.dispatch({type: 'REPLACE_SPELL_IN_BAR', idx: destination.index, spell})
    // else if (source.droppableId == 'spellBook' && destination.droppableId == 'spellBar') this.props.dispatch({type: 'ADD_SPELL_TO_BAR', spell, idx: destination.index})
    // else if (source.droppableId == 'spellBar' && destination.droppableId == 'spellBook') this.props.dispatch({type: 'REMOVE_SPELL_FROM_BAR', spell})
    // else if (destination.droppableId == 'spellBar') this.props.dispatch({type: 'SHIFT_SPELL_INDEX', spell, idx: destination.index})
  }
  render() {
    const {weapons, playerWeapon, currentLocation} = this.props
    const available = weapons.filter(weapon => weapon.heroClass == "Player")
    const isFull = !!playerWeapon
    return <div className="has-text-centered">
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
                          <p>{weapon.name}</p>
                          {/* <SpellFrame key={`weapon-${weapon.id}`} weapon={weapon} /> */}
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
          <Droppable droppableId="weaponBar">
            {(provided, snapshot) => (
              <div
                className="SpellBar"
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver, isFull)}
                >
                <h1 className="subtitle is-2">Your Weapon ({playerWeapon ? '1' : '0'}/1)</h1>
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
                          {/* <SpellFrame key={`weapon-${weapon.id}`} weapon={weapon} /> */}
                          <p>{PlayerWeapon.name}</p>
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
