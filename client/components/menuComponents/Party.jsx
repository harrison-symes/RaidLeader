import React from 'react'
import {connect} from 'react-redux'
import RecruitFrame from './RecruitFrame'

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
const getListStyle = (isDraggingOver, isFull) => ({
  background: isDraggingOver ? isFull ? '#ff6666' : 'lightblue' : 'lightgrey',
  padding: grid,
  width: '50%',
  maxHeight: '80vh',
  overflow: 'scroll'
});

class Party extends React.Component {
  constructor(props) {
    super(props)
    this.onDragEnd = this.onDragEnd.bind(this);
  }
  moveToParty(recruit) {
    this.props.dispatch({type: 'ADD_RECRUIT_TO_PARTY', recruit})
  }
  onDragEnd(result) {
    const {source, destination} = result
    const recruit = this.props.recruits.find(recruit => recruit.id == result.draggableId)
    if (!source || !destination) return
    else if (source.droppableId == 'recruits' && destination.droppableId == 'party' && this.props.playerParty.length >= this.props.currentLocation.max_party) this.props.dispatch({type: 'REPLACE_RECRUIT_IN_PARTY', idx: destination.index, recruit})
    else if (source.droppableId == 'recruits' && destination.droppableId == 'party') this.props.dispatch({type: 'ADD_RECRUIT_TO_PARTY', recruit, idx: destination.index})
    else if (source.droppableId == 'party' && destination.droppableId == 'recruits') this.props.dispatch({type: 'REMOVE_RECRUIT_FROM_PARTY', recruit})
    else if (destination.droppableId == 'party') this.props.dispatch({type: 'SHIFT_PARTY_INDEX', recruit, idx: destination.index})
  }
  render() {
    const {recruits, playerParty, currentLocation} = this.props
    const roster = recruits.filter(recruit => !playerParty.find(party => recruit.id == party.id))
    const isFull = playerParty.length >= currentLocation.max_party
    return <div className="has-text-centered">
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div className="columns">
          <Droppable droppableId="recruits">
            {(provided, snapshot) => (
              <div
                className="Recruits"
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver, false)}
                >
                <h1 className="subtitle is-1">Recruits ({roster.length} / {recruits.length})</h1>
                <hr />
                {roster.map(recruit => (
                  <Draggable key={recruit.id} draggableId={recruit.id}>
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
                          <RecruitFrame key={`recruit-${recruit.id}`} recruit={recruit} />
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
                style={getListStyle(snapshot.isDraggingOver, isFull)}
                >
                <h1 className="subtitle is-1">Party ({playerParty.length} / {currentLocation.max_party})</h1>
                <hr />
                {playerParty.map(recruit => (
                  <Draggable key={recruit.id} draggableId={recruit.id}>
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
                          <RecruitFrame key={`recruit-${recruit.id}`} recruit={recruit} />
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

const mapStateToProps = ({recruits, playerParty, location}) => {
  return {
    recruits,
    playerParty,
    currentLocation: location
  }
}

export default connect(mapStateToProps)(Party)
