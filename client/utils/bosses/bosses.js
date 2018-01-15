import Damaged_Dragon from './The_Hunt/Damaged_Dragon'
import Biting_Bear from './The_Wilds/Biting_Bear'
import Trampling_Turtle from './The_Wilds/Trampling_Turtle'
import Spitting_Spider from './The_Wilds/Spitting_Spider'

export default function (bossName) {
  switch(bossName) {
    case 'Damaged Dragon': return Damaged_Dragon
    case 'Biting Bear': return Biting_Bear
    case 'Trampling Turtle': return Trampling_Turtle
    case 'Spitting Spider': return Spitting_Spider
    default: return null
  }
}
