import BossFrame from '../../frames/BossFrame'
import React from 'react'

export default function (boss) {
  switch(boss.name) {
    case 'Test-Boss-1': return <BossFrame boss={boss} />
    default: return null
  }
}
