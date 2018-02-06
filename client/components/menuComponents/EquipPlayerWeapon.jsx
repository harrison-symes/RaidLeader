import React from 'react'
import {connect} from 'react-redux'
import SpellFrame from './SpellFrame'

import {HealthIcon, PowerIcon, ManaIcon, ManaRegenIcon} from '../icons/StatIcons'

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const grid = 8;

const getItemStyle = (draggableStyle, isDragging) => ({
  userSelect: 'none',
  padding: '5%',
  width: '100%',
  marginTop: `10%`,
  margin: 'auto',
  background: isDragging ? 'lightgreen' : 'white',
  cursor: 'pointer',
  ...draggableStyle,
})

const getListStyle = (isDraggingOver, isFull) => ({
  background: isDraggingOver ? isFull ? '#ff6666' : 'lightblue' : 'inherit',
  padding: grid,
  width: '100%',
  height: '100%'
});

class PlayerWeapon extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      weapon: null
    }
    this.onDragEnd = this.onDragEnd.bind(this);
  }
  addWeapon(weapon) {
    this.props.dispatch({type: 'EQUIP_PLAYER_WEAPON', weapon})
  }
  removeWeapon (weapon) {
    this.props.dispatch({type: 'EQUIP_PLAYER_WEAPON', weapon: null})
  }
  onDragEnd(result) {
    const {source, destination} = result
    const weapon = this.props.weapons.find(weapon => weapon.id == result.draggableId)
    if (!source || !destination) return
    else if (source.droppableId == 'weapons' && destination.droppableId == 'playerWeapon') this.addWeapon(weapon)
    else if (source.droppableId == 'playerWeapon' && destination.droppableId == 'weapons') this.removeWeapon(weapon)
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
            <div className="column subtitle is-3"><HealthIcon value={weapon.hp} /></div>
            <div className="column subtitle is-3"><PowerIcon value={weapon.power} /></div>
            <div className="column subtitle is-3"><ManaIcon value={weapon.mana} /></div>
            <div className="column subtitle is-3"><ManaRegenIcon value={weapon.manaRegen} /></div>
          </div>
          {weapon.bonusEffect && <div className="subtitle is-3">{weapon.effectDescription}</div>}
        </section>
        <footer className="modal-card-foot">
          <button onClick={() => this.viewWeapon(null)} className="button is-large is-info is-outlined is-fullwidth">Close</button>
        </footer>
      </div>
    </div>
  }
  renderContent() {
    const {weapons, playerWeapon, currentLocation} = this.props
    const available = weapons.filter(weapon => weapon.class == "Player" && (!playerWeapon || weapon.id != playerWeapon.id))
    const isFull = !!playerWeapon
    return <div className="has-text-centered">
      {this.state.weapon && this.WeaponModal()}
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div className="columns is-mobile Drag-And-Drop">
          <span className="column has-text-centered" style={{width: '50%'}}>
            <h1 className="DnD-Title title is-3">Weapons</h1>
            <br />
            <Droppable droppableId="weapons">
            {(provided, snapshot) => (
              <div
              className="weapons"
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver, false)}
              >
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
                    <tbody className="tbody box">
                      <p className="title is-4">{weapon.name} ({weapon.level})</p>
                      <span className="level">
                        <button onClick={() => this.viewWeapon(weapon)} className="Table-Button is-fullwidth button ">Details</button>
                        {!playerWeapon && <button onClick={() => this.addWeapon(weapon)} className="button is-fullwdith Table-Button">Equip</button>}
                      </span>
                    </tbody>
                  </table>
                  {provided.placeholder}
                </div>)}
              </Draggable>))}
              {provided.placeholder}
              </div>)}
            </Droppable>
          </span>
          <span className="has-text-centered" style={{width: '50%'}}>
            <h1 className="DnD-Title title is-3">Equipped ({playerWeapon ? '1' : '0'}/1)</h1>
            <br />
            <Droppable droppableId="playerWeapon">
              {(provided, snapshot) => (
                <div
                  className="SpellBar"
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver, isFull)}
                  >
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
                              <tbody className="tbody box">
                                <p className="title is-4">{playerWeapon.name} ({playerWeapon.level})</p>
                                <div className="level">
                                  <button onClick={() => this.removeWeapon(playerWeapon)} className="button is-fullwdith Table-Button">Remove</button>
                                  <button onClick={() => this.viewWeapon(playerWeapon)} className="Table-Button is-fullwidth button">Details</button>
                                </div>
                              </tbody>
                            </table>
                            {provided.placeholder}
                          </div>
                        )}
                      </Draggable>}
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
    return <div className={`Modal modal is-active`} >
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Choose Your Weapon</p>
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

const mapStateToProps = ({playerWeapon, location, weapons}) => {
  return {
    playerWeapon,
    currentLocation: location,
    weapons
  }
}

export default connect(mapStateToProps)(PlayerWeapon)
