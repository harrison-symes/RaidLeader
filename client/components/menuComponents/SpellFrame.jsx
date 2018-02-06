import React from 'react'
import {connect} from 'react-redux'
import {ManaIcon, CastTimeIcon, CoolDownIcon, TargetTypeIcon, SpellElementIcon, SpellIcon} from '../icons/StatIcons'

class SpellFrame extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showMore: false
    }
    this.toggleShow = this.toggleShow.bind(this)
  }
  toggleShow() {
    this.setState({showMore: !this.state.showMore})
  }
  render() {
    const {spell, removeSpell, addSpell, onBar, currentLocation, playerSpells} = this.props
    const {showMore} = this.state
    const modal = () => <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{spell.name}</p>
          <button onClick={this.toggleShow} className="delete" aria-label="close"></button>
        </header>
        <section className="modal-card-body has-text-centered">
          <br />
          <SpellIcon spell={spell} isLarge={true} />
          <p className="box subtitle is-2">{spell.description}</p>
          <div className="box">
            <div className="columns">
              <div className="column is-6">
                <p className="subtitle is-2"><TargetTypeIcon singleTarget={spell.singleTarget}/></p>
              </div>
              <div className="column is-6">
                <p className="subtitle is-2"><SpellElementIcon element={spell.element}/></p>
              </div>
            </div>
            <div className="columns">
              <div className="column is-4"><p className="subtitle is-3"><ManaIcon value={spell.cost} /></p></div>
              <div className="column is-4"><p className="subtitle is-3"><CastTimeIcon value={spell.cast + 's'} /></p></div>
              <div className="column is-4"><p className="subtitle is-3"><CoolDownIcon value={spell.coolDown + 's'} /></p></div>
            </div>

          </div>
        </section>
        <footer className="modal-card-foot">
          <button onClick={this.toggleShow} className="button is-large is-fullwidth">Close</button>
        </footer>
      </div>
    </div>
    return <tbody className="tbody box">
      <p className="subtitle is-4">
        {/* {spell.name} */}
        &nbsp; <SpellIcon spell={spell} isLarge={true}/>
      </p>
      <div className="level">
        {onBar && <button className="Table-Button button is-fullwidth" onClick={()=>removeSpell(spell)}>Remove</button>}
        <button onClick={this.toggleShow} className="Table-Button is-fullwidth button">Details</button>
        {!onBar && playerSpells.length < currentLocation.max_spells && <button className="Table-Button button is-fullwidth" onClick={()=>addSpell(spell)}>Add</button>}
      </div>
      {showMore && modal()}
    </tbody>
  }
}

const mapStateToProps = ({playerSpells, location}) => ({
  playerSpells,
  currentLocation: location
})

export default connect(mapStateToProps)(SpellFrame)
