import React from 'react'
import {connect} from 'react-redux'
import {loginUser} from '../actions/login'

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
      <form className="Login" onSubmit={this.submit}>
        <label>Username:
          <input type="text" name="user_name" onChange={this.updateDetails}/>
        </label><br/>
        <label>Password:
          <input type="password" name="password" onChange={this.updateDetails}/>
        </label><br/>
        <input type="submit" />
      </form>
    )
  }
}

export default connect()(Login)
