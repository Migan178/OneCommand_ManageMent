/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  type ChatInputCommandInteraction,
  GuildMember,
  ApplicationCommandOptionType,
  PermissionsBitField,
} from 'discord.js'
import { Command } from 'discommand'

export default class extends Command {
  constructor() {
    super('관리')
    this.data = {
      name: '관리',
      description: '관리기능입니다.',
      options: [
        {
          type: ApplicationCommandOptionType.String,
          name: '항목',
          description: '항목을 고릅니다.',
          choices: [
            {
              name: '킥',
              value: '킥',
            },
            {
              name: '밴',
              value: '밴',
            },
            {
              name: '청소',
              value: '청소',
            },
            {
              name: '슬로우모드',
              value: '슬로우모드',
            },
          ],
          required: true,
        },
        {
          type: ApplicationCommandOptionType.User,
          name: '유저',
          description: '유저',
        },
        {
          type: ApplicationCommandOptionType.String,
          name: '이유',
          description: '밴이나 킥을 당한이유',
        },
        {
          type: ApplicationCommandOptionType.Number,
          name: '갯수',
          description: '삭제할 채팅갯수',
        },
        {
          type: ApplicationCommandOptionType.Number,
          name: '초',
          description: '슬로우 모드를 설정할 초',
        },
      ],
    }
  }

  async execute(interaction: ChatInputCommandInteraction) {
    const choice = interaction.options.getString('항목')
    interaction.options.getMember('유저')

    if (choice === '킥') {
      if (
        !interaction
          .guild!.members!.cache.get(interaction.user.id)!
          .permissions.has(PermissionsBitField.Flags.KickMembers)
      )
        return interaction.reply({
          content: '님에게 멤버 추방하기 권한이 없습니다.',
          ephemeral: true,
        })

      if (
        !interaction.guild!.members.me!.permissions.has(
          PermissionsBitField.Flags.KickMembers
        )
      )
        return interaction.reply({
          content: '제게 멤버 추방하기 권한이 없습니다.',
          ephemeral: true,
        })
      const user = interaction.options.getMember('유저')
      const reason = interaction.options.getString('이유')

      if (user instanceof GuildMember) {
        if (!user.kickable)
          return interaction.reply({
            content: '유저를 킥할 수 없습니다.',
            ephemeral: true,
          })

        try {
          user.kick(reason || '없음')
          interaction.reply({
            content: `${user.user.tag}님을 킥했습니다.`,
            ephemeral: true,
          })
        } catch (error) {
          console.error(error)
          return interaction.reply({
            content: '오류가 발생했습니다.',
            ephemeral: true,
          })
        }
      }
    } else if (choice === '밴') {
      if (
        !interaction.guild?.members.cache
          .get(interaction.user.id)
          ?.permissions.has(PermissionsBitField.Flags.BanMembers)
      )
        return interaction.reply({
          content: '님에게 밴하기 권한이 없습니다.',
          ephemeral: true,
        })

      if (
        !interaction.guild!.members.me!.permissions.has(
          PermissionsBitField.Flags.BanMembers
        )
      )
        return interaction.reply({
          content: '제게 밴하기 권한이 없습니다.',
          ephemeral: true,
        })
      const user = interaction.options.getMember('유저')
      const reason = interaction.options.getString('이유')

      if (user instanceof GuildMember) {
        if (!user.bannable)
          return interaction.reply({
            content: '유저를 킥할 수 없습니다.',
            ephemeral: true,
          })

        try {
          user.ban({ reason: reason || '없음' })
          interaction.reply({
            content: `${user.user.tag}님을 밴했습니다.`,
            ephemeral: true,
          })
        } catch (error) {
          console.error(error)
          return interaction.reply({
            content: '오류가 발생했습니다.',
            ephemeral: true,
          })
        }
      }
    } else if (choice === '청소') {
      if (
        !interaction.guild?.members.cache
          .get(interaction.user.id)
          ?.permissions.has(PermissionsBitField.Flags.ManageMessages)
      )
        return interaction.reply({
          content: '님에게 메세지 관리하기 권한이 없습니다.',
          ephemeral: true,
        })

      if (
        !interaction.guild!.members.me!.permissions.has(
          PermissionsBitField.Flags.ManageMessages
        )
      )
        return interaction.reply({
          content: '제게 메세지 관리하기 권한이 없습니다.',
          ephemeral: true,
        })
      // @ts-ignore
      await interaction
        .channel!.messages.fetch({
          limit: interaction.options.getNumber('갯수'),
        })
        // @ts-ignore
        .then(messages => {
          interaction.guild?.channels.fetch(interaction.channelId).then(a => {
            // @ts-ignore
            a.bulkDelete(messages)
            interaction.reply(
              `채팅 ${interaction.options.getNumber('갯수')}개를 청소했습니다.`
            )
          })
        })
        // @ts-ignore
        .catch(error => {
          interaction.reply({
            content: `오류가 발생했습니다.\n오류내용: ${error.message}`,
            ephemeral: true,
          })
        })
    } else if (choice === '슬로우모드') {
      if (
        !interaction
          .guild!.members.cache.get(interaction.user.id)
          ?.permissions.has(PermissionsBitField.Flags.ManageChannels)
      )
        return interaction.reply({
          content: '님에게 채널 관리하기 권한이 없습니다.',
          ephemeral: true,
        })

      if (
        !interaction.guild!.members.me!.permissions.has(
          PermissionsBitField.Flags.ManageChannels
        )
      )
        return interaction.reply({
          content: '제게 채널 관리하기 권한이 없습니다.',
          ephemeral: true,
        })

      if (interaction.options.getNumber('초')! > 21600)
        return interaction.reply({
          content: '슬로우모드는 6시간 이하만 가능해요',
          ephemeral: true,
        })

      // @ts-ignore
      interaction.channel!.setRateLimitPerUser(
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
