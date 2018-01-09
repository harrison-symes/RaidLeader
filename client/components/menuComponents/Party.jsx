import React from 'react'
import {connect} from 'react-redux'

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const grid = 8;
const getItemStyle = (draggableStyle, isDragging) => ({
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px `,
  background: isDragging ? 'lightgreen' : 'grey',
  ...draggableStyle,
});
const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  padding: grid,
  width: 250,
  height: 250
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
    console.log({result});
    const {source, destination} = result
    const recruit = this.props.recruits.find(recruit => recruit.id == result.draggableId)
    if (source.droppableId == 'recruits' && destination.droppableId == 'party') this.props.dispatch({type: 'ADD_RECRUIT_TO_PARTY', recruit, idx: destination.index})
    else if (source.droppableId == 'party' && destination.droppableId == 'recruits') this.props.dispatch({type: 'REMOVE_RECRUIT_FROM_PARTY', recruit})
    else if (destination.droppableId == 'party') this.props.dispatch({type: 'SHIFT_PARTY_INDEX', recruit, idx: destination.index})
  }
  render() {
    console.log(this.props);
    const {recruits, playerParty} = this.props
    const roster = recruits.filter(recruit => !playerParty.find(party => recruit == party))
    return <div className="has-text-centered">
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div className="columns">
          <Droppable droppableId="recruits">
            {(provided, snapshot) => (
              <div
                className="Recruits"
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
                >
                {roster.map(item => (
                  <Draggable key={item.id} draggableId={item.id}>
                    {(provided, snapshot) => (
                      <div>
                        <div
                          ref={provided.innerRef}
                          style={getItemStyle(
                            provided.draggableStyle,
                            snapshot.isDragging
                          )}
                          {...provided.dragHandleProps}
                          >
                          {item.name}
                        </div>
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
                {playerParty.map(item => (
                  <Draggable key={item.id} draggableId={item.id}>
                    {(provided, snapshot) => (
                      <div>
                        <div
                          ref={provided.innerRef}
                          style={getItemStyle(
                            provided.draggableStyle,
                            snapshot.isDragging
                          )}
                          {...provided.dragHandleProps}
                          >
                          {item.name}
                        </div>
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

const mapStateToProps = ({recruits, playerParty}) => {
  return {
    recruits,
    playerParty
  }
}

export default connect(mapStateToProps)(Party)