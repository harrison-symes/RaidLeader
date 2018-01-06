import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logoutUser} from '../actions/logout'

function Nav (props) {
  return (
    <div className="Nav level nav-bar">
      <Link to="/">Home</Link>{" | "}
      {props.auth.isAuthenticated
        ? <button onClick={() => props.dispatch(logoutUser())}>Logout</button>
        : <div>
          <Link to="/login">Login</Link>{" | "}
          <Link to="/register">Register</Link>
        </div>
      }
    </div>
  )
}

const mapStateToProps = ({auth}) => {
  return {auth}
}

export default connect(mapStateToProps)(Nav)
