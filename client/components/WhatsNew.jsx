import React from 'react'

import patchNotes from '../utils/patchNotes'
import {Link} from 'react-router-dom'

import jump from 'jump.js'

import { WiredCard } from "wired-card"

export default function (props) {
  return <div className="Town has-text-centered">
    <div className="title is-1 Town-Banner">What's New?</div>
    <div className="Town-Buttons">
      <Link to='/' className="button is-small is-info is-outlined column is-6 is-offset-3">Back</Link>
      <br />
      <div className="section columns is-multiline">
        {patchNotes.map(patch =>
          <div onClick={()=>jump(`#${patch.title}`)}className="button Info-Button column is-fullwidth is-large is-primary">{patch.version}</div>
        )}
      </div>
      <hr />
      {patchNotes.map(patch => <div id={patch.title}>
        <p className="Town-Banner title is-2">Version {patch.version} - {patch.title}</p>
        <br />
        <wired-card elevation="5" classNames="columns is-multiline">
          {patch.updates.map(update => <div className="column Patch-Note has-text-left">
            <wired-card elevation="3" className="column is-centered">
              <p className="title is-3">{update.title}</p>
              {update.description}
            </wired-card>
          </div>)}
        </wired-card>
        <hr />
      </div>)}
      <Link to='/' className="button is-info is-outlined column is-6 is-offset-3">Back</Link>
    </div>
  </div>
}
