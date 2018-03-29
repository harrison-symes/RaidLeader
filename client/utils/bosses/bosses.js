import Damaged_Dragon from './The_Hunt/Damaged_Dragon'
import Biting_Bear from './The_Wilds/Biting_Bear'
import Trampling_Turtle from './The_Wilds/Trampling_Turtle'
import Spitting_Spider from './The_Wilds/Spitting_Spider'
import Seeping_Slime from './The_Swamp/Seeping_Slime'
import Decaying_Deer from './The_Swamp/Decaying_Deer'
import Lunging_Locusts from './The_Swamp/Lunging_Locusts'
import Plague_Piltherer from './The_Swamp/Plague_Piltherer'
import Flaming_Furnace from './The_Foundry/Flaming_Furnace'
import Cycling_Conveyer from './The_Foundry/Cycling_Conveyer'
import Collapsing_Core from './The_Foundry/Collapsing_Core'
import Trapped_Tunnel from './The_Foundry/Trapped_Tunnel'

export default function (bossName) {
  switch(bossName) {
    case 'Damaged Dragon': return Damaged_Dragon
    case 'Biting Bear': return Biting_Bear
    case 'Trampling Turtle': return Trampling_Turtle
    case 'Spitting Spider': return Spitting_Spider
    case 'Seeping Slime': return Seeping_Slime
    case 'Decaying Deer': return Decaying_Deer
    case 'Lunging Locusts': return Lunging_Locusts
    case 'Plague Piltherer': return Plague_Piltherer
    case 'Flaming Furnace': return Flaming_Furnace
    case 'Cycling Conveyer': return Cycling_Conveyer
    case 'Collapsing Core': return Collapsing_Core
    case 'Trapped Tunnel': return Trapped_Tunnel
    default: return null
  }
}
