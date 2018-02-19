export function MenuBackground (dungeon) {
  switch(dungeon) {
    case 'The Hunt': return {
      colour: '#b88d8d',
      background: 'https://www.transparenttextures.com/patterns/black-scales.png'
    }
    case 'The Cursed Wilds': return {
      colour: '#00633a',
      background: 'https://www.transparenttextures.com/patterns/gray-floral.png'
    }
    case 'The Swamp': return {
      colour: '#47294a',
      background: 'https://www.transparenttextures.com/patterns/asfalt-light.png'
    }
    case 'The Foundry': return {
      colour: '#c23f18',
      background: 'https://www.transparenttextures.com/patterns/diagmonds.png'
    }
    default: return {
      colour: 'white',
      background: ''
    }
  }
}
