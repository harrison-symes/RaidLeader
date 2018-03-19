import React, {Component} from 'react'
import {connect} from 'react-redux'

import SpellFrame from './SpellFrame'

class MySpells extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: null
    }
    this.selectSpell = this.selectSpell.bind(this)
    this.back = this.back.bind(this)
  }
  back() {
    this.setState({selected: null})
  }
  selectSpell(selected) {
    this.setState({selected})
  }
  renderContent() {
    const {spellBook} = this.props
    return <div className="columns is-multiline">
      {spellBook.map(spell =>
        <table className="column is-4 table has-text-centered is-full-width">
          <SpellFrame
            viewSpell={this.selectSpell}
            onBar={false}
            key={`spell-${spell.id}`}
            spell={spell}
          />
        </table>
      )}
    </div>
  }
  render() {
    const {selected} = this.state
    const {close, spellBook} = this.props
    return selected
      ? <SpellFrame showMore={true} recruit={selected} back={this.back} />
      : <div className={`Modal modal is-active`} >
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">My Spells ({spellBook.length})</p>
          <button onClick={close} className="delete" aria-label="close"></button>
        </header>
        <section className="modal-card-body">
          {this.renderContent()}
        </section>
        <footer className="modal-card-foot">
          <button onClick={close} className="button is-large is-info is-outlined is-fullwidth">Back</button>
        </footer>
      </div>
    </div>
  }
}

const mapStateToProps = ({spellBook}) => {
  return {
    spellBook
  }
}

export default connect(mapStateToProps)(MySpells)
