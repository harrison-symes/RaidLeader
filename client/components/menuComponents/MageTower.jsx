import React, {Component} from 'react'
import {connect} from 'react-redux'

import createClass from '../../utils/createClass'
import {earnGold} from '../../actions/gold'
import {levelUpRecruit} from '../../actions/recruits'
import {classIcons} from '../../utils/classText'
import {PowerIcon, SpeedIcon, HealthIcon, GoldIcon, GemIcon, SpellIcon, TargetTypeIcon, SpellElementIcon, ManaIcon, CastTimeIcon, CoolDownIcon} from '../icons/StatIcons'

import {getTraitsByElement, sortTiers} from '../../utils/traits'

class MageTower extends Component {
  constructor(props) {
    super(props)
    this.state = {
      element: null,
      traits: null,
      selected: null
    }
  }
  selectTrait(selected) {
    this.setState({selected})
  }
  pickElement(element) {
    let traits = sortTiers(getTraitsByElement(element))
    console.log({traits});
    this.setState({element, traits, selected: null})
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
    const {selected} = this.state
    const {gems} = this.props
    return <div>
      <hr />
      <p className="content is-large">{selected.description}</p>
      {selected.isSpell && this.renderSpellPreview(selected.spell)}
      {gems >= selected.gemCost
        ? <button className="button is-large is-outlined is-success">Learn {selected.name} (<GemIcon gems={-1 * selected.gemCost} />)</button>
        : <button className="button Info-Button is-outlined is-danger">Not Enough Gems (Costs <GemIcon gems={selected.gemCost} />) </button>
      }
    </div>
  }
  renderTraitIcon(trait, size) {
    const {selected} = this.state
    return <div className={`column is-${size}`}>
      <p className="title is-4">{trait.name}</p>
      <div className="level">
        <p className="subtitle is-3"><SpellIcon spell={trait} isLarge={true} /></p>
        {selected == trait
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
      <div className="columns">
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
    const {element} = this.state

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

const mapStateToProps = ({gold, dungeons, recruits, gems}) => {
  return {
    dungeons,
    recruits,
    gold,
    gems
  }
}

export default connect(mapStateToProps)(MageTower)
