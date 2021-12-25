const { Client } = require('discord.js')
const { TOKEN } = require('../config.json')
const { Slash } = require('discommand-slash')
const path = require('path')
const client = new Client({
  intents: ['GUILDS'],
})
const command = new Slash(client, {
  path: path.join(__dirname, 'Commands'),
  loadType: 'FILE',
})

client.login(TOKEN)
command.LoadCommand()

client.on('ready', () => {
  console.log(`${client.user.username} is Ready!`)
})
