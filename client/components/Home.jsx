import React from 'react'

import {Link} from 'react-router-dom'

export default function Home (props) {
  return <div>
    Home
    <Link to="/game">Start Game</Link>
  </div>
}
