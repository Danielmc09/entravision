'use strict'

/* Importing the database module. */
const Database = use('Database');

/* It returns the team's information and the players of the team if the team exists */
class NameOfTeamController {
  /**
 * It returns the team's information and the players of the team if the team exists
 * @returns The response is a JSON with the information of the team and the players of the team.
 */
  async index({ request }) {

    let nameTeam = request.all();

    let errors = [];

    let team;
    let QueryPlayers;

    let responseTeam = [];
    let responsePlayers;

    let QueryTeam = await Database.select('name').from('teams').where('teams.name', '=', nameTeam.nameTeam)

    if (QueryTeam != '') {
      team = await Database.table('teams')
        .where('name', '=', nameTeam.nameTeam)
        .select('*')
      responseTeam = {
        'id': team[0].id,
        'api_id': team[0].api_id,
        'name': team[0].name,
        'tla': team[0].tla,
        'shortName': team[0].shortName,
        'areaName': team[0].areaName,
        'email': team[0].email,
      }
    } else {
      errors.push({ 'nameTeam': `Team name does not exist ${nameTeam.nameTeam}` });
    }

    if (responseTeam != '') {
      if (nameTeam.players != false) {
        QueryPlayers = await Database.table('players').where('team_id', '=', responseTeam.id).select('*')
        responsePlayers = {
          'teams': QueryPlayers
        }
      }
    }

    let response = Object.assign(responseTeam, responsePlayers);

    if (errors != '') {
      return errors
    }
    return response
  }
}

module.exports = NameOfTeamController
