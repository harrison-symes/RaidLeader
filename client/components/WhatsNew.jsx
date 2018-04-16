import React from 'react'

import patchNotes from '../utils/patchNotes'
import {Link} from 'react-router-dom'

export default function (props) {
  return <div className="Town has-text-centered">
    <div className="title is-1 Town-Banner">What's New?</div>
    <div className="Town-Buttons">
      <Link to='/' className="button is-small is-info is-outlined column is-6 is-offset-3">Back</Link>
      <hr />
      {patchNotes.map(patch => <div>
        <p className="Town-Banner title is-2">Version {patch.version}</p>
        <br />
        <div classNames="columns is-multiline">
          {patch.updates.map(update => <div className="column box has-text-left">
            <p className="title is-3">{update.title}</p>
            {update.description}
          </div>)}
        </div>
        <hr />
      </div>)}
      <Link to='/' className="button is-info is-outlined column is-6 is-offset-3">Back</Link>
    </div>
  </div>
}
