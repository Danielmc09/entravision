'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PlayersSchema extends Schema {
  up () {
    this.create('players', (table) => {
      table.increments()
      table.integer('api_id')
      table.integer('team_id').unsigned().references('id').inTable('teams')
      table.string('name', 100).nullable()
      table.string('position', 100).nullable()
      table.string('dateOfBirth', 100).nullable()
      table.string('countryOfBirth', 100).nullable()
      table.string('nationality', 100).nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('players')
  }
}

module.exports = PlayersSchema
