import React, {Component} from 'react'
import {connect} from 'react-redux'

import createClass from '../../utils/createClass'
import {earnGold} from '../../actions/gold'
import {levelUpRecruit} from '../../actions/recruits'
import {classIcons} from '../../utils/classText'
import {PowerIcon, SpeedIcon, HealthIcon, GoldIcon, GemIcon, SpellIcon, TargetTypeIcon, SpellElementIcon, ManaIcon, CastTimeIcon, CoolDownIcon} from '../icons/StatIcons'

import {gainGems} from '../../actions/gems'
import {addSpell} from '../../actions/spells'
import {addTrait} from '../../actions/traits'

import {getTraitsByElement, sortTiers} from '../../utils/traits'

const elementDescriptions = {
  'Life': (isShowing, showDetails) => <div onClick={showDetails} style={{cursor: 'pointer'}}>
    <p className="title is-3">Life</p>
    {isShowing && <span className="box content is-large">
      <p><b>Life</b> Spells are focused around <b>Healing</b> your Recruits</p>
      <p>If you wish to dedicate your attention to keeping your friends alive, <b>Life</b> is the Element for you!</p>
    </span>}
  </div>,
  'Fire': (isShowing, showDetails) => <div onClick={showDetails} style={{cursor: 'pointer'}}>
    <p className="title is-3">Fire</p>
    {isShowing && <span className="box content is-large">
      <p><b>Fire</b> Spells are focused around <b>Damaging</b> the Boss</p>
      <p>If you wish to burn your foes (and occasionally your friends), <b>Fire</b> is the Element for you!</p>
    </span>}
  </div>,
  'Shadow': (isShowing, showDetails) => <div onClick={showDetails} style={{cursor: 'pointer'}}>
    <p className="title is-3">Shadow</p>
    {isShowing && <span className="box content is-large">
      <p><b>Shadow</b> Spells are focused around <b>Sacrifcing Resources</b> to have stronger output.</p>
      <p>If you like to live Life on the brink of Death, <b>Shadow</b> is the Element for you!</p>
    </span>}
  </div>,
  'Arcane': (isShowing, showDetails) => <div onClick={showDetails} style={{cursor: 'pointer'}}>
    <p className="title is-3">Arcane</p>
    {isShowing && <span className="box content is-large">
      <p><b>Arcane</b> Spells are focused around <b>Mana Efficiency</b> and <b>Power Spell Combinations</b>.</p>
      <p>If you like to do cool, powerful things that might just get You and Everyone else killed, <b>Arcane</b> is the Element for you!</p>
    </span>}
  </div>,
}

