const { Command } = require('discommand')
const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = class extends Command {
  constructor() {
    super()
    this.name = 'ping'
    this.description = 'Pong!'
  }
  execute(interaction, slash) {
    interaction.reply(`현재핑: \`${interaction.client.ws.ping}\`ms`)
  }
}
