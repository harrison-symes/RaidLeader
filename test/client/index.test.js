import React from 'react'
import test from 'ava'
import { shallow, mount } from 'enzyme'

import App from '../../client/components/App'
import './setup-dom'

App.prototype.componentDidMount = () => {}
