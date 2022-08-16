# Adonis API application entravision

This API application was created in order to send the code of a league as a parameter and obtain different data, such as the name of the league, the teams in the league, the players of the teams..

## Clone the repository

```bash
https://github.com/Danielmc09/entravision.git
```
## Install adonisJS cli

```bash
npm i -g @adonisjs/cli
```

1. create the .env file in the project root based on the .env.example file in order to set the environment variables
2. run adonis key:generate

use the node command to install the dependencies

```bash
npm install
```
## Note 

- the database used in this project is MySql
- collection is attached in postman to import and test

### Migrations

Run the following command to run startup migrations.

```js
adonis migration:run
```

### Run API application
```js
adonis serve --dev
```

- Ports to use that should not be busy or with local services turned off:
  - Mysql: 3306
  - AdonisJS: 3333

|Path|Verb|Body params|
|----|----|----|
|http://127.0.0.1:3333/api/v1/leagueCode|POST|{codeLeague:string}|
|http://127.0.0.1:3333/api/v1/playersofleague|GET|{codeLeague:string / team:string}|
|http://127.0.0.1:3333/api/v1/teams|GET||
|http://127.0.0.1:3333/api/v1/team|GET|{nameTeam:string / players:boolean}|
|http://127.0.0.1:3333/api/v1/league|GET||
|http://127.0.0.1:3333/api/v1/leagueforname|GET|{nameLeague:string}


Autor: Angel Daniel Menideta Castillo © 2022
