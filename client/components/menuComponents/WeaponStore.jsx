import React, {Component} from 'react'
import {connect} from 'react-redux'

class WeaponStore extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isSell: false
    }
    this.switch = this.switch.bind(this)
  }
  switch() {
    this.setState({isSell: !this.state.isSell})
  }
  render() {
    const {close} = this.props
    const {isSell} = this.state
    return <div className="Modal modal is-active">
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title is-1">Weapon Store</p>
          <button onClick={close} className="delete" aria-label="close"></button>
        </header>
        <section className="modal-card-body">
          <div className="has-text-centered">
            {isSell
              ? <button onClick={this.switch} className="button is-large is-info is-fullwidth is-inverted">Buy Items</button>
              : <button onClick={this.switch}  className="button is-large is-info is-fullwidth is-inverted">Sell Items</button>
            }
          </div>
        </section>
        <footer className="modal-card-foot">
          <button onClick={close} className="button is-large is-info is-outlined is-fullwidth">Leave</button>
        </footer>
      </div>
    </div>
  }
}

const mapStateToProps = (state) => {
  return {

  }
}

export default connect(mapStateToProps)(WeaponStore)
