import React from 'react'
import {connect} from 'react-redux'
import RecruitFrame from './RecruitFrame'

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const grid = 8;
const getItemStyle = (draggableStyle, isDragging) => ({
  userSelect: 'none',
  // padding: '5%',
  width: '100%',
  marginTop: `10%`,
  margin: 'auto',
  background: isDragging ? 'lightgreen' : 'white',
  ...draggableStyle,
})

const getListStyle = (isDraggingOver, isFull) => ({
  background: isDraggingOver ? isFull ? '#ff6666' : 'lightblue' : '    inherit',
  padding: grid,
  width: '100%',
  height: '100%',
  cursor: isFull ? 'no-drop' : 'auto'
});

class Party extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedRecruit: null
    }
    this.onDragEnd = this.onDragEnd.bind(this);
    this.selectRecruit = this.selectRecruit.bind(this);
    this.back = this.back.bind(this);
  }
  selectRecruit(selectedRecruit) {
    this.setState({selectedRecruit})
  }
  back() {
    this.setState({selectedRecruit: null})
  }
  moveToParty(recruit) {
    this.props.dispatch({type: 'ADD_RECRUIT_TO_PARTY', recruit})
  }
  addToParty(recruit, idx) {
    this.props.dispatch({type: 'ADD_RECRUIT_TO_PARTY', recruit, idx: idx || this.props.playerParty.length})
  }
  removeFromParty(recruit) {
    this.props.dispatch({type: 'REMOVE_RECRUIT_FROM_PARTY', recruit})
  }
  onDragEnd(result) {
    const {source, destination} = result
    const recruit = this.props.recruits.find(recruit => recruit.id == result.draggableId)
    if (!source || !destination) return
    else if (source.droppableId == 'recruits' && destination.droppableId == 'party' && this.props.playerParty.length >= this.props.currentLocation.max_party) this.props.dispatch({type: 'REPLACE_RECRUIT_IN_PARTY', idx: destination.index, recruit})
    else if (source.droppableId == 'recruits' && destination.droppableId == 'party') this.addToParty(recruit, destination.index)
    else if (source.droppableId == 'party' && destination.droppableId == 'recruits') this.removeFromParty(recruit)
    else if (destination.droppableId == 'party') this.props.dispatch({type: 'SHIFT_PARTY_INDEX', recruit, idx: destination.index})
  }
  renderContent() {
    const {recruits, playerParty, currentLocation} = this.props
    const roster = recruits.filter(recruit => !playerParty.find(party => recruit.id == party.id))
    const isFull = playerParty.length >= currentLocation.max_party
    return <div className="has-text-centered">
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div className="columns is-mobile Drag-And-Drop">
          <span style={{width: '50%'}}>
            <h1 className="DnD-Title title is-3">Recruits</h1>
            <br />
            <Droppable droppableId="recruits">
            {(provided, snapshot) => (<div
              className="Drop-Region"
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver, false)}
              >
              {roster.map(recruit => (
                <Draggable key={recruit.id} draggableId={recruit.id}>
                  {(provided, snapshot) => (<div>
                    <table className="table has-text-centered"
                    ref={provided.innerRef}
                    style={getItemStyle(
                      provided.draggableStyle,
                      snapshot.isDragging
                    )}
                    {...provided.dragHandleProps}
                    >
                      <RecruitFrame
                      selectRecruit={this.selectRecruit}
                      addRecruit={this.addToParty.bind(this)}
                      inParty={false}
                      key={`recruit-${recruit.id}`}
                      recruit={recruit} />
                    </table>
                    {provided.placeholder}
                  </div>)}
                </Draggable>))}
                {provided.placeholder}
              </div>)}
            </Droppable>
          </span>
          <span style={{width: '50%'}} className="has-text-centered">
            <h1 className="DnD-Title title is-3">Party ({playerParty.length} / {currentLocation.max_party})</h1>
            <br />
            <Droppable droppableId="party">
              {(provided, snapshot) => (<div
              className="Drop-Region"
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver, isFull)}
              >
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
                      <RecruitFrame
                        selectRecruit={this.selectRecruit}
                      key={`recruit-${recruit.id}`}
                      removeRecruit={this.removeFromParty.bind(this)}
                      inParty={true}
                      recruit={recruit} />
                    </table>
                    {provided.placeholder}
                  </div>)}
                </Draggable>))}
                {provided.placeholder}
              </div>)}
            </Droppable>
          </span>
        </div>
      </DragDropContext>
    </div>
  }
  render() {
    const {selectedRecruit} = this.state
    return selectedRecruit
      ? <RecruitFrame showMore={true} recruit={selectedRecruit} back={this.back} />
      : <div className={`Modal modal is-active`} >
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Assemble Party</p>
          <button onClick={this.props.close} className="delete" aria-label="close"></button>
        </header>
        <section className="modal-card-body">
          {this.renderContent()}
        </section>
        <footer className="modal-card-foot">
          <button onClick={this.props.close} className="button is-large is-info is-outlined is-fullwidth">Cancel</button>
        </footer>
      </div>
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
