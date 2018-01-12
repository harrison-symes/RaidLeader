import React from 'react'
import {connect} from 'react-redux'

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
      {showMore && [
        (<tr key={`recruit-${name}-hp`} className="tr">
          <th className="th">
            <p className="subtitle is-4">Hp:</p>
          </th>
          <td className="td">
            <p className="subtitle is-4">
              {recruit.hp || "none"}
            </p>
          </td>
        </tr>),
        (<tr key={`recruit-${name}-power`} className="tr">
          <th className="th">
            <p className="subtitle is-4">Power:</p>
          </th>
          <td className="td">
            <p className="subtitle is-4">
              {recruit.power || "none"}
            </p>
          </td>
        </tr>),
        (<tr key={`recruit-${name}-speed`} className="tr">
            <th className="th">
              <p className="subtitle is-4">Speed:</p>
            </th>
            <td className="td">
              <p className="subtitle is-4">
                {recruit.speed || "none"}
              </p>
            </td>
          </tr>)
      ]}
      <tr className="tr has-text-centered">
        <button onClick={this.toggleShow} className="button">{showMore ? 'Show Less' : 'Show More'}</button>
      </tr>
    </tbody>
  }
}

export default connect()(RecruitFrame)
