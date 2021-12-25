const { SlashCommand } = require('discommand-slash')
const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed, Formatters } = require('discord.js')

module.exports = class extends SlashCommand {
  data = new SlashCommandBuilder()
    .setName('도움말')
    .setDescription('이봇의 도움말 입니다.')
  execute(interaction, slash) {
    interaction.reply({
      embeds: [
        new MessageEmbed().setTitle('도움말').setDescription(
          Formatters.codeBlock(
            'md',
            `# 일반
도움말 - 현재 명령어입니다.
ping - 현재 봇의 웹소켓 레이턴시입니다.

# 관리
관리 - 이봇의 메인기능입니다.`
          )
        ),
      ],
    })
  }
}
