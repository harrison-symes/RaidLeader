import Biting_Bear from './Biting_Bear'
import Trampling_Turtle from './Trampling_Turtle'
import Spitting_Spider from './Spitting_Spider'

export default function (bossName) {
  switch(bossName) {
    case 'Injured Dragon': return Biting_Bear
    case 'Biting Bear': return Biting_Bear
    case 'Trampling Turtle': return Trampling_Turtle
    case 'Spitting Spider': return Spitting_Spider
    default: return null
  }
}
