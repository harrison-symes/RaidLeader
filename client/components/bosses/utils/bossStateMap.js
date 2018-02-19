const mapStateToProps = ({boss, started, party, player, location}) => {
  return {
    boss,
    started,
    party,
    player,
    currentLocation: location
  }
}

export default mapStateToProps
