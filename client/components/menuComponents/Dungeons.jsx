import React, {Component} from 'react'
import {connect} from 'react-redux'

import Dungeon from './Dungeon'

class Dungeons extends Component {
  render() {
    const {dungeons, playerParty, close} = this.props
    console.log({dungeons});
    return <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title is-1">Dungeon Map</p>
          <button onClick={close} className="delete" aria-label="close"></button>
        </header>
        <section className="modal-card-body" style={{backgroundColor: '#708090  '}}>
          <div className="has-text-centered">
            {dungeons.map((dungeon, i) => <Dungeon dungeon={dungeon} key={`dungeon-${i}`} />)}
          </div>
        </section>
        <footer className="modal-card-foot">
          <button onClick={close} className="button is-large is-info is-outlined is-fullwidth">Stay in Town</button>
        </footer>
      </div>
    </div>
  }
}

// const Dungeons = ({dungeons, playerParty, close}) => {
//   console.log({dungeons});
//   return <div className="modal is-active">
//     <div className="modal-background"></div>
//     <div className="modal-card">
//       <header className="modal-card-head">
//         <p className="modal-card-title is-1">Dungeon Map</p>
//         <button onClick={close} className="delete" aria-label="close"></button>
//       </header>
//       <section className="modal-card-body">
//         <div className="has-text-centered">
//           {/* {dungeons.map((dungeon, i) => <Dungeon dungeon={dungeon} key={`dungeon-${i}`} />)} */}
//           {dungeons.map((dungeon, i) => <div key={i} className=" has-text-centered">
//             <div className="level">
//               <p className="title is-2">Name Name{dungeon.isCompleted ? "✔": ""}</p>
//               {<span className="icon is-large has-text-danger">
//                 <i className="fa fa-3x fa-lock" aria-hidden="true"></i>
//               </span>}
//             </div>
//             <p>Hello</p>
//           </div>)}
//         </div>
//       </section>
//       <footer className="modal-card-foot">
//         <button onClick={close} className="button is-large is-info is-outlined is-fullwidth">Stay in Town</button>
//       </footer>
//     </div>
//   </div>
// }

const mapStateToProps = ({dungeons, playerParty}) => {
  return {
    dungeons,
    playerParty
  }
}

export default connect(mapStateToProps)(Dungeons)
