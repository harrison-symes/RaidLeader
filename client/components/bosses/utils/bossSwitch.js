import React from 'react'

import BitingBear from '../BitingBear'
import TramplingTurtle from '../TramplingTurtle'
import SpittingSpider from '../SpittingSpider'
import DamagedDragon from '../DamagedDragon'
import SeepingSlime from '../SeepingSlime'
import DecayingDeer from '../DecayingDeer'
import LungingLocusts from '../LungingLocusts'
import PlaguePiltherer from '../PlaguePiltherer'
import FlamingFurnace from '../FlamingFurnace'
import CyclingConveyer from '../CyclingConveyer'
import CollapsingCore from '../CollapsingCore'
import TrappedTunnel from '../TrappedTunnel'

export default function (boss) {
  switch(boss.name) {
    case 'Damaged Dragon': return <DamagedDragon boss={boss} />
    case 'Biting Bear': return <BitingBear boss={boss} />
    case 'Trampling Turtle': return <TramplingTurtle boss={boss} />
    case 'Spitting Spider': return <SpittingSpider boss={boss} />
    case 'Seeping Slime': return <SeepingSlime boss={boss} />
    case 'Decaying Deer': return <DecayingDeer boss={boss} />
    case 'Lunging Locusts': return <LungingLocusts boss={boss} />
    case 'Plague Piltherer': return <PlaguePiltherer boss={boss} />
    case 'Flaming Furnace': return <FlamingFurnace boss={boss} />
    case 'Cycling Conveyer': return <CyclingConveyer boss={boss} />
    case 'Collapsing Core': return <CollapsingCore boss={boss} />
    case 'Trapped Tunnel': return <TrappedTunnel boss={boss} />
    default: return null
  }
}
