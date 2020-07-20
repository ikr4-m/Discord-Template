import { Client } from 'discord.js'
import ConsoleStamp from 'console-stamp'
import 'dotenv/config'

ConsoleStamp(console)
const client = new Client({
  fetchAllMembers: false,
  disableMentions: 'everyone'
})

if (process.env.PRODUCTION === 'DEV') {
  client.on('debug', (message) => {
    console.log(message)
  })
}

client.login(process.env.TOKEN)
