import React from 'react'
import {connect} from 'react-redux'

import mapStateToProps from './utils/bossStateMap'
import BossFrame from '../frames/BossFrame'

class BossOne extends BossFrame {

}

export default connect(mapStateToProps)(BossOne)