class MageTower extends Component {
  constructor(props) {
    super(props)
    this.state = {
      element: null,
      traits: [],
      selected: null,
      isLoading: false,
      isShowing: props.spellBook.length < 2 || props.traits.length < 1
    }
    this.toggleShowDetails = this.toggleShowDetails.bind(this)
  }
  toggleShowDetails() {
    this.setState(({isShowing}) => ({isShowing: !isShowing}))
  }
  selectTrait(selected) {
    this.setState({selected})
  }
  pickElement(element) {
    const {spellBook, traits} = this.props
    if (!element) return
    let traitsForElement = getTraitsByElement(element)

    traitsForElement.forEach(trait => {
      if (trait.isSpell && spellBook.find(spell => spell.name == trait.spell.name)) trait.isLearned = true
      else if (traits.find(learned => learned.name == trait.name)) trait.isLearned = true
      else trait.isLearned = false
    })

    this.setState({
      element,
      traits: sortTiers(traitsForElement),
      selected: null
    })
  }
  purchaseTrait() {
    const {selected, isLoading} = this.state
    if (isLoading) return
    this.setState({isLoading: true})

    if (selected.isSpell) this.props.learnSpell(selected, () => this.setState({
      isLoading: false
    }))
    else this.props.learnTrait(selected, () => this.setState({
      isLoading: false
    }))
  }
  componentWillReceiveProps(nextProps) {
    this.pickElement(this.state.element)
  }
  renderSpellPreview(spell) {
    return <div className="column is-12 box">
      <p className="title is-4">Spell: {spell.name}</p>
      <div className="columns">
        <div className="column is-6 content is-large">{spell.description}</div>
        <div className="column is-6 columns">
          <div className="column is-4">
            <SpellIcon spell={spell} isLarge={true} />
          </div>
          <div className="column is-4">
            <p className="subtitle is-2"><TargetTypeIcon singleTarget={spell.singleTarget}/></p>
          </div>
          <div className="column is-4">
            <p className="subtitle is-2"><SpellElementIcon element={spell.element}/></p>
          </div>
        </div>
      </div>
      <div className="columns">
        <div className="column is-4"><p className="subtitle is-3"><ManaIcon value={spell.cost} /></p></div>
        <div className="column is-4"><p className="subtitle is-3"><CastTimeIcon value={spell.cast + 's'} /></p></div>
        <div className="column is-4"><p className="subtitle is-3"><CoolDownIcon value={spell.coolDown + 's'} /></p></div>
      </div>
    </div>
  }
  renderTraitDetails() {
    const {selected, isLoading, traits} = this.state
    const {gems, spellBook} = this.props
    const isLearned = selected.isSpell && spellBook.find(spell => spell == selected.spell)
    const isLocked = selected.tier != 1 && !traits[selected.tier - 1].find(other => other.isLearned)

    return <div>
      <hr />
      <p className="content is-large">{selected.description}</p>
      {selected.isSpell && this.renderSpellPreview(selected.spell)}
      {isLocked
        ? <button disabled className="button is-outlined is-danger">Requires a Tier {selected.tier - 1} {selected.element} Trait</button>
        : !selected.isLearned
          ? (gems >= selected.gemCost)
            ? <button onClick={()=>this.purchaseTrait()} className={`button is-large is-outlined is-success ${isLoading ? "is-loading" : ""}`}>Learn {selected.name} (<GemIcon value={-1 * selected.gemCost} />)</button>
            : <button disabled className="button Info-Button is-outlined is-danger">Not Enough Gems (Costs <GemIcon value={selected.gemCost} />) </button>
          : null
      }
    </div>
  }
  renderTraitIcon(trait, size) {
    const {selected} = this.state
    const {spellBook, traits} = this.props

    if (trait.isSpell && spellBook.find(spell => spell.name == trait.spell.name)) trait.isLearned = true
    else if (traits.find(learned => learned.name == trait.name)) trait.isLearned = true
    else trait.isLearned = false

    const isLearned = trait.isSpell && spellBook.find(spell => spell.name == trait.spell.name)
    const isLocked = trait.tier != 1 && !this.state.traits[trait.tier - 1].find(other => other.isLearned)

    return <div className={`column is-${size}`}>
      <span className="has-text-centered">
        {trait.isLearned
          ? <p className="tag is-medium is-success">Trait Learned</p>
          : isLocked
            ? <p className="tag is-medium is-danger">
              Learn a Tier {trait.tier - 1} Trait First
            </p>
            : <br />}
        <p className="title is-4">{trait.name}</p>
      </span>
      <div className="level">
        <p className="subtitle is-3"><SpellIcon spell={trait} isLarge={true} /></p>
        {(selected == trait)
          ? <button onClick={() => this.selectTrait(null)} className="button Info-Button is-outlined is-warning">Hide</button>
          : <button onClick={() => this.selectTrait(trait)} className="button Info-Button is-outlined is-info">Details</button>
        }
      </div>
    </div>
  }
  renderTier(tier) {
    const traits = this.state.traits[tier]
    const {selected} = this.state
    return <div className="box has-text-centered">
      <p className="title is-3">Tier {tier}</p>
      <div className="columns is-multiline">
        {traits.map(trait => this.renderTraitIcon(trait, 12 / traits))}
      </div>
      {(selected && selected.tier == tier) && this.renderTraitDetails()}

    </div>
  }
  renderTiers() {
    const {traits} = this.state
    const tiers = Object.keys(traits)
    return tiers.map(tier => this.renderTier(tier))
  }
  renderElementButton(element) {
    return <button onClick={() => this.pickElement(element)} className={`button Info-Button ${this.state.element ==  element ? 'is-success' : 'is-info'} is-outlined`}>{element}</button>
  }
  render() {
    const {close, gems} = this.props
    const {element, isShowing} = this.state
    return <div className="Modal modal is-active">
      <div className="modal-background"></div>
      <div className="modal-card Modal">
        <header className="modal-card-head">
          <span className="modal-card-title level">
            <p className=" is-pulled-left">Mage Tower</p>
            <p className=" is-pulled-right">
              <GemIcon value={gems} />
              &nbsp;
              <button onClick={close} className="delete" aria-label="close"></button>
            </p>
          </span>
        </header>
        <section className="modal-card-body">
          <p className="title is-4">Welcome to the Mage Tower</p>
          <p className="subtitle is-4">Which Element would like you to Empower?</p>

          <div className="column has-text-centered">
            {this.renderElementButton('Life')}
            {this.renderElementButton('Fire')}
            {this.renderElementButton('Shadow')}
            {this.renderElementButton('Arcane')}
          </div>
          {element && elementDescriptions[element](isShowing, this.toggleShowDetails)}
          <hr />
          {!element
            ? <div className="has-text-centered">
              <p className="content is-large">Here you can spend your Gems to empower your Player Character</p>
              <p className="content is-large">Choose Wisely, as you cannot refund your choices.</p>
              <hr />
            </div>
            : this.renderTiers()
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

const mapStateToProps = ({gold, dungeons, recruits, gems, spellBook, traits}) => {
  return {
    dungeons,
    recruits,
    gold,
    gems,
    spellBook,
    traits
  }
}

const mapDispatchToProps = dispatch => ({
  learnSpell: (selected, cb) => dispatch(gainGems(selected.gemCost * -1, () => {
    dispatch(addSpell(selected.spell, cb))
  })),
  learnTrait: (selected, cb) => dispatch(gainGems(selected.gemCost * -1, () => {
    dispatch(addTrait(selected, cb))
  }))
})

export default connect(mapStateToProps, mapDispatchToProps)(MageTower)
