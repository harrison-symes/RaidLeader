import React from 'react'
import {connect} from 'react-redux'

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
    let {user_name, password, confirm_password} = this.state
    console.log("passwords match: ", password == confirm_password);
  }
  render() {
    return (
      <form className="Register" onSubmit={this.submit}>
        <label>Username:
          <input type="text" name="user_name" onChange={this.updateDetails}/>
        </label><br/>
        <label>Password:
          <input type="password" name="password" onChange={this.updateDetails}/>
        </label><br/>
        <label>Confirm:
          <input type="password" name="confirm_password" onChange={this.updateDetails}/>
        </label><br/>
          <input type="submit" />
      </form>
    )
  }
}

export default connect()(Register)
