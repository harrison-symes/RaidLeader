import React from 'react'
import {connect} from 'react-redux'

class BossSelection extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
      boss: null
    }
  }
  renderBossModal () {
    const {boss} = this.state
    return <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{boss.name}</p>
          <button onClick={() => this.changeModal(false, null)} className="delete" aria-label="close"></button>
        </header>
        <section className="modal-card-body">
        </section>
        <footer className="modal-card-foot">
          <button className="button is-success">Set Target</button>
          <button onClick={() => this.changeModal(false, null)} className="button">Cancel</button>
        </footer>
      </div>
    </div>
  }
  changeModal (showModal, boss) {
    this.setState({showModal, boss})
  }
  render() {
    const {bosses} = this.props.currentLocation
    const {boss, showModal} = this.state
    return <div className="has-text-centered">
      {showModal && this.renderBossModal()}
      {bosses.map((boss, i) => {
        let colour = !boss.isDefeated ? (i > 0 && bosses[i-1].isDefeated) || i == 0 ? 'is-success' : 'is-danger' : 'is-dark'
        return <div>
          <button onClick={() => this.changeModal(true, boss)} key={`location-boss-preview-${i}`} className={`is-fullwidth button is-large ${colour}`} disabled={colour != 'is-success'}>{boss.name}</button>
        </div>
      })}
    </div>
  }
}

const mapStateToProps = ({location}) => {
  return {
    currentLocation: location
  }
}


export default connect(mapStateToProps)(BossSelection)
