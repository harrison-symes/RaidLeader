export const loadGame = (playerParty, playerSpells, playerWeapon, name) => ({
  type: 'LOAD_GAME',
  playerParty,
  playerSpells,
  playerWeapon,
  name
})
