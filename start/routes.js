'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})


/* Creating a group of routes that are prefixed with api/v1. */
Route.group(()=>{
  Route.post('/leagueCode', 'CodeLeagueController.store')
  Route.get('/playersofleague', 'PlayersOfLeagueController.index')
  Route.get('/teams', 'TeamController.index')
  Route.get('/team', 'NameOfTeamController.index')
  Route.get('/league', 'LeagueController.index')
  Route.get('/leagueforname', 'LeaguesForNameController.index')
}).prefix('api/v1');

/* A group of routes that are not defined. */
Route.group(()=>{
  Route.post('*', () => {return { 'Fallo': 'La ruta no existe' }})
  Route.get('*', () => {return { 'Fallo': 'La ruta no existe' }})
  Route.put('*', () => {return { 'Fallo': 'La ruta no existe' }})
  Route.patch('*', () => {return { 'Fallo': 'La ruta no existe' }})
  Route.delete('*', () => {return { 'Fallo': 'La ruta no existe' }})
})
