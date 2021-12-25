const { SlashCommand } = require('discommand-slash')
const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = class extends SlashCommand {
  data = new SlashCommandBuilder().setName('ping').setDescription('Pong!')
  execute(interaction, slash) {
    interaction.reply('Pong!')
  }
}
