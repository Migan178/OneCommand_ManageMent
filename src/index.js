const { TOKEN } = require('../config.json')
const { DiscommandClient } = require('discommand')
const path = require('path')
const client = new DiscommandClient(
  {
    intents: ['GUILDS'],
  },
  {
    CommandHandlerDirectory: path.join(__dirname, 'Commands'),
    loadType: 'FILE',
  }
)

client.loadAll()
client.login(TOKEN)

client.on('ready', () => {
  console.log(`${client.user.username} 해커톤 나갈 준비 완료!`)
})
