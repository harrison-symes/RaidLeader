import React from 'react'
import {connect} from 'react-redux'
// import RecruitFrame from './RecruitFrame'

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
});
const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  padding: grid,
  width: '50%',
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
    console.log({result});
    const {source, destination} = result
    const spell = this.props.spellbook.find(spell => spell.name == result.draggableId)
    // if (!source || !destination) return
    // else if (source.droppableId == 'recruits' && destination.droppableId == 'party') this.props.dispatch({type: 'ADD_RECRUIT_TO_PARTY', recruit, idx: destination.index})
    // else if (source.droppableId == 'party' && destination.droppableId == 'recruits') this.props.dispatch({type: 'REMOVE_RECRUIT_FROM_PARTY', recruit})
    // else if (destination.droppableId == 'party') this.props.dispatch({type: 'SHIFT_PARTY_INDEX', recruit, idx: destination.index})
  }
  render() {
    console.log(this.props);
    const {spellBook, playerSpells} = this.props
    const bar = spellBook.filter(spell => !playerSpells.find(bar => spell == bar))
    return <div className="has-text-centered">
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div className="columns">
          <Droppable droppableId="spellBook">
            {(provided, snapshot) => (
              <div
                className="Recruits"
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
                >
                <h1 className="subtitle is-1">Spellbook</h1>
                <hr />
                {spellBook.map(spell => (
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
                          {/* <SpellFrame key={`spell-${spell.id}`} recruit={recruit} /> */}
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
          <Droppable droppableId="party">
            {(provided, snapshot) => (
              <div
                className="Party"
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
                >
                <h1 className="subtitle is-1">Your Spells</h1>
                <hr />
                {bar.map(spell => (
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
                          {/* <SpellFrame key={`spell-${spell.id}`} recruit={recruit} /> */}
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

const mapStateToProps = ({spellBook, playerSpells}) => {
  return {
    spellBook,
    playerSpells
  }
}

export default connect(mapStateToProps)(SpellBook)
