import React, {Component} from 'react'
import {connect} from 'react-redux'

import SpellFrame from './SpellFrame'

import {SpellIcon} from '../icons/StatIcons'

const elements = [
  "Life", 'Fire', 'Shadow', 'Arcane'
]

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
  spellsByElement(element) {
    const spells = this.props.spellBook.filter(spell => spell.element == element)
    if (spells.length == 0) return null
    return <div className="has-text-centered">
      <h1 className="title is-3">{element}</h1>
      <div className="columns is-multiline">
        {spells.map(spell =>
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
      <br />
    </div>
  }
  renderContent() {
    const {spellBook} = this.props
    return <div>
      {elements.map(element => this.spellsByElement(element))}
    </div>
  }
  renderElementTraits(element) {
    const traits = this.props.traits.filter(trait => trait.element == element)
    return <div className="column">
      <p className="content is-large">{element}</p>
      {traits.map(trait => <span className="subtitle is-4"><SpellIcon spell={trait} isLarge={true} /></span>)}
    </div>
  }
  renderTraits() {
    return <div className="box has-text-centered">
      <p className="title is-3">Passive Traits:</p>
      <div className="columns">
        {this.renderElementTraits('Life')}
        {this.renderElementTraits('Fire')}
        {this.renderElementTraits('Shadow')}
        {this.renderElementTraits('Arcane')}
      </div>
    </div>
  }
  render() {
    const {selected} = this.state
    const {close, spellBook} = this.props
    return selected
      ? <SpellFrame showMore={true} spell={selected} back={this.back} />
      : <div className={`Modal modal is-active`} >
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">My Spells ({spellBook.length})</p>
          <button onClick={close} className="delete" aria-label="close"></button>
        </header>
        <section className="modal-card-body">
          {this.renderTraits()}
          {this.renderContent()}
        </section>
        <footer className="modal-card-foot">
          <button onClick={close} className="button is-large is-info is-outlined is-fullwidth">Back</button>
        </footer>
      </div>
    </div>
  }
}

const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')

const isEarlier = (a, b, i) => {
  if (a[i] == b[i]) return isEarlier(a, b, i + 1)
  else {
    if (i >= b.length) return true
    else if (i >= a.length) return false
    const aIdx =  alphabet.findIndex(char => char == a[i].toLowerCase())
    const bIdx =  alphabet.findIndex(char => char == b[i].toLowerCase())
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


const mapStateToProps = ({spellBook, traits}) => {
  alphabetSort(spellBook)
  return {
    spellBook: alphabetSort(spellBook),
    traits
  }
}

export default connect(mapStateToProps)(MySpells)
