import React from 'react'
import {connect} from 'react-redux'

class Party extends React.Component {
  constructor(props) {
    super(props)

  }
  render() {
    console.log(this.props);
    return <div>
      Party Menu
    </div>
  }
}

const mapStateToProps = ({recruits}) => {
  return {
    recruits
  }
}

export default connect(mapStateToProps)(Party)
