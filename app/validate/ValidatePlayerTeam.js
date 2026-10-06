'use strict'

const Player = use("App/Models/Player");
const Team = use("App/Models/Team");

/* This class is used to validate if the player and team exist in the database */
class ValidatePlayerTeam {

  async queryPlayerTeam(idPlayer, idTeam) {

    let queryPlayer = await Player.findBy('id', idPlayer)
    let queryTeam = await Team.findBy('id', idTeam)

    let response = [];
    let errors = [];

    if (queryPlayer && queryTeam) {
      response.push(queryPlayer, queryTeam)
    }
    if (queryPlayer == null) {
      errors.push({
        'response': `${idPlayer} id player not exist`,
        'status': 400
      })
    }
    if (queryTeam == null) {
      errors.push({
        'response': `${idTeam} id team not exist`,
        'status': 400
      })
    }

    if (errors != '') {
      return errors
    } else {
      return response
    }

  }
}

module.exports = new ValidatePlayerTeam()
