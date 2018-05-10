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
  validatePassword() {
    const {password} = this.state
    return password.length >= 6 && password.length <= 15
  }
  validateUsername() {
    const {user_name} = this.state
    return user_name.length >= 6 && user_name.length <= 15
  }
  validateConfirmPassword() {
    const {confirm_password, password} = this.state
    return password == confirm_password && this.validatePassword()
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
  inputIcon (icon, isLeft, isDone) {
    return <span className={`icon is-${isLeft ? 'left': 'right'}`}>
      <i className={`ra ra-fw ${icon}`} style={{color: isDone ? 'lightgreen' : 'grey '}}/>
    </span>
  }
  render() {
    return (
      <form className="box column is-6 is-offset-3 form has-text-centered" style={{ background: 'inherit', backgroundImage: '', borderRadius: '15%'}} onSubmit={this.submit}>
        <p className="title is-1">Register</p>
        {this.state.errorMessage && <h1 className="box has-text-danger">{this.state.errorMessage}</h1>}
        <label className="column is-8 is-offset-2 label is-large has-text-light">
          <span >
            Username:
          </span>
          <div className="control has-icons-left has-icons-right">
            <input
              required
              className="input has-text-centered is-large is-primary"
              type="text"
              name="user_name"
              onChange={this.updateDetails}
            />
            {this.inputIcon('ra-king', true, this.validateUsername())}
            {this.inputIcon('ra-king', false, this.validateUsername())}
          </div>
        </label><br/>
        <div className="columns">
          <label className={`label column is-large has-text-light`}>Password:
            <div className="control has-icons-left has-icons-right">
              <input className="input has-text-centered is-large is-primary"
                required
                type="password" name="password" onChange={this.updateDetails}
              />
              {this.inputIcon('ra-uncertainty', true, this.validatePassword())}
              {this.inputIcon('ra-uncertainty', false, this.validatePassword())}
            </div>
          </label>
          <label className={`label column is-offset-1 is-large has-text-light`}>Confirm:
            <div className="control has-icons-left has-icons-right">
              <input className="input has-text-centered is-large is-primary"
                required
                type="password" name="confirm_password" onChange={this.updateDetails}
              />
              {this.inputIcon('ra-interdiction', true, this.validateConfirmPassword())}
              {this.inputIcon('ra-interdiction', false, this.validateConfirmPassword())}
            </div>
          </label>
        </div>
        <input className="button column is-6 is-offset-3 is-large is-success is-fullwidth is-outlined has-text-light" type="submit" />
        <Link to="/" className="button column is-6 is-offset-3 is-large is-fullwidth is-warning has-text-light is-outlined">Cancel</Link>
      </form>
    )
  }
}

export default connect()(Register)
