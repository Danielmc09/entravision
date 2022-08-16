'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class LeagueTeam extends Model {
  league(){
    return this.belongsTo('App/Models/League')
  }

  team(){
    return this.belongsTo('App/Models/Team')
  }
}

module.exports = LeagueTeam
