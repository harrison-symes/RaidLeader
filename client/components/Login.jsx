import React from 'react'
import {connect} from 'react-redux'
import {loginUser} from '../actions/login'

import {Link} from 'react-router-dom'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user_name: '',
      password: ''
    }
    this.updateDetails = this.updateDetails.bind(this)
    this.submit = this.submit.bind(this)
  }
  updateDetails(e) {
    this.setState({[e.target.name]: e.target.value})
  }
  submit(e) {
    e.preventDefault()
    let {user_name, password} = this.state
    this.props.dispatch(loginUser({user_name, password}))

  }
  render() {
    return (
      <form className="box form Login" onSubmit={this.submit}>
        <p className="title is-1 is-dark">Login</p>
        <label className="label is-large is-light">Username:
          <input className="input is-large is-primary " type="text" name="user_name" onChange={this.updateDetails}/>
        </label><br/>
        <label className="label is-large">Password:
          <input className="input is-large is-primary" type="password" name="password" onChange={this.updateDetails}/>
        </label><br/>
        <input className="button is-large is-fullwidth is-success" type="submit" />
        <Link to='/' className="button is-large is-fullwidth is-light">Cancel</Link>
      </form>
    )
  }
}

export default connect()(Login)
