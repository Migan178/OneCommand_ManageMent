import { DiscommandClient } from 'discommand'
import { GatewayIntentBits } from 'discord.js'
import { join } from 'path'
require('dotenv/config')

const client = new DiscommandClient(
  {
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
  },
  {
    directory: {
      command: join(__dirname, 'Commands'),
      listener: join(__dirname, 'Events'),
    },
  }
)

client.start(process.env.TOKEN)
