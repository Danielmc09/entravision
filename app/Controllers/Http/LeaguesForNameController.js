'use strict'

/* Importing the database module. */
const Database = use('Database');

/* This class is a controller that has a method called index that receives a request and returns a
queryCompetition */
class LeaguesForNameController {
  async index({request}) {
    let competition = request.all();
    let queryCompetition = await Database.select('id', 'api_id', 'name', 'code', 'areaName')
      .from('leagues')
      .where('name', '=', competition.nameLeague)
    return queryCompetition
  }
}

module.exports = LeaguesForNameController
