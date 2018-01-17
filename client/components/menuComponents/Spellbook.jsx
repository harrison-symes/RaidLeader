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

class SpellBook extends React.Component {
  constructor(props) {
    super(props)
    this.onDragEnd = this.onDragEnd.bind(this);
  }
  moveToBar(spell) {
    // this.props.dispatch({type: 'ADD_RECRUIT_TO_PARTY', recruit})
  }
  onDragEnd(result) {
    const {source, destination} = result
    const spell = this.props.spellBook.find(spell => spell.id == result.draggableId)
    if (!source || !destination) return
    else if (source.droppableId == 'spellBook' && destination.droppableId == 'spellBar' && this.props.playerSpells.length >= this.props.currentLocation.max_spells) this.props.dispatch({type: 'REPLACE_SPELL_IN_BAR', idx: destination.index, spell})
    else if (source.droppableId == 'spellBook' && destination.droppableId == 'spellBar') this.props.dispatch({type: 'ADD_SPELL_TO_BAR', spell, idx: destination.index})
    else if (source.droppableId == 'spellBar' && destination.droppableId == 'spellBook') this.props.dispatch({type: 'REMOVE_SPELL_FROM_BAR', spell})
    else if (destination.droppableId == 'spellBar') this.props.dispatch({type: 'SHIFT_SPELL_INDEX', spell, idx: destination.index})
  }
  render() {
    const {spellBook, playerSpells, currentLocation} = this.props
    const available = spellBook.filter(spell => !playerSpells.find(bar => spell == bar))
    const isFull = playerSpells.length >= currentLocation.max_spells
    return <div className="has-text-centered">
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div className="columns">
          <Droppable droppableId="spellBook">
            {(provided, snapshot) => (
              <div
                className="spellBook"
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver, false)}
                >
                <h1 className="subtitle is-2">Spellbook ({spellBook.length - playerSpells.length}/{spellBook.length})</h1>
                <hr />
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
                          <SpellFrame key={`spell-${spell.id}`} spell={spell} />
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
          <Droppable droppableId="spellBar">
            {(provided, snapshot) => (
              <div
                className="SpellBar"
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver, isFull)}
                >
                <h1 className="subtitle is-2">Spell Bar ({playerSpells.length}/{currentLocation.max_spells})</h1>
                <hr />
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
                          <SpellFrame key={`spell-${spell.id}`} spell={spell} />
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
