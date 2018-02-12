import React, {Component} from 'react'
import {connect} from 'react-redux'

import {ManaIcon, CastTimeIcon, CoolDownIcon, TargetTypeIcon, SpellElementIcon, SpellIcon, GoldIcon} from '../icons/StatIcons'

class BlackMarketSpells extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: null
    }
    this.sellSpell = this.sellSpell.bind(this)
  }
  selectSpell(selected) {
    this.setState({selected})
  }
  sellSpell() {

  }
  render() {
    const {spells} = this.props
    const {selected} = this.state
    return <div className="has-text-centered">
      <span className="title is-3">Sell Spells</span>
      <hr />
      {spells.map((spell, i) => <div className='box'>
        <div className="columns">
          <div className="column is-4">
            <SpellIcon spell={spell} isLarge={true} />
          </div>
          <div className="column is-8">
            <div className="title subtitle is-3">{spell.name}</div>
            {selected == spell
              ? <p className="content is-large">{spell.description}</p>
              : <button onClick={()=>this.selectSpell(spell)} className="Info-Button button is-info is-outlined">Details</button>
            }
          </div>
        </div>
        <br />
        {selected == spell && <div>
          <div className="columns">
            <div className="column is-4"><p className="subtitle is-3"><ManaIcon value={spell.cost} /></p></div>
            <div className="column is-4"><p className="subtitle is-3"><CastTimeIcon value={spell.cast + 's'} /></p></div>
            <div className="column is-4"><p className="subtitle is-3"><CoolDownIcon value={spell.coolDown + 's'} /></p></div>
          </div>
          <br />
          <div className="columns">
            <div className="column is-6">
              <p className="subtitle is-2"><TargetTypeIcon singleTarget={spell.singleTarget}/></p>
            </div>
            <div className="column is-6">
              <p className="subtitle is-2"><SpellElementIcon element={spell.element}/></p>
            </div>
          </div>
          <hr />
          {spell.name == 'Heal'
            ? <button disabled className="button is-fullwidth is-danger">You can't sell this!</button>
            : <button onClick={this.sellSpell} className="button is-fullwidth is-outlined is-success">Sell &nbsp; <GoldIcon value={`+${200}`} /></button>
          }
        </div>}
      </div>)}
    </div>
  }
}

const mapStateToProps = ({spellBook}) => ({spells: spellBook})


export default connect(mapStateToProps)(BlackMarketSpells)
