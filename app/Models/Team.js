'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Team extends Model {
  team() {
    return this.hasMany('App/Models/Ligaequipo')
  }

  history() {
    return this.hasMany('App/Models/HistoryPlayerTeam')
  }
}

module.exports = Team
