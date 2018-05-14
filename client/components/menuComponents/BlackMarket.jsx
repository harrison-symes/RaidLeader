import React, {Component} from 'react'
import {connect} from 'react-redux'

import BlackMarketSpells from './BlackMarketSpells'
import BlackMarketRecruits from './BlackMarketRecruits'
import BlackMarketWeapons from './BlackMarketWeapons'

import {GoldIcon} from '../icons/StatIcons'

class BlackMarket extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sellType: null
    }
  }
  switchType(sellType) {
    this.setState({sellType})
  }
  renderNavButton(sellType) {
    return <button className={`button is-fullwidth is-outlined Info-Button ${sellType == this.state.sellType ? "is-focus is-success" : 'is-info'}`} onClick={()=>this.switchType(sellType)}>{sellType}</button>
  }
  renderNavMenu() {
    return <div className="level">
      {this.renderNavButton('Recruits')}
      {this.renderNavButton('Spells')}
      {this.renderNavButton('Weapons')}
    </div>
  }
  renderSellContent() {
    switch(this.state.sellType) {
      case 'Recruits': return <BlackMarketRecruits />
      case 'Spells': return <BlackMarketSpells />
      case 'Weapons': return <BlackMarketWeapons />
      default: return null
    }
  }
  render() {
    const {close, gold} = this.props
    // const {isSell} = this.state
    return <div className="Modal modal is-active">
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <span className="modal-card-title is-6 level">
            <p className="is-pulled-left">Market</p>
            <p className="is-pulled-right">
              <GoldIcon value={gold} />
              <button onClick={close} className="delete" aria-label="close"></button>
            </p>
          </span>
        </header>
        <section className="modal-card-body">
          <div className="has-text-centered">
            {this.state.sellType == null && <span>
              <h1 className="title is-3">Welcome to the Black Market</h1>
              <p className="content is-large">Here you can sell off any unwanted Spells, Recruits and Weapons</p>
              <hr />
            </span>}
            <p className="subtitle is-3">What are you wanting to sell?</p>
            {this.renderNavMenu()}
            {this.renderSellContent()}
            {/* {isSell
              ? <button onClick={this.switch} className="button is-large is-info is-fullwidth is-inverted">Buy Items</button>
              : <button onClick={this.switch}  className="button is-large is-info is-fullwidth is-inverted">Sell Items</button>
            } */}
          </div>
        </section>
        <footer className="modal-card-foot">
          <button onClick={close} className="button is-large is-dark is-outlined is-fullwidth">Leave</button>
        </footer>
      </div>
    </div>
  }
}

const mapStateToProps = ({recruits, gold, spells, weapons}) => {
  return {
    recruits,
    gold,
    spells,
    weapons
  }
}

export default connect(mapStateToProps)(BlackMarket)
