'use strict'

/* It's importing the Database class from the Adonis framework. */
const Database = use('Database');

/* It's a controller that returns a list of competitions */
class LeagueController {
  async index() {
    let queryCompetitions = await Database.select('id', 'api_id', 'name', 'code', 'areaName')
      .from('leagues')
    return queryCompetitions
  }
}

module.exports = LeagueController
