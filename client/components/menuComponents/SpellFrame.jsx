import React from 'react'
import {connect} from 'react-redux'

class SpellFrame extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showMore: false
    }
    this.toggleShow = this.toggleShow.bind(this)
  }
  toggleShow() {
    this.setState({showMore: !this.state.showMore})
  }
  render() {
    const {spell} = this.props
    const {showMore} = this.state
    const modal = () => <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{spell.name}</p>
          <button onClick={this.toggleShow} className="delete" aria-label="close"></button>
        </header>
        <div className="modal-card-body has-text-centered">
          <p className="title is-1">{spell.name} ({spell.type})</p>
          <hr />
          <div className="columns">
            <div className="column is-4"><p className="subtitle is-3">Cost: {spell.cost} mana</p></div>
            <div className="column is-4"><p className="subtitle is-3">Cast: {spell.cast} s</p></div>
            <div className="column is-4"><p className="subtitle is-3">CD: {spell.coolDown} s</p></div>
          </div>
          <p className="box subtitle is-2">{spell.description}</p>
        </div>
        <footer className="modal-card-footer">
          <button onClick={this.toggleShow} className="modal-close is-large" aria-label="close">Close</button>
        </footer>
      </div>
    </div>
    return <div>
      <p className="subtitle is-4">{spell.name}</p>
      <button onClick={this.toggleShow} className="button">Show More</button>
      {showMore && modal()}
    </div>
  }
}

export default connect()(SpellFrame)
