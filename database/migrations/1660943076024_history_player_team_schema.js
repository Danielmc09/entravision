'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class HistoryPlayerTeamSchema extends Schema {
  up () {
    this.create('history_player_teams', (table) => {
      table.increments()
      table.integer('player_id').unsigned().references('id').inTable('players')
      table.integer('teamOld_id').unsigned().references('id').inTable('teams')
      table.integer('teamNew_id').unsigned().references('id').inTable('teams')
      table.timestamps()
    })
  }

  down () {
    this.drop('history_player_teams')
  }
}

module.exports = HistoryPlayerTeamSchema
