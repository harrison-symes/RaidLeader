import React from 'react'
import {connect} from 'react-redux'
import {loginUser} from '../actions/login'

import {Link} from 'react-router-dom'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user_name: '',
      password: '',
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
    let {user_name, password} = this.state
    this.props.dispatch(loginUser({user_name, password}, (err) => {
      if (err) this.setState({errorMessage: err})
      else this.props.history.push('/')
    }))
  }
  render() {
    const errorMessage = this.props.auth.errorMessage || this.state.errorMessage
    return (
      <form className="box column is-6 is-offset-3 form has-text-centered" style={{ background: 'inherit', backgroundImage: '', borderRadius: '15%'}} onSubmit={this.submit}>
        <p className="title is-1 is-dark">Login</p>
        {errorMessage && <h1 className="has-text-danger box column is-8 is-offset-2">{errorMessage}</h1>}
        <label className="label is-large has-text-light">Username:
          <input required className="input column is-6 is-offset-3 has-text-centered is-large is-primary " type="text" name="user_name" onChange={this.updateDetails}/>
        </label><br/>
        <label className="label is-large has-text-light">Password:
          <input required className="input column is-6 is-offset-3 has-text-centered is-large is-primary" type="password" name="password" onChange={this.updateDetails}/>
        </label><br/>
        <input className="button column is-6 is-offset-3 is-outlined is-large is-fullwidth is-success has-text-light" type="submit" />
        <Link to='/' className="button column is-6 is-offset-3 is-large is-fullwidth has-text-light is-outlined is-warning">Cancel</Link>
      </form>
    )
  }
}

const mapStateToProps = ({auth}) => ({auth})

export default connect(mapStateToProps)(Login)
