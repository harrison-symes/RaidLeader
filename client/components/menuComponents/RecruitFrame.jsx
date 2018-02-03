import React from 'react'
import {connect} from 'react-redux'

import RecruitModal from './RecruitModal'
import {classIcons} from '../../utils/classText'

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
      {/* <tr className="tr has-text-centered">
        <td className="td level"> */}
          <p className="subtitle is-4">
            {recruit.name}
            &nbsp; <i className={`subtitle is-4 icon ra ${classIcons(recruit.heroClass)}`}>
            </i>
            &nbsp; (Level {recruit.level})
          </p>
        {/* </td>
      </tr> */}
      {showMore && <RecruitModal recruit={recruit} close={this.toggleShow} />}
      {!showMore && <tr className="tr has-text-centered">
        <button onClick={this.toggleShow} className="button">{showMore ? 'Show Less' : 'Show More'}</button>
      </tr>}
    </tbody>
  }
}

export default connect()(RecruitFrame)
