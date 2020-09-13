import Client from './App/Client'
import LoadEvents from './Engine/LoadEvents'
import LoadCommand from './Engine/LoadCommand'
import ConsoleStamp from 'console-stamp'
import 'dotenv/config'

ConsoleStamp(console)
const client = new Client({
  fetchAllMembers: false,
  disableMentions: 'everyone'
})

LoadEvents(client)
LoadCommand(client)

client.login(process.env.PRODUCTION === 'DEV' ? process.env.TOKEN_DEV : process.env.TOKEN)
