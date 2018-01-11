import React from 'react'
import {connect} from 'react-redux'

class SpellFrame extends React.Component {
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
    const {spell} = this.props
    const {showMore} = this.state
    console.table({spell});
    return <tbody className="tbody">
      <tr className="tr">
        <th className="th">
          <p className="subtitle is-4">Spell:</p>
        </th>
        <td className="td">
          <p className="subtitle is-4">
            {spell.name}
          </p>
        </td>
      </tr>
      {showMore && [
        (<tr key={`spell-${name}-hp`} className="tr">
          <th className="th">
            <p className="subtitle is-4">Type:</p>
          </th>
          <td className="td">
            <p className="subtitle is-4">
              {spell.type}
            </p>
          </td>
        </tr>),
        (<tr key={`spell-${name}-hp`} className="tr">
          <th className="th">
            <p className="subtitle is-4">Targeted:</p>
          </th>
          <td className="td">
            <p className="subtitle is-4">
              {spell.singleTarget ? "Yes" : "No"}
            </p>
          </td>
        </tr>),
        (<tr key={`spell-${name}-cooldown`} className="tr">
          <th className="th">
            <p className="subtitle is-4">CD:</p>
          </th>
          <td className="td">
            <p className="subtitle is-4">
              {spell.coolDown} s
            </p>
          </td>
        </tr>),
        (<tr key={`spell-${name}-power`} className="tr">
          <th className="th">
            <p className="subtitle is-4">Power:</p>
          </th>
          <td className="td">
            <p className="subtitle is-4">
              {spell.powerRatio * 100} %
            </p>
          </td>
        </tr>),
        (<tr className="tr">
          <th className="th">
            <p className="subtitle is-4">Cost:</p>
          </th>
          <td className="td">
            <p className="subtitle is-4">
              {spell.cost} mana
            </p>
          </td>
        </tr>),
        (<tr className="tr">
          <th className="th">
            <p className="subtitle is-4">Cast:</p>
          </th>
          <td className="td">
            <p className="subtitle is-4">
              {spell.cast} s
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

export default connect()(SpellFrame)
