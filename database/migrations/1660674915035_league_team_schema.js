'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LeagueTeamSchema extends Schema {
  up () {
    this.create('league_teams', (table) => {
      table.increments()
      table.integer('league_id').unsigned().references('id').inTable('leagues')
      table.integer('team_id').unsigned().references('id').inTable('teams')
      table.timestamps()
    })
  }

  down () {
    this.drop('league_teams')
  }
}

module.exports = LeagueTeamSchema
