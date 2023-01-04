import { Command } from 'discommand'
import { ChatInputCommandInteraction } from 'discord.js'

module.exports = class extends Command {
  constructor() {
    super('ping')
    this.data = {
      name: 'ping',
      description: 'Pong!',
    }
  }
  execute(interaction: ChatInputCommandInteraction) {
    interaction.reply(`현재핑: \`${interaction.client.ws.ping}\`ms`)
  }
}
