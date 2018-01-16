import React, {Component} from 'react'
import {connect} from 'react-redux'

class Town extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showRecruitmentModal: false
    }
  }
  toggleModal(key, value) {
    this.setState({key, value})
  }
  render() {
    const {gold} = this.props
    const {showRecruitmentModal} = this.state
    const buttonStyle = {height: '15vh', width: '45vw', margin: '1vw'}
    return <div style={{height: '80vh'}} className="hero is-bold is-info">
      {/* <div className="hero-head has-text-centered">
      </div> */}
      <p className="title is-1">Town</p>
      <div style={{height: '20vh'}} className="hero-body has-text-centered">
        <div className="columns is-multiline">
          <button style={buttonStyle} className="column is-6 button is-large is-success is-fullwidth is-outlined is-inverted ">Recruitment Centre</button>
          <button style={buttonStyle} className="column is-6 button is-large is-success is-fullwidth is-outlined is-inverted">Training Centre</button>
          <button style={buttonStyle} className="column is-6 button is-large is-success is-fullwidth is-outlined is-inverted">Weapon Store</button>
          <button style={buttonStyle} className="column is-6 button is-large is-success is-fullwidth is-outlined is-inverted">Second Hand</button>
          <div style={buttonStyle} className="button is-large is-fullwidth is-danger is-outlined is-inverted">Logout</div>
          <div style={buttonStyle} className="button is-large is-fullwidth is-primary is-outlined is-inverted">Profile</div>
        </div>
      </div>
    </div>
  }
}

const mapStateToProps = ({gold}) => {
  return {
    gold
  }
}

export default connect(mapStateToProps)(Town)
