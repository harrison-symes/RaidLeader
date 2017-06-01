import React from 'react'
import {connect} from 'react-redux'

import {getGreetings} from '../actions/greetings'

const renderGreeting = (greeting, key) => (
  <h1 key={key}>{greeting.text}</h1>
)

const Greetings = ({greetings, dispatch}) => (
  <div>
    <button onClick={() => dispatch(getGreetings())}>Show Greetings</button>
    {greetings.map(renderGreeting)}
  </div>
)

const mapStateToProps = (state) => {
return {greetings: state.greetings}

}

export default connect(mapStateToProps)(Greetings)
