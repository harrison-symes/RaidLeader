import bossOne from './bossOne'
import bossTwo from './bossTwo'
import bossThree from './bossThree'

export default function (bossName) {
  switch(bossName) {
    case 'Biting Bear': return bossOne
    case 'Trampling Turtle': return bossTwo
    case 'Spitting Spider': return bossThree
    default: return null
  }
}
