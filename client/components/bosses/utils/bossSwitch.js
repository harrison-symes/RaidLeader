import BossFrame from '../../frames/BossFrame'
import React from 'react'

export default function (boss) {
  switch(boss.name) {
    case 'Test-O-Saurus': return <BossFrame boss={boss} />
    default: return null
  }
}
