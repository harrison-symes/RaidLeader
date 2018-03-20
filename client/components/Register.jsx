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
      confirm_password: '',
      errorMessage: null
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
    if (password.length < 6) this.setState({errorMessage: 'Password Too Short (6 Character Minimum)'})
    else if (password.length > 15) this.setState({errorMessage: 'Password Too Long (15 Character Maximum)'})
    else if (user_name.length > 15) this.setState({errorMessage: 'User Name Too Long (15 Character Maximum)'})
    else if (user_name.length < 6) this.setState({errorMessage: 'User Name Too Short (6 CHaracter Minimum)'})
    else if (password == confirm_password) this.props.dispatch(registerUserRequest({user_name, password}, err => {
      if (err) this.setState({errorMessage: err})
      else this.props.history.push('/')
    }))
    else this.setState({errorMessage: 'Passwords Do Not Match'})
  }
  render() {
    return (
      <form className="box column is-6 is-offset-3 form has-text-centered" style={{ background: 'inherit', backgroundImage: '', borderRadius: '15%'}} onSubmit={this.submit}>
        <p className="title is-1">Register</p>
        {this.state.errorMessage && <h1 className="box has-text-danger">{this.state.errorMessage}</h1>}
        <label className="column is-8 is-offset-2 label is-large has-text-light">Username:
          <input
            required
            className=" input is-large is-primary"
            type="text"
            name="user_name"
            onChange={this.updateDetails}
          />
        </label><br/>
        <div className="columns">
          <label className={`label column is-large has-text-light`}>Password:
            <input className=" input is-large is-primary"
              required
              type="password" name="password" onChange={this.updateDetails}
            />
          </label>
          <label className={`label column is-offset-1 is-large has-text-light`}>Confirm:
            <input className=" input is-large is-primary"
              required
              type="password" name="confirm_password" onChange={this.updateDetails}/>
          </label>
        </div>
        <input className="button column is-6 is-offset-3 is-large is-success is-fullwidth is-outlined has-text-light" type="submit" />
        <Link to="/" className="button column is-6 is-offset-3 is-large is-fullwidth is-warning has-text-light is-outlined">Cancel</Link>
      </form>
    )
  }
}

export default connect()(Register)
