const { Command } = require('discommand')
const { ChatInputCommandInteraction } = require('discord.js')

module.exports = class extends Command {
  constructor() {
    super()
    this.name = '도움말'
    this.description = '이봇의 도움말 입니다.'
  }
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  execute(interaction) {
    interaction.reply({
      embeds: [
        {
          title: '도움말',
          description: `\`\`\`md
# 일반
도움말 - 현재 명령어입니다.
ping - 현재 봇의 웹소켓 레이턴시입니다.

# 관리
관리 - 이봇의 메인기능입니다.
\`\`\``,
        },
      ],
    })
  }
}
