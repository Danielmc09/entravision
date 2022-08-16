'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TeamsSchema extends Schema {
  up () {
    this.create('teams', (table) => {
      table.increments()
      table.integer('api_id')
      table.string('name', 100).nullable()
      table.string('tla', 10).nullable()
      table.string('shortName', 100).nullable()
      table.string('areaName', 100).nullable()
      table.string('email', 100).nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('teams')
  }
}

module.exports = TeamsSchema
