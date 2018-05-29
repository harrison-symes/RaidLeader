import React from 'react'
import {connect} from 'react-redux'
import SpellFrame from './SpellFrame'

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

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
  padding: 8,
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
  }
  selectType = filterType => this.setState({
    filterType
  })

  back = () => this.setState({
    selectedSpell: null
  })

  viewSpell = selectedSpell => this.setState({
    selectedSpell
  })

  onDragEnd = ({draggableId, source, destination}) => {
    if (!source || !destination) return

    const spell = this.props.spellBook.find(spell => spell.id == draggableId)

    const dragTo = destination.droppableId == 'spellBar'
    const dragFrom = source.droppableId == 'spellBook'

    const {playerSpells, currentLocation} = this.props

    //move to bar (replace or add)
    if (dragFrom && dragTo) playerSpells.length >= currentLocation.max_spells
      ? this.props.replaceSpellInBar(spell, destination.index)
      : this.props.moveToBar(spell, destination.index)

    else if (!dragTo && !dragFrom) this.props.removeFromBar(spell)

    //rearrange within bar
    else if (dragTo && !dragFrom) this.props.shiftSpellIndex(spell, destination.index)
  }

  spellBarColumn = () => {
    const {spellBook, playerSpells, currentLocation} = this.props
    const isFull = playerSpells.length >= currentLocation.max_spells
    return <span style={{width: '100%'}} className="has-text-centered">
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
                      removeSpell={this.props.removeFromBar}
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
  }

  spellBookColumn = () => {
    const {spellBook, playerSpells, currentLocation} = this.props
    const available = spellBook.filter(spell => !playerSpells.find(bar => spell == bar))

    return <span style={{width: '100%'}} className="has-text-centered">
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
                      addSpell={this.props.moveToBar}
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
  }

  renderContent = () => {
    return <div className="has-text-centered">

      <DragDropContext onDragEnd={this.onDragEnd}>
        <div className="columns is-mobile Drag-And-Drop">
          {this.spellBookColumn()}
          {this.spellBarColumn()}
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


const isEarlier = (a, b, i) => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz '.split('')
  if (!a[i]) return true
  if (!b[i]) return false
  if (a[i] == b[i]) return isEarlier(a, b, i + 1)
  else {
    console.log(a[i], b[i], a, b, i);
    const aIdx = alphabet.findIndex(char => char == a[i].toLowerCase())
    const bIdx = alphabet.findIndex(char => char == b[i].toLowerCase())
    const diff = aIdx - bIdx
    return diff <= 0
  }
}

const alphabetSort = spells => {
  const newArr = []
  spells.forEach((spell, i) => {
    if (newArr.length == 0) newArr.push(spell)
    else {
      var found = newArr.find((item, idx) => {
        if (isEarlier(spell.name, item.name, 0)) {
          return newArr.splice(idx, 0, spell)
        }
      })
      if (!found) newArr.push(spell)
    }
  })
  return newArr
}

const elementAlphabetSort = spells => {
  let newArr = []
  const elements = ['Life', 'Fire', 'Shadow', 'Arcane']
  elements.forEach(element => {
    var arr = alphabetSort(spells.filter(spell => spell.element == element))
    newArr = newArr.concat(arr)
  })
  return newArr
}

const mapDispatchToProps = dispatch => ({
  moveToBar: (spell, idx) => dispatch({
    type: 'ADD_SPELL_TO_BAR',
    spell,
    idx
  }),
  removeFromBar: spell => dispatch({
    type: 'REMOVE_SPELL_FROM_BAR',
    spell
  }),
  replaceSpellInBar: (spell, idx) => dispatch({
    type: 'REPLACE_SPELL_IN_BAR',
    idx,
    spell
  }),
  shiftSpellIndex: (spell, idx) => dispatch({
    type: 'SHIFT_SPELL_INDEX',
    spell,
    idx
  })
})

const mapStateToProps = ({
  spellBook,
  playerSpells,
  location
}) => ({
  spellBook: elementAlphabetSort(spellBook),
  playerSpells,
  currentLocation: location
})

export default connect(mapStateToProps, mapDispatchToProps)(SpellBook)
