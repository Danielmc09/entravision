'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class League extends Model {
  league(){
    return this.hasMany('App/Models/Ligaequipo')
  }
}

module.exports = League
