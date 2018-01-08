import React from 'react'

import TestBoss1 from '../TestBoss1'
import TestBoss2 from '../TestBoss2'
import TestBoss3 from '../TestBoss3'

export default function (boss) {
  switch(boss.name) {
    case 'Test-O-Saurus': return <TestBoss1 boss={boss} />
    case 'Test-Turtle': return <TestBoss2 boss={boss} />
    case 'Test-Turantula': return <TestBoss3 boss={boss} />
    default: return null
  }
}
