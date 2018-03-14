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
    this.state = {
      selectedSpell: null,
      filterType: 'All'
    }
    this.onDragEnd = this.onDragEnd.bind(this);
    this.viewSpell = this.viewSpell.bind(this);
    this.back = this.back.bind(this);
  }
  selectType(filterType) {
    this.setState({filterType})
  }
  back() {
    this.setState({selectedSpell: null})
  }
  viewSpell(spell) {
    this.setState({selectedSpell: spell})
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
  renderContent() {
    const {spellBook, playerSpells, currentLocation} = this.props
    const available = spellBook.filter(spell => !playerSpells.find(bar => spell == bar))
    const isFull = playerSpells.length >= currentLocation.max_spells
    return <div className="has-text-centered">
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div className="columns is-mobile Drag-And-Drop">
          <span style={{width: '100%'}} className="has-text-centered">
            <h1 className="title is-3 DnD-Title">Spellbook</h1>
            {available.length >= 5 && <select onChange={e=>this.selectType(e.target.value)} className="select is-large is-fullwidth">
              <option value="All">All Types</option>
              {Object.keys(available.reduce((obj, s) => {
                obj[s.element] = s
                return obj
              },{})).map(type => <option value={type}>{type} Spells ({available.filter(s => s.element == type).length})</option>)}
            </select>}
            <br />
            <Droppable droppableId="spellBook">
              {(provided, snapshot) => (
                <div
                  className="Drop-Region"
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver, false)}
                  >
                  {available.filter(s => this.state.filterType =='All' || s.element == this.state.filterType).map(spell => (
                    <Draggable key={spell.id} draggableId={spell.id}>
                      {(provided, snapshot) => (
                        <div>
                          <table className="table has-text-centered is-fullwidth"
                          ref={provided.innerRef}
                          style={getItemStyle(
                            provided.draggableStyle,
                            snapshot.isDragging
                          )}
                          {...provided.dragHandleProps}
                          >
                            <SpellFrame
                            viewSpell={this.viewSpell}
                            addSpell={this.moveToBar.bind(this)}
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
                            viewSpell={this.viewSpell}
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
  render() {
    if (this.state.selectedSpell) return <SpellFrame showMore={true} spell={this.state.selectedSpell} back={this.back} />
    return <div className={`Modal modal is-active`} >
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Pick Your Spells</p>
          <button onClick={this.props.close} className="delete" aria-label="close"></button>
        </header>
        <section className="modal-card-body">
          {this.renderContent()}
        </section>
        <footer className="modal-card-foot">
          <button onClick={this.props.close} className="button is-large is-info is-outlined is-fullwidth">Back</button>
        </footer>
      </div>
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
