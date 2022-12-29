const { Listener } = require('discommand')
const { Events, Client } = require('discord.js')

module.exports = class ClientReadyListener extends Listener {
  constructor() {
    super()
    this.name = Events.ClientReady
  }

  /**
   *
   * @param {Client} client
   */
  execute(client) {
    console.log(`${client.user.username} 해커톤 나갈 준비 완료!`)
  }
}
