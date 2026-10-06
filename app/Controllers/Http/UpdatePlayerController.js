'use strict'

const ValidatePlayerTeam = use("App/validate/ValidatePlayerTeam");
const HistoryPlayerTeam = use("App/Models/HistoryPlayerTeam");

/* The UpdatePlayerController class is used to update the team of a player */
class UpdatePlayerController {

  /**
   * The function receives a request from the client, and then it calls the queryData function with the
   * idPlayer and idTeam parameters
   */
  async index({ request }) {
    const { idPlayer, idTeam } = request.all();
    const ValidatePlayerTeam = await this.ValidatePlayerTeam(idPlayer, idTeam)
    return ValidatePlayerTeam
  }

/**
 * This function validates that the player and team exist
 * record in the history of the player and updates the player's team
 * @param idPlayer - The player id
 * @param idTeam - The team id that the player will be assigned to.
 */
  async ValidatePlayerTeam(idPlayer, idTeam) {

    let player;
    let validatePlayerTeam = await ValidatePlayerTeam.queryPlayerTeam(idPlayer, idTeam)

    if (validatePlayerTeam[0].status == 400) {
      return validatePlayerTeam[0]
    }

    player = validatePlayerTeam[0]

    await this.HistoryPlayerTeam(player, idTeam)
    await this.updatePLayer(player, idTeam)

    return ({
      'response': `the player was successfully updated`,
      'status': 200
    })

  }

  /**
   * It updates the team_id of a player to the id of the team that the player is being added to
   * @param player - contains the instance of the player to update.
   * @param idTeam - The id of the team that the player is being added to.
   */
  async updatePLayer(player, idTeam) {
    player.team_id = idTeam
    player.save()
  }

  /**
   * It creates a new history of the player's team.
   * @param player - The player object that is being transferred.
   * @param idTeam - The id of the team that the player will be transferred to.
   */
  async HistoryPlayerTeam(player, idTeam) {
    await HistoryPlayerTeam.create({
      player_id: player.id,
      teamOld_id: player.team_id,
      teamNew_id: idTeam
    })
  }

}

module.exports = UpdatePlayerController
