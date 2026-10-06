'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Player extends Model {
  team() {
    return this.belongsTo('App/Models/Team')
  }

  history() {
    return this.hasMany('App/Models/HistoryPlayerTeam')
  }
}

module.exports = Player
