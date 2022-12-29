const { Command } = require('discommand')

module.exports = class extends Command {
  constructor() {
    super()
    this.name = 'ping'
    this.description = 'Pong!'
  }
  execute(interaction) {
    interaction.reply(`현재핑: \`${interaction.client.ws.ping}\`ms`)
  }
}
