const { SlashCommand } = require('discommand-slash')
const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = class extends SlashCommand {
  data = new SlashCommandBuilder().setName('ping').setDescription('Pong!')
  execute(interaction, slash) {
    interaction.reply(`현재핑: \`${interaction.client.ws.ping}\`ms`)
  }
}
