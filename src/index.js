const { DiscommandClient, LoadType } = require('discommand')
const { TOKEN } = require('../config.json')
const { join } = require('path')
const { GatewayIntentBits } = require('discord.js')
const client = new DiscommandClient(
  {
    intents: [GatewayIntentBits.Guilds],
  },
  {
    directory: {
      command: join(__dirname, 'Commands'),
      listener: join(__dirname, 'Events'),
    },
    loadType: LoadType.File,
  }
)

client.loadAll()
client.login(TOKEN)
