'use strict'

const Database = use('Database');

/* It's a controller that returns a list of teams */
class TeamController {
  async index() {
    let queryTeams = await Database.select('id', 'api_id', 'name', 'tla', 'shortName', 'areaName', 'email')
      .from('teams')
    return queryTeams
  }
}

module.exports = TeamController
