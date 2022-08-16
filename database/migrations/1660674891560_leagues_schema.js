'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LeaguesSchema extends Schema {
  up () {
    this.create('leagues', (table) => {
      table.increments()
      table.integer('api_id')
      table.string('name', 100).nullable()
      table.string('code', 10).nullable()
      table.string('areaName', 100).nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('leagues')
  }
}

module.exports = LeaguesSchema
