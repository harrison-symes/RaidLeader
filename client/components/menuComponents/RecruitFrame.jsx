import React from 'react'
import {connect} from 'react-redux'

import RecruitModal from './RecruitModal'

class RecruitFrame extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showMore: false
    }
    this.toggleShow = this.toggleShow.bind(this)
  }
  toggleShow() {
    this.setState({showMore: !this.state.showMore})
  }
  render() {
    const {recruit} = this.props
    const {showMore} = this.state
    return <tbody className="tbody">
      <tr className="tr">
        <th className="th">
          <p className="subtitle is-4">Name:</p>
        </th>
        <td className="td">
          <p className="subtitle is-4">
            {recruit.name}
          </p>
        </td>
      </tr>
      <tr className="tr">
        <th className="th">
          <p className="subtitle is-4">Class:</p>
        </th>
        <td className="td">
          <p className="subtitle is-4">
            {recruit.heroClass}
          </p>
        </td>
      </tr>
      <tr className="tr">
        <th className="th">
          <p className="subtitle is-4">Level:</p>
        </th>
        <td className="td">
          <p className="subtitle is-4">
            {recruit.level}
          </p>
        </td>
      </tr>
      {showMore && <RecruitModal recruit={recruit} close={this.toggleShow} />}
      {!showMore && <tr className="tr has-text-centered">
        <button onClick={this.toggleShow} className="button">{showMore ? 'Show Less' : 'Show More'}</button>
      </tr>}
    </tbody>
  }
}

export default connect()(RecruitFrame)
