'use strict'

const Database = use('Database');

/* This class is used to get the players of a league */
class PlayersOfLeagueController {

  /**
   * It returns a list of players from a league, filtered by team name if provided
   * @returns The players of the league
   */

  async index({ request }) {

    let code = request.all();

    let errors = [];

    let players;

    let CodeLeague = await Database.select('code').from('leagues').where('leagues.code', '=', code.codeLeague)

    if (CodeLeague != '') {
      players = Database.table('leagues')
        .join('league_teams', 'leagues.id', '=', 'league_teams.league_id')
        .join('teams', 'teams.id', '=', 'league_teams.team_id')
        .join('players', 'players.team_id', '=', 'league_teams.team_id')
        .where('leagues.code', '=', code.codeLeague)
        .select('players.id', 'players.name', 'players.position', 'players.dateOfBirth', 'players.countryOfBirth', 'players.nationality')

    } else {
      errors.push({ 'codeLeague': `The league code does not exist ${code.codeLeague}` });
    }

    if (code.team) {
      let queryTeam = await Database.select('name').from('teams').where('teams.name', '=', code.team)
      if (queryTeam != '') {
        players.where('teams.name', code.team)
      } else {
        errors.push({ 'teamName': `Team name does not exist ${code.equipo}` });
      }
    }

    if (errors != '') {
      return errors
    }
    return players
  }
}

module.exports = PlayersOfLeagueController
