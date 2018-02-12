import React, {Component} from 'react'
import {connect} from 'react-redux'

class BlackMarket extends Component {
  constructor(props) {
    super(props)
    this.state = {
      buyType: null
    }
  }
  switchType(buyType) {
    this.setState({buyType})
  }
  renderNavButton(buyType) {
    return <button className={`button is-fullwidth is-outlined ${buyType == this.state.buyType ? "is-focus is-success" : 'is-info'}`} onClick={()=>this.switchType(buyType)}>{buyType}</button>
  }
  renderNavMenu() {
    return <div className="level">
      {this.renderNavButton('Recruits')}
      {this.renderNavButton('Spells')}
      {this.renderNavButton('Weapons')}
    </div>
  }
  render() {
    const {close} = this.props
    // const {isSell} = this.state
    return <div className="Modal modal is-active">
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title is-1">Weapon Store</p>
          <button onClick={close} className="delete" aria-label="close"></button>
        </header>
        <section className="modal-card-body">
          <div className="has-text-centered">
            {this.renderNavMenu()}
            {/* {isSell
              ? <button onClick={this.switch} className="button is-large is-info is-fullwidth is-inverted">Buy Items</button>
              : <button onClick={this.switch}  className="button is-large is-info is-fullwidth is-inverted">Sell Items</button>
            } */}
          </div>
        </section>
        <footer className="modal-card-foot">
          <button onClick={close} className="button is-large is-info is-outlined is-fullwidth">Leave</button>
        </footer>
      </div>
    </div>
  }
}

const mapStateToProps = ({recruits, spells, weapons}) => {
  return {
    recruits,
    spells,
    weapons
  }
}

export default connect(mapStateToProps)(BlackMarket)
