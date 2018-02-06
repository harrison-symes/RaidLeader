import React from 'react'
import {connect} from 'react-redux'
import SpellFrame from './SpellFrame'

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const grid = 8;
const getItemStyle = (draggableStyle, isDragging) => ({
  userSelect: 'none',
  padding: '5%',
  width: '100%',
  marginTop: `10%`,
  margin: 'auto',
  background: isDragging ? 'lightgreen' : 'white',
  cursor: 'move',
  ...draggableStyle,
})

const getListStyle = (isDraggingOver, isFull) => ({
  background: isDraggingOver ? isFull ? '#ff6666' : 'lightblue' : 'inherit',
  padding: grid,
  width: '100%',
  height: '100%'
});

class SpellBook extends React.Component {
  constructor(props) {
    super(props)
    this.onDragEnd = this.onDragEnd.bind(this);
  }
  moveToBar(spell, index) {
    this.props.dispatch({type: 'ADD_SPELL_TO_BAR', spell, idx: index || this.props.playerSpells.length})
  }
  removeFromBar (spell) {
    this.props.dispatch({type: 'REMOVE_SPELL_FROM_BAR', spell})
  }
  onDragEnd(result) {
    const {source, destination} = result
    const spell = this.props.spellBook.find(spell => spell.id == result.draggableId)
    if (!source || !destination) return
    else if (source.droppableId == 'spellBook' && destination.droppableId == 'spellBar' && this.props.playerSpells.length >= this.props.currentLocation.max_spells) this.props.dispatch({type: 'REPLACE_SPELL_IN_BAR', idx: destination.index, spell})
    else if (source.droppableId == 'spellBook' && destination.droppableId == 'spellBar') this.moveToBar(spell, destination.index)
    else if (source.droppableId == 'spellBar' && destination.droppableId == 'spellBook') this.removeFromBar(spell)
    else if (destination.droppableId == 'spellBar') this.props.dispatch({type: 'SHIFT_SPELL_INDEX', spell, idx: destination.index})
  }
  render() {
    const {spellBook, playerSpells, currentLocation} = this.props
    const available = spellBook.filter(spell => !playerSpells.find(bar => spell == bar))
    const isFull = playerSpells.length >= currentLocation.max_spells
    return <div className="has-text-centered">
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div className="columns is-mobile Drag-And-Drop">
          <span style={{width: '100%'}} className="has-text-centered">
            <h1 className="title is-3 DnD-Title">Spellbook</h1>
            <br />
            <Droppable droppableId="spellBook">
              {(provided, snapshot) => (
                <div
                  className="Drop-Region"
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver, false)}
                  >
                  {available.map(spell => (
                    <Draggable key={spell.id} draggableId={spell.id}>
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
                            <SpellFrame addSpell={this.moveToBar.bind(this)}
                            onBar={false}
                            key={`spell-${spell.id}`}
                            spell={spell} />
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
          </span>
          <span style={{width: '100%'}} className="has-text-centered">
            <h1 className="title is-3 DnD-Title">Spell Bar ({playerSpells.length}/{currentLocation.max_spells})</h1>
            <br />
            <Droppable droppableId="spellBar">
              {(provided, snapshot) => (
                <div
                  className="SpellBar"
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver, isFull)}
                  >
                  {playerSpells.map(spell => (
                    <Draggable key={spell.id} draggableId={spell.id}>
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
                            <SpellFrame
                            removeSpell={this.removeFromBar.bind(this)}
                            onBar={true}
                            key={`spell-${spell.id}`}
                            spell={spell} />
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
          </span>
        </div>
      </DragDropContext>
    </div>
  }
}

const mapStateToProps = ({spellBook, playerSpells, location}) => {
  return {
    spellBook,
    playerSpells,
    currentLocation: location
  }
}

export default connect(mapStateToProps)(SpellBook)
