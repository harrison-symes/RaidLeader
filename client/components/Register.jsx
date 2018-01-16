import React from 'react'
import {connect} from 'react-redux'
import {registerUserRequest} from '../actions/register'

import {Link} from 'react-router-dom'

class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user_name: '',
      password: '',
      confirm_password: ''
    }
    this.updateDetails = this.updateDetails.bind(this)
    this.submit = this.submit.bind(this)
  }
  updateDetails(e) {
    this.setState({[e.target.name]: e.target.value})
  }
  submit(e) {
    e.preventDefault()
    e.target.reset()
    let {user_name, password, confirm_password} = this.state
    if (password == confirm_password) this.props.dispatch(registerUserRequest({user_name, password}))
  }
  render() {
    return (
      <form className="form box Register" onSubmit={this.submit}>
        <p className="title is-1">Register</p>
        <label className="label is-large">Username:
          <input className="input is-large is-primary" type="text" name="user_name" onChange={this.updateDetails}/>
        </label><br/>
        <label className="label is-large">Password:
          <input className="input is-large is-primary" type="password" name="password" onChange={this.updateDetails}/>
        </label><br/>
        <label className="label is-large">Confirm:
          <input className="input is-large is-primary" type="password" name="confirm_password" onChange={this.updateDetails}/>
        </label><br/>
          <input className="button is-large is-success is-fullwidth" type="submit" />
          <Link to="/" className="button is-light is-large is-fullwidth">Cancel</Link>
      </form>
    )
  }
}

export default connect()(Register)
