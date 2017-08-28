import React from 'react'
import {Link} from 'react-router-dom'

export default function Nav (route) {
  return (
    <div className="Nav">
      <Link to="/">Home</Link>{" | "}
      <Link to="/login">Login</Link>{" | "}
      <Link to="/register">Register</Link>
    </div>
  )
}
