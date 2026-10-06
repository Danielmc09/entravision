'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class HistoryPlayerTeam extends Model {
  player(){
    return this.belongsTo('App/Models/Player')
  }

  team(){
    return this.belongsTo('App/Models/Team')
  }
}

module.exports = HistoryPlayerTeam
