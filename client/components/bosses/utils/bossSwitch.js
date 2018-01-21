import React from 'react'

import BitingBear from '../BitingBear'
import TramplingTurtle from '../TramplingTurtle'
import SpittingSpider from '../SpittingSpider'
import DamagedDragon from '../DamagedDragon'

export default function (boss) {
  switch(boss.name) {
    case 'Damaged Dragon': return <DamagedDragon boss={boss} />
    case 'Biting Bear': return <BitingBear boss={boss} />
    case 'Trampling Turtle': return <TramplingTurtle boss={boss} />
    case 'Spitting Spider': return <SpittingSpider boss={boss} />
    default: return null
  }
}
