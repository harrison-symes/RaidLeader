import React from 'react'
import {connect} from 'react-redux'
import {ManaIcon, CastTimeIcon, CoolDownIcon, TargetTypeIcon, SpellElementIcon, SpellIcon} from '../icons/StatIcons'

function SpellFrame ({spell, removeSpell, addSpell, onBar, currentLocation, playerSpells, viewSpell, back, showMore}) {

  const modal = () => (
    <div className="Modal modal is-active">
      <div className="modal-background"></div>
      <div className="modal-card">

        <header className="modal-card-head">
          <p className="modal-card-title">{spell.name}</p>
          <button onClick={back} className="delete" aria-label="close"></button>
        </header>

        <section className="modal-card-body has-text-centered">
          <br />
          <p className="box subtitle is-2">{spell.description}</p>
          <div className="box">
            <div className="columns">
              <div className="column is-4">
                <p className="subtitle is-2"><TargetTypeIcon singleTarget={spell.singleTarget}/></p>
              </div>
              <div className="column is-4">
                <SpellIcon spell={spell} isLarge={true} />
              </div>
              <div className="column is-4">
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
          <button onClick={back} className="button is-large is-fullwidth">Back to Spell Book</button>
        </footer>

      </div>
    </div>
  )

  return showMore
    ? modal()
    : <tbody className="tbody box">
      <tr className="has-text-centered">
        <td className="subtitle is-4 has-text-centered">
          &nbsp; <SpellIcon spell={spell} isLarge={true}/>
        </td>
      </tr>
      <tr>
        <td className="level">
          {onBar && <button className="Table-Button button is-fullwidth" onClick={()=>removeSpell(spell)}>Remove</button>}
          <button onClick={() => viewSpell(spell)} className="Table-Button is-fullwidth button">Details</button>
          {!onBar && playerSpells.length < currentLocation.max_spells && <button className="Table-Button button is-fullwidth" onClick={()=>addSpell(spell)}>Add</button>}
        </td>
      </tr>
    </tbody>
}

const mapStateToProps = ({playerSpells, location}) => ({
  playerSpells,
  currentLocation: location
})

export default connect(mapStateToProps)(SpellFrame)
