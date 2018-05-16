import React, {Component} from 'react'
import {connect} from 'react-redux'

import spells from '../../utils/spells'
import {earnGold} from '../../actions/gold'
import {addSpell} from '../../actions/spells'
import {get, set} from '../../utils/localstorage'
import {ManaIcon, CastTimeIcon, CoolDownIcon, TargetTypeIcon, SpellElementIcon, SpellIcon, GoldIcon} from '../icons/StatIcons'

class Library extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showChoices: !!JSON.parse(get('offeredSpells')),
      offeredSpells: JSON.parse(get('offeredSpells')) || [],
      selectedSpell: null,
      learntSpell: null,
      isLoading: false
    }
  }

  findByElement = element => {
    const spellsByElement = Object.keys(spells)
      .filter(spell => !this.props.spellBook
        .find(learned => learned.name == spell)).map(name => spells[name])
      .filter(spell => spell.element == element && !spell.reserved)

    return spellsByElement.length
      ? spellsByElement[Math.floor(Math.random() * spellsByElement.length)]
      : null
  }

  solveOptions = () => {
    const elements = ['Life', 'Fire', 'Shadow', 'Arcane']

    return elements
      .map(element => this.findByElement(element))
      .filter(item => !!item)
  }

  selectSpell = selectedSpell => this.setState({selectedSpell})

  reRoll = () => {
    if (this.state.isLoading) return
    this.setState({
      isLoading: true
    })
    const rollCost = this.props.spellBook.length * 50 * -1

    this.props.spendGold(rollCost, () => {
      const offeredSpells = this.solveOptions()
      set('offeredSpells', JSON.stringify(offeredSpells))
      this.setState({
        showChoices: true,
        offeredSpells,
        isLoading: false
      })
    })
  }

  showOptions = () => {
    if (this.state.isLoading) return
    this.setState({
      isLoading: true
    })

    const spellCost = 200 + (this.props.spellBook.length * 50) * -1
    this.props.spendGold(spellCost, () => {
      const offeredSpells = this.solveOptions()
      set('offeredSpells', JSON.stringify(offeredSpells))
      this.setState({
        showChoices: true,
        offeredSpells,
        isLoading: false
      })
    })
  }

  learnSpell = spell => {
    if (this.state.isLoading) return
    this.setState({
      isLoading: true
    })
    this.props.addSpell(spell, () => {
      set('offeredSpells', null)
      this.setState({
        offeredSpells: [],
        showChoices: null,
        selectedSpell: null,
        learntSpell: spell,
        isLoading: false
      })
    })
  }

  reset = () => {
    this.setState({
      offeredSpells: [],
      showChoices: null,
      selectSpell: null,
      learntSpell: null
    })
  }

  renderSpellOption = (spell, i) => {
    const {selectedSpell} = this.state
    return <div key={`offered-spell-${i}`} className="box">
      <div className="level">
        <p className="title is-3">{spell.name}</p>
        <span>
          <SpellIcon spell={spell} isLarge={true} />
          &nbsp;
          &nbsp;
          &nbsp;
          <button
            className={`button Info-Button ${selectedSpell != spell ? 'is-success' : 'is-warning'}`}
            onClick={() => this.selectSpell(selectedSpell != spell
              ? spell
              : null
            )}
          >
            {selectedSpell != spell
              ? 'Details'
              : 'Hide'
            }
          </button>
        </span>
      </div>
      {selectedSpell == spell && <div className="has-text-centered">
        <div className="subtitle is-5">{spell.description}</div>
        <div className="columns">
          <div className="column is-6">
            <p className="subtitle is-2"><TargetTypeIcon singleTarget={spell.singleTarget}/></p>
          </div>
          <div className="column is-6">
            <p className="subtitle is-2"><SpellElementIcon element={spell.element}/></p>
          </div>
        </div>
        <div className="columns">
          <div className="column is-4"><p className="subtitle is-4"><ManaIcon value={spell.cost} /></p></div>
          <div className="column is-4"><p className="subtitle is-4"><CastTimeIcon value={spell.cast + 's'} /></p></div>
          <div className="column is-4"><p className="subtitle is-4"><CoolDownIcon value={spell.coolDown + 's'} /></p></div>
        </div>
        <button onClick={() => this.learnSpell(spell)} className="button is-success is-large">Learn {spell.name}
          &nbsp;<i className={`icon ra ${spell.icon}`} /> </button>
        </div>}
        <hr />
      </div>
  }

  renderOptions = () => {
    const {offeredSpells, showChoices, selectedSpell, learntSpell} = this.state
    const {spellBook, gold} = this.props
    const rollCost = spellBook.length * 50
    const spellCost = 200 + (spellBook.length * 50)
    const logThing = () => console.log
    return showChoices
      ? (
        <div>
          <p className="title is-3">Choose a Spell:</p>
          <span className="subtitle is-3">Or <button className="button is-warning Info-Button" onClick={this.reRoll}>Re-Roll</button> (<GoldIcon value={-1 * rollCost} />)</span>
          <hr />
          {offeredSpells.map(this.renderSpellOption)}
        </div>)
      : Object.keys(spells)
        .filter(spell => !this.props.spellBook
          .find(learned => learned.name == spell)
        ).length == 0
        ? <button disabled className="is-danger is-large button is-fullwidth">You have learned every spell!</button>
        : this.props.spellBook.length <= 2 && this.props.recruits.length < 2
          ? <button disabled className="is-danger is-large button is-fullwidth">Recruit another Party Member First</button>
          : gold >= spellCost
            ? <button onClick={this.showOptions} className="button is-large is-fullwidth">Learn a Spell! (<GoldIcon value={-1 * spellCost} />)</button>
            : <button className="is-danger is-large button is-fullwidth" disabled><GoldIcon value={`Not Enough`} /></button>
  }

  learnedSpellFrame = (spell) => {
    return <div className="has-text-centered">
      <p className="title is-3">You Learned a new Spell</p>
      <div className="box">
        <p className="title is-3">{spell.name}
        </p>
        &nbsp;<SpellIcon spell={spell} isLarge={true}/>
        <p className="subtitle is-5">{spell.description}</p>
        <div className="columns">
          <div className="column is-6">
            <p className="subtitle is-2"><TargetTypeIcon singleTarget={spell.singleTarget}/></p>
          </div>
          <div className="column is-6">
            <p className="subtitle is-2"><SpellElementIcon element={spell.element}/></p>
          </div>
        </div>
        <div className="columns">
          <div className="column is-4"><p className="subtitle is-4"><ManaIcon value={spell.cost} /></p></div>
          <div className="column is-4"><p className="subtitle is-4"><CastTimeIcon value={spell.cast + 's'} /></p></div>
          <div className="column is-4"><p className="subtitle is-4"><CoolDownIcon value={spell.coolDown + 's'} /></p></div>
        </div>
      </div>
      <button onClick={this.reset} className="button is-large is-fullwidth is-info">Learn Another?</button>
    </div>
  }

  render = () => {
    const {close, gold, spellBook} = this.props
    const {offeredSpells, showChoices, selectedSpell, learntSpell} = this.state
    const rollCost = this.props.spellBook.length * 50
    const spellCost = 200 + (spellBook.length * 50)

    return <div className="Modal modal is-active">
      <div className="modal-background"></div>
      <div className="modal-card">

        <header className="modal-card-head">
          <span className="modal-card-title is-6 level">
            <p className=" is-pulled-left">Library</p>
            <p className=" is-pulled-right">
              <GoldIcon value={gold} />
              <button onClick={close} className="delete" aria-label="close"></button>
            </p>
          </span>
        </header>

        <section className="modal-card-body">
          {learntSpell != null
            ? this.learnedSpellFrame(learntSpell)
            : <div>
              <p className="title is-3">Welcome to The Library!</p>
              <p className="content is-large">Here you can learn new spells to support your party in Dungeons</p>
              {!showChoices
                ? <span className="content is-large">It will cost <GoldIcon value={spellCost} /> for your next spell</span>
                : <p className="title is-3">Thank you for donating to the library, please pick one of these {offeredSpells.length} spells</p>
              }
              <hr />
              {this.renderOptions()}
            </div>
          }
        </section>

        <footer className="modal-card-foot">
          <a onClick={close} className="button is-large is-dark is-outlined is-fullwidth">
            <span>Leave&nbsp;</span>
            <span className="icon is-large">
              <i className={`ra ra-bottom-right ra-lg` }></i>
            </span>
          </a>
        </footer>

      </div>
    </div>
  }
}

const mapDispatchToProps = dispatch => ({
  addSpell: (spell, cb) => dispatch(addSpell(spell, cb)),
  spendGold: (cost, cb) => dispatch(earnGold(cost, cb))
})

const mapStateToProps = ({
  gold,
  spellBook,
  recruits
}) => ({
  gold,
  spellBook,
  recruits
})

export default connect(mapStateToProps, mapDispatchToProps)(Library)
