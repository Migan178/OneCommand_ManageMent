const { SlashCommand, Slash } = require('discommand-slash')
const { SlashCommandBuilder } = require('@discordjs/builders')
const { CommandInteraction } = require('discord.js')

module.exports = class extends SlashCommand {
  data = new SlashCommandBuilder()
    .setName('관리')
    .setDescription('관리기능입니다.')
    .addStringOption(options =>
      options
        .setName('항목')
        .setDescription('항목을 고릅니다.')
        .setRequired(true)
        .addChoice('킥', '킥')
        .addChoice('밴', '밴')
        .addChoice('청소', '청소')
        .addChoice('슬로우모드', '슬로우모드')
    )
    .addMentionableOption(options =>
      options.setName('유저').setDescription('유저').setRequired(false)
    )
    .addStringOption(options =>
      options
        .setName('이유')
        .setDescription('밴이나 킥을 당한이유')
        .setRequired(false)
    )
    .addNumberOption(options =>
      options
        .setName('갯수')
        .setDescription('삭제할 채팅갯수')
        .setRequired(false)
    )
    .addNumberOption(options =>
      options
        .setName('초')
        .setDescription('슬로우 모드를 설정할 초')
        .setRequired(false)
    )
  /**
   *
   * @param {CommandInteraction} interaction
   * @param {Slash} slash
   */
  async execute(interaction, slash) {
    const choice = interaction.options.getString('항목')

    if (choice === '킥') {
      if (
        !interaction.guild.members.cache
          .get(interaction.user.id)
          .permissions.has('KICK_MEMBERS')
      )
        return interaction.reply({
          content: '님에게 킥하기 권한이 없습니다.',
          ephemeral: true,
        })

      if (!interaction.guild.me.permissions.has('KICK_MEMBERS'))
        return interaction.reply({
          content: '제게 킥하기 권한이 없습니다.',
          ephemeral: true,
        })
      const user = interaction.options.getMentionable('유저')
      const 이유 = interaction.options.getString('이유')

      if (!user.kickable)
        return interaction.reply({
          content: '유저를 킥할 수 없습니다.',
          ephemeral: true,
        })

      try {
        user.kick(이유)
        interaction.reply({
          content: `${user.user.tag}님을 킥했습니다.`,
          ephemeral: true,
        })
      } catch (error) {
        console.error(error)
        return interaction.reply({
          content: '오류가 발생했습니다.\n오류내용: ' + error.message,
          ephemeral: true,
        })
      }
    } else if (choice === '밴') {
      if (
        !interaction.guild.members.cache
          .get(interaction.user.id)
          .permissions.has('BAN_MEMBERS')
      )
        return interaction.reply({
          content: '님에게 밴하기 권한이 없습니다.',
          ephemeral: true,
        })

      if (!interaction.guild.me.permissions.has('BAN_MEMBERS'))
        return interaction.reply({
          content: '제게 밴하기 권한이 없습니다.',
          ephemeral: true,
        })
      const user = interaction.options.getMentionable('유저')
      const 이유 = interaction.options.getString('이유')

      if (!user.banable)
        return interaction.reply({
          content: '유저를 킥할 수 없습니다.',
          ephemeral: true,
        })

      try {
        user.ban({ reason: 이유 })
        interaction.reply({
          content: `${user.user.tag}님을 밴했습니다.`,
          ephemeral: true,
        })
      } catch (error) {
        console.error(error)
        return interaction.reply({
          content: '오류가 발생했습니다.\n오류내용: ' + error.message,
          ephemeral: true,
        })
      }
    } else if (choice === '청소') {
      if (
        !interaction.guild.members.cache
          .get(interaction.user.id)
          .permissions.has('MANAGE_MESSAGES')
      )
        return interaction.reply({
          content: '님에게 메세지 관리하기 권한이 없습니다.',
          ephemeral: true,
        })

      if (!interaction.guild.me.permissions.has('MANAGE_MESSAGES'))
        return interaction.reply({
          content: '제게 메세지 관리하기 권한이 없습니다.',
          ephemeral: true,
        })
      await interaction.channel?.messages
        .fetch({
          limit: interaction.options.getNumber('갯수'),
        })
        .then(messages => {
          interaction.guild?.channels.fetch(interaction.channelId).then(a => {
            a.bulkDelete(messages)
            interaction.reply(
              `채팅 ${interaction.options.getNumber('갯수')}개를 청소했습니다.`
            )
          })
        })
        .catch(err => {
          interaction.reply({
            content: `오류가 발생했습니다.\n오류내용: ${err.message}`,
            ephemeral: true,
          })
        })
    } else if (choice === '슬로우모드') {
      if (
        !interaction.guild.members.cache
          .get(interaction.user.id)
          .permissions.has('MANAGE_CHANNELS')
      )
        return interaction.reply({
          content: '님에게 채널 관리하기 권한이 없습니다.',
          ephemeral: true,
        })

      if (!interaction.guild.me.permissions.has('MANAGE_CHANNELS'))
        return interaction.reply({
          content: '제게 채널 관리하기 권한이 없습니다.',
          ephemeral: true,
        })

      if (interaction.options.getNumber('초') > 21600)
        return interaction.reply({
          content: '슬로우모드는 6시간 이하만 가능해요',
          ephemeral: true,
        })

      interaction.channel.setRateLimitPerUser(
        interaction.options.getNumber('초')
      )

      interaction.reply(
        `채널의 슬로우모드를 ${interaction.options.getNumber(
          '초'
        )}초로 설정했습니다.`
      )
    }
  }
}
// 힘들었어요