import React, {Component} from 'react'
import {connect} from 'react-redux'

class SecondHand extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  render() {
    const {close} = this.props
    return <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title is-1">Second hand Shop</p>
          <button onClick={close} className="delete" aria-label="close"></button>
        </header>
        <section className="modal-card-body">
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

export default connect(mapStateToProps)(SecondHand)
