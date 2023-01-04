import { Client, Events } from 'discord.js'
import { Listener } from 'discommand'

module.exports = class ClientReadyListener extends Listener {
  constructor() {
    super(Events.ClientReady)
  }

  execute(client: Client) {
    console.log(`${client.user!.username} 해커톤 나갈 준비 완료!`)
  }
}
