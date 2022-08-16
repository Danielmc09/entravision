'use strict'

/* Importing the modules that are going to be used in the controller. */
const axios = use("axios");
const League = use("App/Models/League");
const Team = use("App/Models/Team");
const LeagueTeam = use("App/Models/LeagueTeam");
const Player = use("App/Models/Player");

/* It receives a request from the client, then it creates a new league in the database, then it queries
the API for the teams in that league, then it creates the teams in the database */
class CodeLeagueController {

  /**
   * It returns a promise that resolves after a specified amount of time
   * @param waitTime - The amount of time to wait in milliseconds.
   * @returns A promise that resolves after 5 seconds.
   */
  async wait5sec(waitTime) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, waitTime);
    });
  }

  /**
   * The function receives a request from the client, then it creates a new league in the database, then
   * it queries the API for the teams in that league, then it creates the teams in the database
   */

  async store({ request }) {

    const { codeLeague } = request.all();

    let config = {
      headers: {
        "X-Auth-Token": "98bf1d4a99894c34b7597fb1a320e0f4",
      }
    };

    const queryApiLeague = await this.queryApiLeague(codeLeague, config)
    const createLeague = await this.createLeague(queryApiLeague)
    await this.queryTeams(queryApiLeague.data.teams, createLeague, config);

    return { 'information': 'The information has been loaded successfully' }

  }


  /**
  * This function queries the API for a specific league and returns the data
  * @param codeLeague - the code of the league you want to query
  * @param config - is the configuration of the API, which is the token.
  * @returns the league object.
  */
  async queryApiLeague(codeLeague, config) {

    let url = `https://api.football-data.org/v2/competitions/${codeLeague}/teams`;

    const LeagueUrl = async () => {
      try {
        return await axios.get(url, config);
      } catch (error) {
        console.error(error);
      }
    };

    const league = await LeagueUrl();

    await this.createLeague(league)

    return league
  }

  /**
  * It takes a league object as a parameter, checks if the league exists in the database, if it doesn't,
  * it creates it and returns the id of the league
  * @param league - The league object that is returned from the API.
  * @returns The id of the league
  */
  async createLeague(league) {

    let queryIdleague = await League.findBy('api_id', league.data.competition.id)
    if (!queryIdleague) {
      queryIdleague = await League.create({
        api_id: league.data.competition.id,
        name: league.data.competition.name,
        code: league.data.competition.code,
        areaName: league.data.competition.area.name
      })
    }

    return queryIdleague.id

  }

  /**
   * It queries the API for each team in the league, then it queries the database for the team, if it
   * doesn't exist, it creates it, then it queries the database for the relationship between the league
   * and the team, if it doesn't exist, it creates it, then it queries the database for each player in
   * the team, if it doesn't exist, it creates it
   * @param dataApi - The data that comes from the API.
   * @param dataDb - The id of the league in the database.
   * @param config - This is the configuration object that contains the API key.
   */

  async queryTeams(dataApi, dataDb, config) {

    for (const i of dataApi) {

      await this.wait5sec(1300);

      let url2 = `https://api.football-data.org/v2/teams/${i.id}`;
      let team = await axios.get(url2, config);

      let queryIdTeam = await Team.findBy('api_id', team.data.id)
      if (!queryIdTeam) {
        queryIdTeam = await Team.create({
          api_id: team.data.id,
          name: team.data.name,
          tla: team.data.tla,
          shortName: team.data.shortName,
          areaName: team.data.area.name,
          email: team.data.email
        })
      }

      let queryLeagueTeam = await LeagueTeam.findBy({
        'league_id': dataDb,
        'team_id': queryIdTeam.id
      })

      if (!queryLeagueTeam) {
        queryLeagueTeam = await LeagueTeam.create({
          league_id: dataDb,
          team_id: queryIdTeam.id
        })
      }

      for (const j of team.data.squad) {
        let queryPlayer = await Player.findBy('api_id', j.id)
        if (!queryPlayer) {
          queryPlayer = await Player.create({
            api_id: j.id,
            team_id: queryIdTeam.id,
            name: j.name,
            position: j.position,
            dateOfBirth: j.dateOfBirth,
            countryOfBirth: j.countryOfBirth,
            nationality: j.nationality,
          })
        }
      }
    }
  }
}

module.exports = CodeLeagueController
