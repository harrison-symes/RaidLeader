import React from 'react'
import {connect} from 'react-redux'

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
    console.log(this.state);
  }
  render() {
    return (
      <form className="Login" onSubmit={this.submit}>
        <label>Username:
          <input type="text" name="user_name" onChange={this.updateDetails}/>
          <input type="password" name="password" onChange={this.updateDetails}/>
          <input type="submit" />
        </label>
      </form>
    )
  }
}

export default connect()(Login)
